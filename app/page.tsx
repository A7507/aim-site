"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { CategorySidebar } from "@/components/category-sidebar"
import { HeroSection } from "@/components/hero-section"
import { ProductGrid } from "@/components/product-grid"

const categories = [
  { id: "vips", name: "VIPS" },
  { id: "carros", name: "CARROS" },
  { id: "cash", name: "CASH" },
  { id: "caixas", name: "CAIXAS" },
  { id: "outros", name: "OUTROS" },
]

const products = [
  // VIPs Bronze
  { id: "vip-bronze-1", name: "VIP Bronze - 1 DIA", description: "VIP BRONZE", price: 5, image: "/images/vip-bronze.jpg", category: "vips", items: ["AK Compacta", "G36 C", "AK-47"], cars: ["Kuruma", "Police4", "ZENTORNO", "Shotaro", "Baller 6", "Xls 2"] },
  { id: "vip-bronze-3", name: "VIP Bronze - 3 DIAS", description: "VIP BRONZE", price: 10, image: "/images/vip-bronze.jpg", category: "vips", items: ["AK Compacta", "G36 C", "AK-47"], cars: ["Kuruma", "Police4", "ZENTORNO", "Shotaro", "Baller 6", "Xls 2"] },
  { id: "vip-bronze-7", name: "VIP Bronze - 7 DIAS", description: "VIP BRONZE", price: 18, image: "/images/vip-bronze.jpg", category: "vips", items: ["AK Compacta", "G36 C", "AK-47"], cars: ["Kuruma", "Police4", "ZENTORNO", "Shotaro", "Baller 6", "Xls 2"] },
  { id: "vip-bronze-15", name: "VIP Bronze - 15 DIAS", description: "VIP BRONZE", price: 25, image: "/images/vip-bronze.jpg", category: "vips", items: ["AK Compacta", "G36 C", "AK-47"], cars: ["Kuruma", "Police4", "ZENTORNO", "Shotaro", "Baller 6", "Xls 2"] },
  { id: "vip-bronze-30", name: "VIP Bronze - 30 DIAS", description: "VIP BRONZE", price: 40, image: "/images/vip-bronze.jpg", category: "vips", items: ["AK Compacta", "G36 C", "AK-47"], cars: ["Kuruma", "Police4", "ZENTORNO", "Shotaro", "Baller 6", "Xls 2"] },
  // VIPs Prata
  { id: "vip-prata-1", name: "VIP Prata - 1 DIA", description: "VIP PRATA", price: 8, image: "/images/vip-prata.jpg", category: "vips", items: ["QBZ 83", "M4A1", "FAMAS"], cars: ["W F850", "TIGRE 900", "W S1000 XR", "AFRICAN 1100", "XIST 1200Z", "W 1200", "Kuruma 2", "MASERATI LEVANTE"] },
  { id: "vip-prata-3", name: "VIP Prata - 3 DIAS", description: "VIP PRATA", price: 15, image: "/images/vip-prata.jpg", category: "vips", items: ["QBZ 83", "M4A1", "FAMAS"], cars: ["W F850", "TIGRE 900", "W S1000 XR", "AFRICAN 1100", "XIST 1200Z", "W 1200", "Kuruma 2", "MASERATI LEVANTE"] },
  { id: "vip-prata-7", name: "VIP Prata - 7 DIAS", description: "VIP PRATA", price: 25, image: "/images/vip-prata.jpg", category: "vips", items: ["QBZ 83", "M4A1", "FAMAS"], cars: ["W F850", "TIGRE 900", "W S1000 XR", "AFRICAN 1100", "XIST 1200Z", "W 1200", "Kuruma 2", "MASERATI LEVANTE"] },
  { id: "vip-prata-15", name: "VIP Prata - 15 DIAS", description: "VIP PRATA", price: 35, image: "/images/vip-prata.jpg", category: "vips", items: ["QBZ 83", "M4A1", "FAMAS"], cars: ["W F850", "TIGRE 900", "W S1000 XR", "AFRICAN 1100", "XIST 1200Z", "W 1200", "Kuruma 2", "MASERATI LEVANTE"] },
  { id: "vip-prata-30", name: "VIP Prata - 30 DIAS", description: "VIP PRATA", price: 55, image: "/images/vip-prata.jpg", category: "vips", items: ["QBZ 83", "M4A1", "FAMAS"], cars: ["W F850", "TIGRE 900", "W S1000 XR", "AFRICAN 1100", "XIST 1200Z", "W 1200", "Kuruma 2", "MASERATI LEVANTE"] },
  // VIPs Ouro
  { id: "vip-ouro-1", name: "VIP Ouro - 1 DIA", description: "VIP OURO", price: 15, image: "/images/vip-ouro.jpg", category: "vips", items: ["AK-74"], cars: ["BLINDADO A45", "BLINDADO X7", "BLINDADO X6", "BLINDADO M3", "BLINDADO RS6", "BLINDADO RS Q8"] },
  { id: "vip-ouro-3", name: "VIP Ouro - 3 DIAS", description: "VIP OURO", price: 30, image: "/images/vip-ouro.jpg", category: "vips", items: ["AK-74"], cars: ["BLINDADO A45", "BLINDADO X7", "BLINDADO X6", "BLINDADO M3", "BLINDADO RS6", "BLINDADO RS Q8"] },
  { id: "vip-ouro-7", name: "VIP Ouro - 7 DIAS", description: "VIP OURO", price: 50, image: "/images/vip-ouro.jpg", category: "vips", items: ["AK-74"], cars: ["BLINDADO A45", "BLINDADO X7", "BLINDADO X6", "BLINDADO M3", "BLINDADO RS6", "BLINDADO RS Q8"] },
  { id: "vip-ouro-15", name: "VIP Ouro - 15 DIAS", description: "VIP OURO", price: 70, image: "/images/vip-ouro.jpg", category: "vips", items: ["AK-74"], cars: ["BLINDADO A45", "BLINDADO X7", "BLINDADO X6", "BLINDADO M3", "BLINDADO RS6", "BLINDADO RS Q8"] },
  { id: "vip-ouro-30", name: "VIP Ouro - 30 DIAS", description: "VIP OURO", price: 100, image: "/images/vip-ouro.jpg", category: "vips", items: ["AK-74"], cars: ["BLINDADO A45", "BLINDADO X7", "BLINDADO X6", "BLINDADO M3", "BLINDADO RS6", "BLINDADO RS Q8"] },
  // VIPs Diamante
  { id: "vip-diamante-1", name: "VIP Diamante - 1 DIA", description: "VIP DIAMANTE", price: 25, image: "/images/vip-diamante.jpg", category: "vips", items: ["CARBINE RIFLE", "M4A4", "G36 MK2", "PARAFAL", "SCAR"], cars: ["BLINDADO AMAROK", "BLINDADO MARTIN DBX", "BLINDADO G65", "BLINDADO URUS", "BLINDADO CAYENNE TURBO", "BLINDADO ESCALADE", "BLINDADO PUROSANGUE"] },
  { id: "vip-diamante-3", name: "VIP Diamante - 3 DIAS", description: "VIP DIAMANTE", price: 45, image: "/images/vip-diamante.jpg", category: "vips", items: ["CARBINE RIFLE", "M4A4", "G36 MK2", "PARAFAL", "SCAR"], cars: ["BLINDADO AMAROK", "BLINDADO MARTIN DBX", "BLINDADO G65", "BLINDADO URUS", "BLINDADO CAYENNE TURBO", "BLINDADO ESCALADE", "BLINDADO PUROSANGUE"] },
  { id: "vip-diamante-7", name: "VIP Diamante - 7 DIAS", description: "VIP DIAMANTE", price: 75, image: "/images/vip-diamante.jpg", category: "vips", items: ["CARBINE RIFLE", "M4A4", "G36 MK2", "PARAFAL", "SCAR"], cars: ["BLINDADO AMAROK", "BLINDADO MARTIN DBX", "BLINDADO G65", "BLINDADO URUS", "BLINDADO CAYENNE TURBO", "BLINDADO ESCALADE", "BLINDADO PUROSANGUE"] },
  { id: "vip-diamante-15", name: "VIP Diamante - 15 DIAS", description: "VIP DIAMANTE", price: 110, image: "/images/vip-diamante.jpg", category: "vips", items: ["CARBINE RIFLE", "M4A4", "G36 MK2", "PARAFAL", "SCAR"], cars: ["BLINDADO AMAROK", "BLINDADO MARTIN DBX", "BLINDADO G65", "BLINDADO URUS", "BLINDADO CAYENNE TURBO", "BLINDADO ESCALADE", "BLINDADO PUROSANGUE"] },
  { id: "vip-diamante-30", name: "VIP Diamante - 30 DIAS", description: "VIP DIAMANTE", price: 160, image: "/images/vip-diamante.jpg", category: "vips", items: ["CARBINE RIFLE", "M4A4", "G36 MK2", "PARAFAL", "SCAR"], cars: ["BLINDADO AMAROK", "BLINDADO MARTIN DBX", "BLINDADO G65", "BLINDADO URUS", "BLINDADO CAYENNE TURBO", "BLINDADO ESCALADE", "BLINDADO PUROSANGUE"] },
  // Carros
  { id: "carro-1", name: "URUS (PERMANENTE)", description: "LAMBORGHINI URUS", price: 50, image: "/products/lamborghini-urus.jpg", category: "carros" },
  { id: "carro-2", name: "PURO SANGUE (PERMANENTE)", description: "PURO SANGUE", price: 50, image: "/products/ferrari-purosangue.jpg", category: "carros" },
  { id: "carro-3", name: "BMW X7", description: "BMW X7", price: 50, image: "/products/bmw-x7.jpg", category: "carros" },
  { id: "carro-4", name: "PORSCHE CAYENNE", description: "PORSCHE CAYENNE", price: 60, image: "/products/porsche-cayenne.jpg", category: "carros" },
  { id: "carro-5", name: "MERCEDES G63", description: "MERCEDES G63", price: 70, image: "/products/mercedes-g63.jpg", category: "carros" },
  // Cash
  { id: "cash-5m", name: "5 Milhoes", description: "5 MILHOES", price: 49.99, image: "/images/cash.jpg", category: "cash" },
  { id: "cash-10m", name: "10 Milhoes", description: "10 MILHOES", price: 74.99, image: "/images/cash.jpg", category: "cash" },
  { id: "cash-20m", name: "20 Milhoes", description: "20 MILHOES", price: 129.99, image: "/images/cash.jpg", category: "cash" },
  { id: "cash-50m", name: "50 Milhoes", description: "50 MILHOES", price: 249.99, image: "/images/cash.jpg", category: "cash" },
  { id: "cash-100m", name: "100 Milhoes", description: "100 MILHOES", price: 399.99, image: "/images/cash.jpg", category: "cash" },
  // Caixas
  { id: "caixa-1", name: "Caixa Comum", description: "CAIXA COMUM", price: 9.99, image: "/images/caixa.jpg", category: "caixas" },
  { id: "caixa-2", name: "Caixa Rara", description: "CAIXA RARA", price: 19.99, image: "/images/caixa.jpg", category: "caixas" },
  { id: "caixa-3", name: "Caixa Epica", description: "CAIXA EPICA", price: 39.99, image: "/images/caixa.jpg", category: "caixas" },
  { id: "caixa-4", name: "Caixa Lendaria", description: "CAIXA LENDARIA", price: 79.99, image: "/images/caixa.jpg", category: "caixas" },
  { id: "caixa-5", name: "Caixa Mitica", description: "CAIXA MITICA", price: 149.99, image: "/images/caixa.jpg", category: "caixas" },
  // Outros
  { id: "outro-1", name: "Reset Personagem", description: "RESET PERSON", price: 14.99, image: "/images/cash.jpg", category: "outros" },
  { id: "outro-2", name: "Prioridade na FILA", description: "PRIORIDADE FILA", price: 5.99, image: "/images/cash.jpg", category: "outros" },
  { id: "outro-3", name: "UNBAN", description: "REMOVER BAN", price: 80, image: "/images/cash.jpg", category: "outros" },
  { id: "outro-4", name: "ID 1 DIGITO", description: "ID 1 DIGITO", price: 100, image: "/images/cash.jpg", category: "outros" },
  { id: "outro-5", name: "ID 2 DIGITOS", description: "ID 2 DIGITOS", price: 50, image: "/images/cash.jpg", category: "outros" },
]

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("vips")

  const filteredProducts = products.filter(
    (product) => product.category === activeCategory
  )

  const activeCategoryName =
    categories.find((c) => c.id === activeCategory)?.name || "PRODUTOS"

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="mx-auto max-w-7xl px-4 lg:px-6 py-6 md:py-8">
        <HeroSection />

        <div className="flex flex-col md:flex-row gap-6 mt-8">
          <CategorySidebar
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />

          <div className="flex-1 min-w-0">
            <ProductGrid
              products={filteredProducts}
              categoryTitle={activeCategoryName}
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/60 mt-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-serif font-bold text-xs">
                A
              </div>
              <span className="font-serif text-base font-bold uppercase tracking-wider text-foreground">
                Aim PvP
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              Loja Oficial do Servidor FiveM &mdash; Todos os direitos reservados
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
