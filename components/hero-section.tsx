"use client"

import { ArrowDown, Zap, Shield, Users } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden rounded-2xl border border-border/60 bg-card">
      {/* Background image */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: "url('/images/character-bg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center top",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-card via-card/90 to-card/60" />
      <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />

      <div className="relative z-10 px-6 py-12 md:px-12 md:py-16 lg:py-20">
        <div className="max-w-2xl">
          {/* Tag */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Zap className="h-3.5 w-3.5 text-primary" />
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">
              Servidor Online
            </span>
          </div>

          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight text-foreground leading-[1.1]">
            <span className="text-primary">Aim</span> PvP
          </h1>
          <p className="mt-4 text-base md:text-lg text-muted-foreground leading-relaxed max-w-lg">
            O melhor servidor de PVP do FiveM. Adquira VIPs, carros exclusivos e muito mais na nossa loja oficial.
          </p>

          {/* Stats */}
          <div className="mt-8 flex flex-wrap items-center gap-6 md:gap-10">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent/10 border border-accent/20">
                <Users className="h-4 w-4 text-accent" />
              </div>
              <div>
                <p className="text-sm font-bold text-foreground">500+</p>
                <p className="text-xs text-muted-foreground">Jogadores</p>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 border border-primary/20">
                <Shield className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-sm font-bold text-foreground">100%</p>
                <p className="text-xs text-muted-foreground">Seguro</p>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent/10 border border-accent/20">
                <Zap className="h-4 w-4 text-accent" />
              </div>
              <div>
                <p className="text-sm font-bold text-foreground">Instant</p>
                <p className="text-xs text-muted-foreground">Entrega</p>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-4 right-6 hidden md:flex items-center gap-2 text-muted-foreground animate-bounce">
          <ArrowDown className="h-4 w-4" />
          <span className="text-xs uppercase tracking-wider">Ver produtos</span>
        </div>
      </div>
    </section>
  )
}
