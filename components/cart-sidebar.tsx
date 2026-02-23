"use client"

import { X, Minus, Plus, ShoppingCart, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/context/cart-context"
import Image from "next/image"
import Link from "next/link"

export function CartSidebar() {
  const { items, isCartOpen, setIsCartOpen, updateQuantity, removeItem, getSubtotal } = useCart()

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price)
  }

  if (!isCartOpen) return null

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-background/70 backdrop-blur-sm z-40"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Sidebar */}
      <div className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-card border-l border-border/60 z-50 flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border/60">
          <div className="flex items-center gap-2.5">
            <ShoppingCart className="h-4 w-4 text-primary" />
            <h2 className="text-base font-semibold text-foreground">Carrinho</h2>
            <span className="text-xs text-muted-foreground bg-secondary px-2 py-0.5 rounded-full">
              {items.length}
            </span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsCartOpen(false)}
            className="text-muted-foreground hover:text-foreground h-8 w-8"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-5">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="h-16 w-16 rounded-2xl bg-secondary flex items-center justify-center mb-4">
                <ShoppingCart className="h-7 w-7 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground text-sm">Seu carrinho esta vazio</p>
              <Button
                onClick={() => setIsCartOpen(false)}
                className="mt-4 bg-primary hover:bg-primary/90 text-primary-foreground h-9 text-sm"
              >
                Continuar comprando
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-3 p-3 bg-secondary/50 rounded-xl border border-border/40"
                >
                  <div className="relative h-16 w-16 rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-foreground truncate">
                      {item.name}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-0.5">{item.description}</p>
                    <p className="text-sm font-bold text-foreground mt-1">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                    <div className="flex items-center gap-1.5 mt-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-6 w-6 border-border/60 bg-transparent rounded-md"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="text-xs text-foreground w-6 text-center font-medium">
                        {item.quantity}
                      </span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-6 w-6 border-border/60 bg-transparent rounded-md"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 text-muted-foreground hover:text-destructive ml-auto"
                        onClick={() => removeItem(item.id)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-border/60 p-5 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Subtotal</span>
              <span className="text-lg font-bold text-foreground">
                {formatPrice(getSubtotal())}
              </span>
            </div>
            <Link href="/checkout" onClick={() => setIsCartOpen(false)}>
              <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-11 text-sm font-semibold">
                Finalizar Compra
              </Button>
            </Link>
          </div>
        )}
      </div>
    </>
  )
}
