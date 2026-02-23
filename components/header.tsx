"use client"

import { Search, ShoppingCart, BadgeCheck, Menu, X, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useCart } from "@/context/cart-context"
import Link from "next/link"
import { useState } from "react"

export function Header() {
  const { items, setIsCartOpen } = useCart()
  const cartCount = items.reduce((total, item) => total + item.quantity, 0)
  const [mobileSearch, setMobileSearch] = useState(false)

  return (
    <>
      {/* Promotional Banner */}
      <div className="w-full bg-primary/90 py-2.5 text-center backdrop-blur-sm">
        <p className="text-xs font-semibold uppercase tracking-widest text-primary-foreground">
          25% de desconto &mdash; Use o cupom <span className="font-mono bg-primary-foreground/15 px-1.5 py-0.5 rounded text-primary-foreground">AIMPVP25</span>
        </p>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 lg:px-6">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground font-serif font-bold text-sm">
              A
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-serif text-lg font-bold uppercase tracking-wider text-foreground">
                Aim PvP
              </span>
              <BadgeCheck className="h-4 w-4 fill-accent text-background" />
            </div>
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-sm mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar produto..."
                className="w-full pl-10 bg-secondary/80 border-border/60 text-foreground placeholder:text-muted-foreground h-9 text-sm focus:border-accent/50 focus:ring-accent/20"
              />
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            {/* Admin Button */}
            <Link href="/admin">
              <Button
                variant="ghost"
                className="text-muted-foreground hover:text-foreground hover:bg-secondary gap-2 h-9 px-3"
              >
                <Shield className="h-4 w-4" />
                <span className="hidden sm:inline text-sm">Admin</span>
              </Button>
            </Link>
            
            {/* Mobile Search Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-muted-foreground hover:text-foreground h-9 w-9"
              onClick={() => setMobileSearch(!mobileSearch)}
            >
              {mobileSearch ? <X className="h-4 w-4" /> : <Search className="h-4 w-4" />}
            </Button>

            {/* Cart */}
            <Button
              variant="ghost"
              className="relative text-muted-foreground hover:text-foreground hover:bg-secondary gap-2 h-9 px-3"
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingCart className="h-4 w-4" />
              <span className="hidden sm:inline text-sm">Carrinho</span>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                  {cartCount}
                </span>
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Search Expanded */}
        {mobileSearch && (
          <div className="md:hidden border-t border-border/60 p-3 bg-background/95 backdrop-blur-xl">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar produto..."
                className="w-full pl-10 bg-secondary/80 border-border/60 text-foreground placeholder:text-muted-foreground h-9 text-sm"
                autoFocus
              />
            </div>
          </div>
        )}
      </header>
    </>
  )
}
