"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { useCart } from "@/context/cart-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import Image from "next/image"
import Link from "next/link"
import {
  ChevronRight,
  Shield,
  Minus,
  Plus,
  X,
  Ticket,
  Zap,
  Copy,
  Check,
  QrCode,
} from "lucide-react"

type PaymentMethod = "pix" | "paypal"

export default function CheckoutPage() {
  const {
    items,
    updateQuantity,
    removeItem,
    getSubtotal,
    getTotal,
    coupon,
    discount,
    applyCoupon,
    removeCoupon,
    clearCart,
    savePurchaseLog,
  } = useCart()

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("pix")
  const [couponInput, setCouponInput] = useState("")
  const [couponError, setCouponError] = useState("")
  const [couponSuccess, setCouponSuccess] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    steamHex: "",
  })
  const [acceptTerms, setAcceptTerms] = useState(false)
  const [showPixPayment, setShowPixPayment] = useState(false)
  const [pixCopied, setPixCopied] = useState(false)

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price)
  }

  const handleApplyCoupon = () => {
    setCouponError("")
    setCouponSuccess(false)
    if (couponInput.trim() === "") {
      setCouponError("Digite um cupom")
      return
    }
    const success = applyCoupon(couponInput)
    if (success) {
      setCouponSuccess(true)
      setCouponInput("")
    } else {
      setCouponError("Cupom invalido")
    }
  }

  const getPixKey = () => {
    return "netoferrariz884@gmail.com"
  }

  const pixKey = getPixKey()

  const handleCopyPix = () => {
    navigator.clipboard.writeText(pixKey)
    setPixCopied(true)
    setTimeout(() => setPixCopied(false), 2000)
  }

  const handlePayment = () => {
    if (!formData.name || !formData.email || !formData.steamHex) {
      alert("Por favor, preencha todos os campos")
      return
    }
    if (!acceptTerms) {
      alert("Aceite os termos e condicoes para continuar")
      return
    }

    if (paymentMethod === "pix") {
      setShowPixPayment(true)
    } else {
      window.open(
        `https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=israelclestino08@gmail.com&amount=${getTotal().toFixed(2)}&currency_code=BRL`,
        "_blank"
      )
    }
  }

  const handleConfirmPayment = async () => {
    // Salvar log da compra antes de limpar o carrinho
    const paymentMethodText = paymentMethod === "pix" ? "PIX" : "PayPal"
    await savePurchaseLog(paymentMethodText, {
      name: formData.name,
      email: formData.email
    })
    
    alert("Pagamento confirmado! Voce recebera os itens em breve.")
    window.location.href = "/"
  }

  if (items.length === 0 && !showPixPayment) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="mx-auto max-w-7xl px-4 lg:px-6 py-16 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">
            Seu carrinho esta vazio
          </h1>
          <Link href="/">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
              Voltar para a loja
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  if (showPixPayment) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="mx-auto max-w-2xl px-4 lg:px-6 py-8">
          <div className="bg-card border border-border/60 rounded-xl p-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-accent/10 border border-accent/20 rounded-2xl mb-4">
                <QrCode className="h-7 w-7 text-accent" />
              </div>
              <h1 className="text-2xl font-bold text-foreground mb-2">
                Pagamento via PIX
              </h1>
              <p className="text-sm text-muted-foreground">
                Copie a chave PIX para realizar o pagamento
              </p>
            </div>

            <div className="flex flex-col items-center gap-6">
              {/* PIX Key */}
              <div className="w-full max-w-md">
                <Label className="text-muted-foreground text-xs uppercase tracking-wider">
                  Chave PIX (Copia e Cola)
                </Label>
                <div className="flex gap-2 mt-2">
                  <Input
                    value={pixKey}
                    readOnly
                    className="bg-secondary border-border/60 text-foreground font-mono text-sm"
                  />
                  <Button
                    onClick={handleCopyPix}
                    variant="outline"
                    className="border-accent/40 text-accent hover:bg-accent hover:text-accent-foreground bg-transparent"
                  >
                    {pixCopied ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              {/* Value */}
              <div className="text-center">
                <p className="text-xs text-muted-foreground uppercase tracking-wider">
                  Valor a pagar
                </p>
                <p className="text-3xl font-bold text-foreground mt-1">
                  {formatPrice(getTotal())}
                </p>
              </div>

              {/* Confirm Button */}
              <Button
                onClick={handleConfirmPayment}
                className="w-full max-w-md bg-accent hover:bg-accent/90 text-accent-foreground h-11 font-semibold"
              >
                Ja realizei o pagamento
              </Button>

              <Link href="/checkout">
                <Button
                  variant="ghost"
                  className="text-muted-foreground hover:text-foreground"
                  onClick={() => setShowPixPayment(false)}
                >
                  Voltar
                </Button>
              </Link>
            </div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="mx-auto max-w-7xl px-4 lg:px-6 py-6 md:py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link href="/" className="hover:text-foreground transition-colors">
            Inicio
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-foreground font-medium">Checkout</span>
        </nav>

        <div className="flex items-center gap-3 mb-8">
          <div className="h-6 w-1 rounded-full bg-primary" />
          <h1 className="font-serif text-2xl font-bold uppercase tracking-wide text-foreground">Checkout</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Left Column - Payment Form */}
          <div className="lg:col-span-2 space-y-5">
            {/* Payment Methods */}
            <div className="bg-card border border-border/60 rounded-xl p-5">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">
                Forma de pagamento
              </h2>

              <div className="space-y-2.5">
                {/* PIX */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod("pix")}
                  className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-all ${
                    paymentMethod === "pix"
                      ? "border-accent/40 bg-accent/5"
                      : "border-border/60 hover:border-border"
                  }`}
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 border border-accent/20">
                    <svg
                      viewBox="0 0 24 24"
                      className="h-5 w-5 text-accent"
                      fill="currentColor"
                    >
                      <path d="M12.001 2.00001L15.5 5.50001L12.001 9.00001L8.50098 5.50001L12.001 2.00001ZM5.50098 8.50001L9.00098 12L5.50098 15.5L2.00098 12L5.50098 8.50001ZM18.501 8.50001L22.001 12L18.501 15.5L15.001 12L18.501 8.50001ZM12.001 15L15.5 18.5L12.001 22L8.50098 18.5L12.001 15Z" />
                    </svg>
                  </div>
                  <div className="flex-1 text-left">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-foreground text-sm">Pix</span>
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-accent/10 text-accent text-[10px] font-semibold rounded-full border border-accent/20">
                        <Zap className="h-3 w-3" />
                        Mais rapido
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Aprovacao Imediata
                    </p>
                  </div>
                </button>

                {/* PayPal */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod("paypal")}
                  className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-all ${
                    paymentMethod === "paypal"
                      ? "border-blue-500/40 bg-blue-500/5"
                      : "border-border/60 hover:border-border"
                  }`}
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10 border border-blue-500/20">
                    <svg
                      viewBox="0 0 24 24"
                      className="h-5 w-5 text-blue-400"
                      fill="currentColor"
                    >
                      <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944 3.72a.77.77 0 0 1 .757-.629h6.674c2.244 0 3.917.57 4.97 1.693.476.508.794 1.09.951 1.735.16.658.177 1.448.05 2.35-.15 1.07-.445 2.003-.878 2.776-.433.77-1.003 1.42-1.695 1.932-.692.513-1.52.9-2.463 1.152-.943.25-2.002.376-3.146.376H8.35a.64.64 0 0 0-.632.74l-1.1 7.092a.64.64 0 0 1-.631.54h-.91zm14.47-15.45a.48.48 0 0 0-.474.403l-.96 6.096c-.094.6-.277 1.118-.546 1.551-.269.434-.62.791-1.052 1.074-.433.282-.942.49-1.528.623-.586.132-1.245.198-1.977.198h-1.71a.48.48 0 0 0-.474.555l.638 4.048a.48.48 0 0 0 .474.403h2.85a.64.64 0 0 0 .632-.54l.524-3.378a.64.64 0 0 1 .632-.54h1.472c2.866 0 5.12-1.056 5.896-4.146.324-1.294.42-2.498-.177-3.5-.608-1.02-1.85-1.59-3.596-1.847a.48.48 0 0 0-.623.403z" />
                    </svg>
                  </div>
                  <div className="flex-1 text-left">
                    <span className="font-medium text-foreground text-sm">PayPal</span>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Pague com sua conta PayPal
                    </p>
                  </div>
                </button>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-card border border-border/60 rounded-xl p-5">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">
                Informacoes de contato
              </h2>

              <div className="space-y-3">
                <Input
                  placeholder="Nome completo"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="bg-secondary/80 border-border/60 text-foreground placeholder:text-muted-foreground h-10"
                />
                <Input
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="bg-secondary/80 border-border/60 text-foreground placeholder:text-muted-foreground h-10"
                />
                <Input
                  placeholder="seu id ex: 123"
                  value={formData.steamHex}
                  onChange={(e) =>
                    setFormData({ ...formData, steamHex: e.target.value })
                  }
                  className="bg-secondary/80 border-border/60 text-foreground placeholder:text-muted-foreground h-10"
                />
              </div>
            </div>

            {/* Terms and Pay Button */}
            <div className="space-y-4">
              <div className="flex items-center gap-2.5">
                <Checkbox
                  id="terms"
                  checked={acceptTerms}
                  onCheckedChange={(checked) =>
                    setAcceptTerms(checked as boolean)
                  }
                  className="border-border/60 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                />
                <label
                  htmlFor="terms"
                  className="text-sm text-muted-foreground"
                >
                  Eu aceito os{" "}
                  <span className="text-primary cursor-pointer hover:underline">
                    termos e condicoes
                  </span>{" "}
                  desta compra.
                </label>
              </div>

              <Button
                onClick={handlePayment}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-12 text-base font-semibold"
                disabled={!acceptTerms}
              >
                Pagar {formatPrice(getTotal())}
              </Button>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="space-y-5">
            <div className="bg-card border border-border/60 rounded-xl p-5">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  Resumo do pedido
                </h2>
                <span className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary text-[10px] font-semibold rounded-full border border-primary/20">
                  <Shield className="h-3 w-3" />
                  Seguro
                </span>
              </div>

              {/* Cart Items */}
              <div className="space-y-3 mb-5">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center gap-3">
                    <div className="relative h-14 w-14 rounded-lg overflow-hidden flex-shrink-0 border border-border/40">
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
                      <p className="text-xs text-muted-foreground">
                        {formatPrice(item.price)}
                      </p>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-6 w-6 border-border/60 bg-transparent rounded-md"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="text-xs text-foreground w-5 text-center font-medium">
                        {item.quantity}
                      </span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-6 w-6 border-border/60 bg-transparent rounded-md"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 text-muted-foreground hover:text-destructive"
                        onClick={() => removeItem(item.id)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                    <span className="text-sm font-medium text-foreground w-20 text-right">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Coupon Input */}
              <div className="flex gap-2 mb-4">
                <Input
                  placeholder="Cupom de desconto"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                  className="bg-secondary/80 border-border/60 text-foreground placeholder:text-muted-foreground h-9 text-sm"
                />
                <Button
                  onClick={handleApplyCoupon}
                  variant="outline"
                  className="border-accent/40 text-accent hover:bg-accent hover:text-accent-foreground gap-1.5 bg-transparent h-9 text-sm"
                >
                  <Ticket className="h-3.5 w-3.5" />
                  Aplicar
                </Button>
              </div>
              {couponError && (
                <p className="text-destructive text-xs mb-3">{couponError}</p>
              )}
              {couponSuccess && (
                <p className="text-accent text-xs mb-3">
                  Cupom aplicado com sucesso! {discount}% de desconto
                </p>
              )}
              {coupon && (
                <div className="flex items-center justify-between bg-accent/5 border border-accent/20 p-3 rounded-lg mb-4">
                  <span className="text-accent text-xs font-medium">
                    Cupom: {coupon} (-{discount}%)
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={removeCoupon}
                    className="text-muted-foreground hover:text-destructive h-auto p-1"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              )}

              {/* Order Totals */}
              <div className="space-y-2 border-t border-border/60 pt-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="text-foreground">{formatPrice(getSubtotal())}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Descontos</span>
                  <span className="text-accent">
                    {discount > 0
                      ? `- ${formatPrice((getSubtotal() * discount) / 100)}`
                      : formatPrice(0)}
                  </span>
                </div>
                <div className="flex justify-between text-lg font-bold pt-3 border-t border-border/60">
                  <span className="text-foreground">Total</span>
                  <span className="text-foreground">{formatPrice(getTotal())}</span>
                </div>
              </div>
            </div>
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
