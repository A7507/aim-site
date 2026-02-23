"use client"

import React from "react"
import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/context/cart-context"
import Image from "next/image"
import Link from "next/link"

interface Product {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: string
  items?: string[]
  cars?: string[]
}

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem, setIsCartOpen } = useCart()

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price)
  }

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addItem(product)
    setIsCartOpen(true)
  }

  return (
    <Link href={`/produto/${product.id}`}>
      <div className="group flex flex-col rounded-xl bg-card border border-border/60 overflow-hidden transition-all duration-300 hover:border-primary/40 hover:shadow-[0_0_30px_-5px_rgba(230,57,70,0.15)]">
        {/* Product Image */}
        <div className="relative aspect-[4/5] w-full overflow-hidden">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />

          {/* VIP tag badges on image */}
          {(product.items && product.items.length > 0 || product.cars && product.cars.length > 0) && (
            <div className="absolute top-3 right-3 z-10 flex flex-col gap-1.5">
              {product.items && product.items.length > 0 && (
                <span className="inline-flex items-center justify-center px-2 py-1 text-[10px] font-bold bg-primary/90 text-primary-foreground rounded-md backdrop-blur-sm">
                  {product.items.length} {product.items.length === 1 ? 'Arma' : 'Armas'}
                </span>
              )}
              {product.cars && product.cars.length > 0 && (
                <span className="inline-flex items-center justify-center px-2 py-1 text-[10px] font-bold bg-accent/90 text-accent-foreground rounded-md backdrop-blur-sm">
                  {product.cars.length} {product.cars.length === 1 ? 'Carro' : 'Carros'}
                </span>
              )}
            </div>
          )}

          <div className="absolute bottom-4 left-4 right-4">
            <h3 className="font-serif text-lg font-bold uppercase text-foreground drop-shadow-lg leading-tight">
              {product.description}
            </h3>
          </div>
        </div>

        {/* Product Info */}
        <div className="flex flex-col gap-3 p-4 border-t border-border/40">
          <div>
            <p className="text-sm text-muted-foreground truncate">{product.name}</p>
            <div className="flex items-end justify-between mt-1">
              <div>
                <p className="text-xl font-bold text-foreground">{formatPrice(product.price)}</p>
                <p className="text-[11px] text-accent font-medium">A vista no Pix</p>
              </div>
            </div>
          </div>

          <Button
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground gap-2 h-9 text-sm font-semibold"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="h-3.5 w-3.5" />
            Adicionar
          </Button>
        </div>
      </div>
    </Link>
  )
}
