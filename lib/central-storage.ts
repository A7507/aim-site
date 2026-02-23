// Sistema centralizado - TODAS as compras aparecem no seu dashboard
export class CentralStorage {
  private readonly STORAGE_KEY = 'purchase-logs'
  private readonly CENTRAL_SYNC_KEY = 'central-admin-sync'
  private readonly ADMIN_ID = 'admin-viewer'

  async savePurchaseLog(purchaseLog: any): Promise<boolean> {
    try {
      // 1. Salvar localmente
      await this.saveLocally(purchaseLog)
      
      // 2. Sincronizar com sistema central (apenas no browser)
      if (typeof window !== 'undefined') {
        await this.syncToCentral(purchaseLog)
      }
      
      console.log('✅ Compra salva e sincronizada:', purchaseLog.id)
      return true
    } catch (error) {
      console.error('❌ Erro ao salvar/sincronizar:', error)
      return false
    }
  }

  async getPurchaseLogs(): Promise<any[]> {
    try {
      // 1. Buscar logs locais
      const localLogs = this.getFromLocalStorage()
      
      // 2. Buscar logs do sistema central (apenas no browser)
      let centralLogs: any[] = []
      if (typeof window !== 'undefined') {
        centralLogs = await this.getFromCentral()
      }
      
      // 3. Mesclar e remover duplicados
      const allLogs = [...localLogs, ...centralLogs]
      const uniqueLogs = this.removeDuplicates(allLogs)
      
      // 4. Ordenar por timestamp (mais recente primeiro)
      uniqueLogs.sort((a, b) => b.timestamp - a.timestamp)
      
      // 5. Salvar o resultado mesclado
      await this.saveMergedLogs(uniqueLogs)
      
      console.log(`📋 Carregados ${uniqueLogs.length} logs (local: ${localLogs.length}, central: ${centralLogs.length})`)
      return uniqueLogs
    } catch (error) {
      console.error('❌ Erro ao carregar logs:', error)
      return this.getFromLocalStorage() // Fallback para local
    }
  }

  private async saveLocally(purchaseLog: any): Promise<void> {
    const logs = this.getFromLocalStorage()
    logs.push(purchaseLog)
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(logs))
  }

  private getFromLocalStorage(): any[] {
    try {
      if (typeof window === 'undefined') return []
      const logs = localStorage.getItem(this.STORAGE_KEY)
      return logs ? JSON.parse(logs) : []
    } catch (error) {
      console.error('Erro no localStorage:', error)
      return []
    }
  }

  private async syncToCentral(purchaseLog: any): Promise<void> {
    try {
      // Salvar no storage central que todos podem acessar
      const syncData = {
        type: 'new_purchase',
        data: purchaseLog,
        timestamp: Date.now(),
        source: 'customer_purchase',
        deviceId: this.getDeviceId()
      }
      
      localStorage.setItem(this.CENTRAL_SYNC_KEY, JSON.stringify(syncData))
      
      // Tentar enviar via window.postMessage para outras abas/janelas
      this.broadcastToAllWindows(syncData)
      
      // Tentar sincronizar via API central
      await this.tryCentralAPISync(purchaseLog)
    } catch (error) {
      console.warn('⚠️ Falha na sincronização central:', error)
    }
  }

  private async getFromCentral(): Promise<any[]> {
    try {
      const logs: any[] = []
      
      // 1. Buscar do storage central
      if (typeof window !== 'undefined') {
        const syncData = localStorage.getItem(this.CENTRAL_SYNC_KEY)
        if (syncData) {
          const parsed = JSON.parse(syncData)
          if (parsed.type === 'new_purchase' && parsed.data) {
            logs.push(parsed.data)
          }
        }
      }
      
      // 2. Tentar buscar da API central
      const centralLogs = await this.tryCentralAPIFetch()
      logs.push(...centralLogs)
      
      return logs
    } catch (error) {
      console.warn('⚠️ Falha ao buscar do sistema central:', error)
      return []
    }
  }

  private async tryCentralAPISync(purchaseLog: any): Promise<void> {
    try {
      if (typeof window === 'undefined') return
      
      // Tentar salvar na API central
      await fetch(`${window.location.origin}/api/central-sync`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(purchaseLog)
      })
    } catch (error) {
      // Ignorar falha de API
    }
  }

  private async tryCentralAPIFetch(): Promise<any[]> {
    try {
      if (typeof window === 'undefined') return []
      
      // Tentar buscar da API central
      const response = await fetch(`${window.location.origin}/api/get-central-purchases`)
      if (response.ok) {
        return await response.json()
      }
    } catch (error) {
      // Ignorar falha de API
    }
    return []
  }

  private async saveMergedLogs(logs: any[]): Promise<void> {
    if (typeof window === 'undefined') return
    
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(logs))
    
    // Tentar salvar na API central também
    try {
      await fetch(`${window.location.origin}/api/save-central-purchases`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(logs)
      })
    } catch (error) {
      // Ignorar falha
    }
  }

  private broadcastToAllWindows(data: any): void {
    if (typeof window === 'undefined') return
    
    // Enviar para todas as abas/janelas
    window.postMessage({
      type: 'CENTRAL_PURCHASE_SYNC',
      data: data
    }, '*')
  }

  private getDeviceId(): string {
    if (typeof window === 'undefined') return 'server'
    
    let deviceId = localStorage.getItem('device-id')
    if (!deviceId) {
      deviceId = `device-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
      localStorage.setItem('device-id', deviceId)
    }
    return deviceId
  }

  private removeDuplicates(logs: any[]): any[] {
    const seen = new Set()
    return logs.filter(log => {
      if (seen.has(log.id)) {
        return false
      }
      seen.add(log.id)
      return true
    })
  }

  // Listener para sincronização central
  setupCentralListener(): void {
    if (typeof window === 'undefined') return
    
    window.addEventListener('message', (event) => {
      if (event.data && event.data.type === 'CENTRAL_PURCHASE_SYNC') {
        // Nova compra detectada - recarregar dashboard
        this.handleCentralSync(event.data.data)
      }
    })

    // Listener para mudanças no storage central
    window.addEventListener('storage', (event) => {
      if (event.key === this.CENTRAL_SYNC_KEY) {
        this.handleCentralStorageChange(event.newValue)
      }
    })
  }

  private handleCentralSync(data: any): void {
    if (typeof window === 'undefined') return
    
    // Se for admin e receber nova compra, recarregar
    const isAdmin = localStorage.getItem('admin-auth')
    if (isAdmin && data.source === 'customer_purchase') {
      setTimeout(() => {
        window.location.reload()
      }, 500)
    }
  }

  private handleCentralStorageChange(newValue: string | null): void {
    if (typeof window === 'undefined') return
    
    if (newValue) {
      try {
        const data = JSON.parse(newValue)
        const isAdmin = localStorage.getItem('admin-auth')
        
        // Se for admin e for nova compra de cliente, recarregar
        if (isAdmin && data.source === 'customer_purchase') {
          setTimeout(() => {
            window.location.reload()
          }, 1000)
        }
      } catch (error) {
        // Ignorar erro
      }
    }
  }
}

export const storage = new CentralStorage()
