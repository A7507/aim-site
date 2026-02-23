"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { LogOut, ShoppingCart, CreditCard, Package, TrendingUp, Users } from "lucide-react"
import { storage } from "@/lib/central-storage"

interface PurchaseLog {
  id: string
  timestamp: number
  items: Array<{
    id: string
    name: string
    price: number
    quantity: number
    category: string
  }>
  total: number
  paymentMethod: string
  status: "completed" | "pending" | "failed"
  customerInfo?: {
    email?: string
    name?: string
  }
}

export default function AdminDashboard() {
  const [purchaseLogs, setPurchaseLogs] = useState<PurchaseLog[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Verificar autenticação
    const isAuth = localStorage.getItem("admin-auth")
    if (!isAuth) {
      router.push("/admin/login")
      return
    }

    // Configurar listener de sincronização central
    storage.setupCentralListener()

    // Carregar logs de compras do sistema central
    loadPurchaseLogs()
  }, [router])

  const loadPurchaseLogs = async () => {
    try {
      // Usar sistema 100% local - funciona em qualquer dispositivo
      const data = await storage.getPurchaseLogs()
      
      // Converter dados para o formato esperado
      const formattedLogs = data.map((log: any) => ({
        id: log.id,
        timestamp: log.timestamp,
        items: log.items,
        total: log.total,
        paymentMethod: log.payment_method,
        status: log.status,
        customerInfo: {
          name: log.customer_name,
          email: log.customer_email
        }
      }))
      setPurchaseLogs(formattedLogs)
    } catch (error) {
      console.error("Erro ao carregar logs:", error)
      // Fallback: buscar do localStorage
      loadFromLocalStorage()
    } finally {
      setLoading(false)
    }
  }

  const loadFromLocalStorage = () => {
    try {
      const logs = localStorage.getItem("purchase-logs")
      if (logs) {
        setPurchaseLogs(JSON.parse(logs))
      } else {
        // Criar dados de exemplo para demonstração
        const sampleLogs: PurchaseLog[] = [
          {
            id: "PUR-001",
            timestamp: Date.now() - 86400000, // 1 dia atrás
            items: [
              { id: "vip-30d", name: "VIP 30 Dias", price: 29.99, quantity: 1, category: "VIP" },
              { id: "cash-1000", name: "Cash 1000", price: 9.99, quantity: 2, category: "Cash" }
            ],
            total: 49.97,
            paymentMethod: "PIX",
            status: "completed",
            customerInfo: { email: "joao@email.com", name: "João Silva" }
          },
          {
            id: "PUR-002", 
            timestamp: Date.now() - 172800000, // 2 dias atrás
            items: [
              { id: "carro-sport", name: "Carro Esportivo", price: 89.99, quantity: 1, category: "Veículos" }
            ],
            total: 89.99,
            paymentMethod: "Cartão de Crédito",
            status: "completed",
            customerInfo: { email: "maria@email.com", name: "Maria Santos" }
          },
          {
            id: "PUR-003",
            timestamp: Date.now() - 259200000, // 3 dias atrás
            items: [
              { id: "vip-7d", name: "VIP 7 Dias", price: 9.99, quantity: 1, category: "VIP" },
              { id: "arma-pack", name: "Pack de Armas", price: 19.99, quantity: 1, category: "Itens" }
            ],
            total: 29.98,
            paymentMethod: "Boleto",
            status: "pending",
            customerInfo: { email: "carlos@email.com", name: "Carlos Oliveira" }
          }
        ]
        setPurchaseLogs(sampleLogs)
      }
    } catch (error) {
      console.error("Erro ao carregar logs do localStorage:", error)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("admin-auth")
    localStorage.removeItem("admin-login-time")
    
    // Remover cookie também
    document.cookie = "admin-auth=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
    
    router.push("/admin/login")
  }

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString('pt-BR')
  }

  const getStatusBadge = (status: string) => {
    const variants = {
      completed: "bg-green-500/20 text-green-400 border-green-800/50",
      pending: "bg-yellow-500/20 text-yellow-400 border-yellow-800/50", 
      failed: "bg-red-500/20 text-red-400 border-red-800/50"
    }
    
    const labels = {
      completed: "Concluído",
      pending: "Pendente",
      failed: "Falhou"
    }

    return (
      <Badge className={variants[status as keyof typeof variants]}>
        {labels[status as keyof typeof labels]}
      </Badge>
    )
  }

  const getTotalStats = () => {
    const totalRevenue = purchaseLogs
      .filter(log => log.status === "completed")
      .reduce((sum, log) => sum + log.total, 0)
    
    const totalOrders = purchaseLogs.length
    const completedOrders = purchaseLogs.filter(log => log.status === "completed").length
    const pendingOrders = purchaseLogs.filter(log => log.status === "pending").length

    return { totalRevenue, totalOrders, completedOrders, pendingOrders }
  }

  const stats = getTotalStats()

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-white">Carregando...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <div className="border-b border-purple-800/20 bg-black/40 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-white">Painel Administrativo</h1>
              <Badge variant="outline" className="border-purple-500/50 text-purple-400">
                AIM PVP
              </Badge>
            </div>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="border-red-500/50 text-red-400 hover:bg-red-500/10"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sair
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-purple-800/20 bg-black/40 backdrop-blur-xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Receita Total</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">R$ {stats.totalRevenue.toFixed(2)}</div>
              <p className="text-xs text-gray-500 mt-1">Vendas concluídas</p>
            </CardContent>
          </Card>

          <Card className="border-purple-800/20 bg-black/40 backdrop-blur-xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Total de Pedidos</CardTitle>
              <ShoppingCart className="h-4 w-4 text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats.totalOrders}</div>
              <p className="text-xs text-gray-500 mt-1">Todos os status</p>
            </CardContent>
          </Card>

          <Card className="border-purple-800/20 bg-black/40 backdrop-blur-xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Pedidos Concluídos</CardTitle>
              <Package className="h-4 w-4 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats.completedOrders}</div>
              <p className="text-xs text-gray-500 mt-1">Pagamentos confirmados</p>
            </CardContent>
          </Card>

          <Card className="border-purple-800/20 bg-black/40 backdrop-blur-xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Pedidos Pendentes</CardTitle>
              <CreditCard className="h-4 w-4 text-yellow-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats.pendingOrders}</div>
              <p className="text-xs text-gray-500 mt-1">Aguardando pagamento</p>
            </CardContent>
          </Card>
        </div>

        {/* Purchase Logs Table */}
        <Card className="border-purple-800/20 bg-black/40 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-white">Logs de Compras</CardTitle>
            <CardDescription className="text-gray-400">
              Histórico completo de compras realizadas na loja
            </CardDescription>
          </CardHeader>
          <CardContent>
            {purchaseLogs.length === 0 ? (
              <Alert className="bg-blue-900/20 border-blue-800/50 text-blue-400">
                <AlertDescription>
                  Nenhuma compra registrada ainda. Os logs aparecerão aqui quando os clientes realizarem compras.
                </AlertDescription>
              </Alert>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-purple-800/20">
                      <TableHead className="text-gray-300">ID</TableHead>
                      <TableHead className="text-gray-300">Data</TableHead>
                      <TableHead className="text-gray-300">Cliente</TableHead>
                      <TableHead className="text-gray-300">Itens</TableHead>
                      <TableHead className="text-gray-300">Total</TableHead>
                      <TableHead className="text-gray-300">Pagamento</TableHead>
                      <TableHead className="text-gray-300">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {purchaseLogs.map((log) => (
                      <TableRow key={log.id} className="border-purple-800/10">
                        <TableCell className="font-mono text-purple-400">{log.id}</TableCell>
                        <TableCell className="text-gray-300">{formatDate(log.timestamp)}</TableCell>
                        <TableCell className="text-gray-300">
                          <div>
                            <div className="font-medium">{log.customerInfo?.name || "N/A"}</div>
                            <div className="text-sm text-gray-500">{log.customerInfo?.email || "N/A"}</div>
                          </div>
                        </TableCell>
                        <TableCell className="text-gray-300">
                          <div className="space-y-1">
                            {log.items.map((item, index) => (
                              <div key={index} className="text-sm">
                                {item.quantity}x {item.name}
                                <Badge variant="outline" className="ml-2 text-xs border-gray-700 text-gray-400">
                                  {item.category}
                                </Badge>
                              </div>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell className="font-medium text-green-400">
                          R$ {log.total.toFixed(2)}
                        </TableCell>
                        <TableCell className="text-gray-300">{log.paymentMethod}</TableCell>
                        <TableCell>{getStatusBadge(log.status)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
