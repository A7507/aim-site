"use client"

import { use } from "react"
import { Header } from "@/components/header"
import { useCart, Product } from "@/context/cart-context"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { ShoppingCart, Plus, Truck, Shield, CreditCard, Crosshair, Car, ChevronRight } from "lucide-react"

const products: Product[] = [
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

export default function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const resolvedParams = use(params)
  const product = products.find((p) => p.id === resolvedParams.id)
  const { addItem, setIsCartOpen } = useCart()

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price)
  }

  const handleBuyNow = () => {
    if (product) {
      addItem(product)
      window.location.href = "/checkout"
    }
  }

  const handleAddToCart = () => {
    if (product) {
      addItem(product)
      setIsCartOpen(true)
    }
  }

  const similarProducts = products.filter(
    (p) => p.category === product?.category && p.id !== product?.id
  ).slice(0, 5)

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="mx-auto max-w-7xl px-4 lg:px-6 py-16 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Produto nao encontrado</h1>
          <Link href="/">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">Voltar para a loja</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="mx-auto max-w-7xl px-4 lg:px-6 py-6 md:py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link href="/" className="hover:text-foreground transition-colors">Inicio</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-foreground font-medium">{product.name}</span>
        </nav>

        {/* Product Detail */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 mb-16">
          {/* Product Image */}
          <div className="lg:col-span-1 space-y-4">
            <div className="relative aspect-square rounded-xl overflow-hidden bg-card border border-border/60">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-card/80 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5">
                <h2 className="font-serif text-2xl font-bold uppercase text-foreground drop-shadow-lg">
                  {product.description}
                </h2>
              </div>
            </div>

            {/* Description */}
            <div className="p-4 bg-card rounded-xl border border-border/60">
              <h3 className="font-semibold text-foreground text-sm mb-2">Descricao</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Adquira {product.name} e aproveite todos os beneficios exclusivos no servidor AIM PVP.
                Entrega automatica apos confirmacao do pagamento.
              </p>
            </div>

            {/* VIP Items (Weapons) */}
            {product.items && product.items.length > 0 && (
              <div className="p-4 bg-card rounded-xl border border-border/60">
                <div className="flex items-center gap-2 mb-3">
                  <Crosshair className="h-4 w-4 text-primary" />
                  <h3 className="font-semibold text-foreground text-sm">Armas Incluidas</h3>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {product.items.map((item, index) => (
                    <span
                      key={index}
                      className="inline-block px-2.5 py-1 text-xs font-medium bg-primary/10 text-primary border border-primary/20 rounded-lg"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* VIP Cars */}
            {product.cars && product.cars.length > 0 && (
              <div className="p-4 bg-card rounded-xl border border-border/60">
                <div className="flex items-center gap-2 mb-3">
                  <Car className="h-4 w-4 text-accent" />
                  <h3 className="font-semibold text-foreground text-sm">Carros Incluidos</h3>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {product.cars.map((car, index) => (
                    <span
                      key={index}
                      className="inline-block px-2.5 py-1 text-xs font-medium bg-accent/10 text-accent border border-accent/20 rounded-lg"
                    >
                      {car}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Product Info + Actions */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-card rounded-xl border border-border/60 p-5 space-y-5">
              <div>
                <h1 className="text-xl font-bold text-foreground">{product.name}</h1>
                <span className="inline-flex items-center mt-2 px-2.5 py-1 bg-accent/10 text-accent text-xs font-medium rounded-full border border-accent/20">
                  100+ em estoque
                </span>
              </div>

              <div>
                <p className="text-3xl font-bold text-foreground">{formatPrice(product.price)}</p>
                <p className="text-sm text-accent font-medium mt-0.5">A vista no Pix</p>
              </div>

              <div className="space-y-2.5">
                <Button
                  onClick={handleBuyNow}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-11 gap-2 font-semibold"
                >
                  <ShoppingCart className="h-4 w-4" />
                  Comprar agora
                </Button>
                <Button
                  onClick={handleAddToCart}
                  variant="outline"
                  className="w-full border-border/60 h-11 gap-2 text-foreground hover:bg-secondary bg-transparent font-medium"
                >
                  <Plus className="h-4 w-4" />
                  Adicionar ao carrinho
                </Button>
              </div>
            </div>
          </div>

          {/* Benefits */}
          <div className="lg:col-span-1">
            <div className="bg-card border border-border/60 rounded-xl p-5 space-y-5">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Vantagens</h3>

              <div className="flex items-start gap-3.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent/10 border border-accent/20 flex-shrink-0">
                  <Truck className="h-4 w-4 text-accent" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground text-sm">Entrega imediata</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed mt-0.5">
                    Receba o seu pacote imediatamente apos o pagamento.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 border border-primary/20 flex-shrink-0">
                  <Shield className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground text-sm">Seguranca total</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed mt-0.5">
                    Seus dados sao criptografados de ponta-a-ponta.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent/10 border border-accent/20 flex-shrink-0">
                  <CreditCard className="h-4 w-4 text-accent" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground text-sm">Formas de pagamento</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed mt-0.5 mb-2">
                    Aceitamos os meios de pagamentos mais populares!
                  </p>
                  <div className="flex gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10 border border-accent/20">
                      <svg viewBox="0 0 24 24" className="h-4 w-4 text-accent" fill="currentColor">
                        <path d="M12.001 2.00001L15.5 5.50001L12.001 9.00001L8.50098 5.50001L12.001 2.00001ZM5.50098 8.50001L9.00098 12L5.50098 15.5L2.00098 12L5.50098 8.50001ZM18.501 8.50001L22.001 12L18.501 15.5L15.001 12L18.501 8.50001ZM12.001 15L15.5 18.5L12.001 22L8.50098 18.5L12.001 15Z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Products */}
        {similarProducts.length > 0 && (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-6 w-1 rounded-full bg-primary" />
              <h2 className="font-serif text-xl font-bold uppercase tracking-wide text-foreground">
                Produtos similares
              </h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
              {similarProducts.map((p) => (
                <Link key={p.id} href={`/produto/${p.id}`}>
                  <div className="group flex flex-col rounded-xl bg-card border border-border/60 overflow-hidden transition-all duration-300 hover:border-primary/40">
                    <div className="relative aspect-[4/5] w-full overflow-hidden">
                      <Image
                        src={p.image || "/placeholder.svg"}
                        alt={p.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
                      <div className="absolute bottom-3 left-3 right-3">
                        <h3 className="font-serif text-sm font-bold uppercase text-foreground drop-shadow-lg">
                          {p.description}
                        </h3>
                      </div>
                    </div>
                    <div className="p-3 border-t border-border/40">
                      <p className="text-xs text-muted-foreground truncate">{p.name}</p>
                      <p className="text-sm font-bold text-foreground">{formatPrice(p.price)}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
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
