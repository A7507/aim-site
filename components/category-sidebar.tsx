"use client"

import { cn } from "@/lib/utils"
import { Crown, Car, DollarSign, Package, MoreHorizontal } from "lucide-react"

interface Category {
  id: string
  name: string
}

interface CategorySidebarProps {
  categories: Category[]
  activeCategory: string
  onCategoryChange: (categoryId: string) => void
}

const categoryIcons: Record<string, React.ReactNode> = {
  vips: <Crown className="h-4 w-4" />,
  carros: <Car className="h-4 w-4" />,
  cash: <DollarSign className="h-4 w-4" />,
  caixas: <Package className="h-4 w-4" />,
  outros: <MoreHorizontal className="h-4 w-4" />,
}

export function CategorySidebar({
  categories,
  activeCategory,
  onCategoryChange,
}: CategorySidebarProps) {
  return (
    <aside className="w-full md:w-56 shrink-0">
      {/* Desktop Sidebar */}
      <nav className="hidden md:block rounded-xl bg-card border border-border/60 overflow-hidden">
        <div className="px-4 py-3 border-b border-border/60">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Categorias
          </h2>
        </div>
        <ul className="p-2">
          {categories.map((category) => (
            <li key={category.id}>
              <button
                onClick={() => onCategoryChange(category.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                  activeCategory === category.id
                    ? "bg-primary/10 text-primary border border-primary/20"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/80 border border-transparent"
                )}
              >
                {categoryIcons[category.id]}
                {category.name}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Mobile Horizontal Tabs */}
      <div className="md:hidden flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={cn(
              "flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-200 border",
              activeCategory === category.id
                ? "bg-primary/10 text-primary border-primary/20"
                : "text-muted-foreground border-border/60 bg-card hover:text-foreground"
            )}
          >
            {categoryIcons[category.id]}
            {category.name}
          </button>
        ))}
      </div>
    </aside>
  )
}
