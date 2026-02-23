"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"
import { storage } from "@/lib/central-storage"

export interface Product {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: string
  items?: string[]
  cars?: string[]
}

export interface CartItem extends Product {
  quantity: number
}

export interface PurchaseLog {
  id: string
  timestamp: number
  items: CartItem[]
  total: number
  paymentMethod: string
  status: "completed" | "pending" | "failed"
  customerInfo?: {
    email?: string
    name?: string
  }
}

interface CartContextType {
  items: CartItem[]
  addItem: (product: Product) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  getTotal: () => number
  getSubtotal: () => number
  coupon: string | null
  discount: number
  applyCoupon: (code: string) => boolean
  removeCoupon: () => void
  isCartOpen: boolean
  setIsCartOpen: (open: boolean) => void
  isLoaded: boolean
  savePurchaseLog: (paymentMethod: string, customerInfo?: { email?: string; name?: string }) => void
}

const VALID_COUPONS: Record<string, number> = {
  "AIMPVP10": 10,
  "AIMPVP25": 25,
  "DESCONTO15": 15,
  "FIVEM20": 20,
  "VIP50": 50,
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [coupon, setCoupon] = useState<string | null>(null)
  const [discount, setDiscount] = useState(0)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("aimpvp-cart")
    const savedCoupon = localStorage.getItem("aimpvp-coupon")
    const savedDiscount = localStorage.getItem("aimpvp-discount")
    
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart))
      } catch (e) {
        console.error("Failed to parse cart from localStorage", e)
      }
    }
    if (savedCoupon) {
      setCoupon(savedCoupon)
    }
    if (savedDiscount) {
      setDiscount(Number(savedDiscount))
    }
    setIsLoaded(true)
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("aimpvp-cart", JSON.stringify(items))
    }
  }, [items, isLoaded])

  // Save coupon to localStorage whenever it changes
  useEffect(() => {
    if (isLoaded) {
      if (coupon) {
        localStorage.setItem("aimpvp-coupon", coupon)
        localStorage.setItem("aimpvp-discount", String(discount))
      } else {
        localStorage.removeItem("aimpvp-coupon")
        localStorage.removeItem("aimpvp-discount")
      }
    }
  }, [coupon, discount, isLoaded])

  const addItem = (product: Product) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id)
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prevItems, { ...product, quantity: 1 }]
    })
    setIsCartOpen(true)
  }

  const removeItem = (productId: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== productId))
  }

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId)
      return
    }
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    )
  }

  const clearCart = () => {
    setItems([])
    setCoupon(null)
    setDiscount(0)
  }

  const getSubtotal = () => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const getTotal = () => {
    const subtotal = getSubtotal()
    return subtotal - (subtotal * discount) / 100
  }

  const applyCoupon = (code: string): boolean => {
    const upperCode = code.toUpperCase().trim()
    if (VALID_COUPONS[upperCode]) {
      setCoupon(upperCode)
      setDiscount(VALID_COUPONS[upperCode])
      return true
    }
    return false
  }

  const removeCoupon = () => {
    setCoupon(null)
    setDiscount(0)
  }

  const savePurchaseLog = async (paymentMethod: string, customerInfo?: { email?: string; name?: string }) => {
    if (items.length === 0) return

    const purchaseLog = {
      id: `PUR-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      timestamp: Date.now(),
      items: items,
      total: getTotal(),
      payment_method: paymentMethod,
      status: "completed",
      customer_name: customerInfo?.name || null,
      customer_email: customerInfo?.email || null
    }

    // Usar sistema 100% local - funciona em qualquer dispositivo
    await storage.savePurchaseLog(purchaseLog)
    
    // Limpar carrinho após salvar
    clearCart()
  }

  const saveToLocalStorage = (purchaseLog: any) => {
    const existingLogs = localStorage.getItem("purchase-logs")
    let logs: any[] = []
    
    if (existingLogs) {
      try {
        logs = JSON.parse(existingLogs)
      } catch (e) {
        console.error("Failed to parse existing logs", e)
      }
    }
    
    logs.push(purchaseLog)
    localStorage.setItem("purchase-logs", JSON.stringify(logs))
  }

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        getTotal,
        getSubtotal,
        coupon,
        discount,
        applyCoupon,
        removeCoupon,
        isCartOpen,
        setIsCartOpen,
        isLoaded,
        savePurchaseLog,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
