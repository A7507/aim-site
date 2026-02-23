"use client"

import { Shield } from "lucide-react"
import Link from "next/link"

export function AdminFloatButton() {
  return (
    <Link 
      href="/admin"
      className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
      title="Painel Administrativo"
    >
      <Shield className="h-6 w-6 group-hover:scale-110 transition-transform" />
      <span className="absolute -top-8 right-0 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
        Admin
      </span>
    </Link>
  )
}
