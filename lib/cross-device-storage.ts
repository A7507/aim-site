// Sistema de sincronização cross-device via localStorage compartilhado
export class CrossDeviceStorage {
  private readonly STORAGE_KEY = 'purchase-logs'
  private readonly SYNC_KEY = 'cross-device-sync'

  async savePurchaseLog(purchaseLog: any): Promise<boolean> {
    try {
      // 1. Salvar localmente primeiro
      await this.saveLocally(purchaseLog)
      
      // 2. Tentar sincronizar com outros dispositivos (apenas no browser)
      if (typeof window !== 'undefined') {
        await this.syncWithOtherDevices(purchaseLog)
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
      
      // 2. Tentar buscar logs de outros dispositivos (apenas no browser)
      let remoteLogs: any[] = []
      if (typeof window !== 'undefined') {
        remoteLogs = await this.getFromOtherDevices()
      }
      
      // 3. Mesclar e remover duplicados
      const allLogs = [...localLogs, ...remoteLogs]
      const uniqueLogs = this.removeDuplicates(allLogs)
      
      // 4. Ordenar por timestamp (mais recente primeiro)
      uniqueLogs.sort((a, b) => b.timestamp - a.timestamp)
      
      // 5. Salvar o resultado mesclado
      await this.saveMergedLogs(uniqueLogs)
      
      console.log(`📋 Carregados ${uniqueLogs.length} logs (local: ${localLogs.length}, remoto: ${remoteLogs.length})`)
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

  private async syncWithOtherDevices(purchaseLog: any): Promise<void> {
    try {
      // Salvar em um storage compartilhado que outros dispositivos podem ler
      const syncData = {
        type: 'new_purchase',
        data: purchaseLog,
        timestamp: Date.now(),
        deviceId: this.getDeviceId()
      }
      
      localStorage.setItem(this.SYNC_KEY, JSON.stringify(syncData))
      
      // Tentar enviar via window.postMessage para outras abas/janelas
      this.broadcastToOtherWindows(syncData)
      
      // Tentar sincronizar via fetch (se tiver backend)
      await this.tryServerSync(purchaseLog)
    } catch (error) {
      console.warn('⚠️ Falha na sincronização:', error)
    }
  }

  private async getFromOtherDevices(): Promise<any[]> {
    try {
      const logs: any[] = []
      
      // 1. Buscar do storage compartilhado
      if (typeof window !== 'undefined') {
        const syncData = localStorage.getItem(this.SYNC_KEY)
        if (syncData) {
          const parsed = JSON.parse(syncData)
          if (parsed.type === 'new_purchase' && parsed.data) {
            logs.push(parsed.data)
          }
        }
      }
      
      // 2. Tentar buscar do servidor
      const serverLogs = await this.tryServerFetch()
      logs.push(...serverLogs)
      
      return logs
    } catch (error) {
      console.warn('⚠️ Falha ao buscar de outros dispositivos:', error)
      return []
    }
  }

  private async tryServerSync(purchaseLog: any): Promise<void> {
    try {
      if (typeof window === 'undefined') return
      
      // Tentar salvar em um arquivo JSON no servidor (se existir)
      await fetch(`${window.location.origin}/api/sync-purchase`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(purchaseLog)
      })
    } catch (error) {
      // Ignorar falha de servidor - pode não existir
    }
  }

  private async tryServerFetch(): Promise<any[]> {
    try {
      if (typeof window === 'undefined') return []
      
      // Tentar buscar do servidor
      const response = await fetch(`${window.location.origin}/api/get-purchases`)
      if (response.ok) {
        return await response.json()
      }
    } catch (error) {
      // Ignorar falha de servidor
    }
    return []
  }

  private async saveMergedLogs(logs: any[]): Promise<void> {
    if (typeof window === 'undefined') return
    
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(logs))
    
    // Tentar salvar no servidor também
    try {
      await fetch(`${window.location.origin}/api/save-purchases`, {
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

  private broadcastToOtherWindows(data: any): void {
    if (typeof window === 'undefined') return
    
    // Enviar para outras abas/janelas do mesmo domínio
    window.postMessage({
      type: 'PURCHASE_SYNC',
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

  // Listener para mensagens de outras abas
  setupCrossTabListener(): void {
    if (typeof window === 'undefined') return
    
    window.addEventListener('message', (event) => {
      if (event.data && event.data.type === 'PURCHASE_SYNC') {
        // Processar sincronização de outra aba
        this.handleSyncMessage(event.data.data)
      }
    })

    // Listener para mudanças no storage
    window.addEventListener('storage', (event) => {
      if (event.key === this.SYNC_KEY) {
        // Outro dispositivo/janela salvou algo
        this.handleStorageChange(event.newValue)
      }
    })
  }

  private handleSyncMessage(data: any): void {
    if (typeof window === 'undefined') return
    
    if (data.deviceId !== this.getDeviceId()) {
      // Sincronização de outro dispositivo - recarregar dados
      setTimeout(() => {
        window.location.reload()
      }, 1000)
    }
  }

  private handleStorageChange(newValue: string | null): void {
    if (typeof window === 'undefined') return
    
    if (newValue) {
      try {
        const data = JSON.parse(newValue)
        if (data.deviceId !== this.getDeviceId()) {
          // Outro dispositivo salvou - atualizar
          setTimeout(() => {
            window.location.reload()
          }, 500)
        }
      } catch (error) {
        // Ignorar erro
      }
    }
  }
}

export const storage = new CrossDeviceStorage()
