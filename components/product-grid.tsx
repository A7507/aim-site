"use client"

import { ProductCard } from "./product-card"

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

interface ProductGridProps {
  products: Product[]
  categoryTitle: string
}

export function ProductGrid({ products, categoryTitle }: ProductGridProps) {
  return (
    <section className="w-full">
      {/* Category Title */}
      <div className="mb-6 flex items-center gap-3">
        <div className="h-6 w-1 rounded-full bg-primary" />
        <h2 className="font-serif text-xl font-bold uppercase tracking-wide text-foreground">
          {categoryTitle}
        </h2>
        <span className="text-xs text-muted-foreground font-medium ml-1">
          ({products.length} {products.length === 1 ? 'item' : 'itens'})
        </span>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}
