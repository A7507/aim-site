// Sistema 100% local - funciona em qualquer dispositivo sem SQL ou Supabase
export class LocalStorage {
  private readonly STORAGE_KEY = 'purchase-logs'

  async savePurchaseLog(purchaseLog: any): Promise<boolean> {
    try {
      // Salvar diretamente no localStorage
      const existingLogs = this.getFromLocalStorage()
      existingLogs.push(purchaseLog)
      
      // Salvar com timestamp atual
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(existingLogs))
      
      // Tentar sincronizar com outros dispositivos via sessionStorage (mesma sessão)
      this.syncWithSessionStorage(purchaseLog)
      
      console.log('✅ Compra salva localmente:', purchaseLog.id)
      return true
    } catch (error) {
      console.error('❌ Erro ao salvar localmente:', error)
      return false
    }
  }

  async getPurchaseLogs(): Promise<any[]> {
    try {
      // Buscar do localStorage primeiro
      const logs = this.getFromLocalStorage()
      
      // Tentar buscar de outras abas/janelas
      const sessionLogs = this.getFromSessionStorage()
      
      // Mesclar e remover duplicados
      const allLogs = [...logs, ...sessionLogs]
      const uniqueLogs = this.removeDuplicates(allLogs)
      
      // Ordenar por timestamp (mais recente primeiro)
      uniqueLogs.sort((a, b) => b.timestamp - a.timestamp)
      
      console.log(`📋 Carregados ${uniqueLogs.length} logs`)
      return uniqueLogs
    } catch (error) {
      console.error('❌ Erro ao carregar logs:', error)
      return []
    }
  }

  private getFromLocalStorage(): any[] {
    try {
      const logs = localStorage.getItem(this.STORAGE_KEY)
      return logs ? JSON.parse(logs) : []
    } catch (error) {
      console.error('Erro no localStorage:', error)
      return []
    }
  }

  private getFromSessionStorage(): any[] {
    try {
      const logs = sessionStorage.getItem('purchase-logs-session')
      return logs ? JSON.parse(logs) : []
    } catch (error) {
      return []
    }
  }

  private syncWithSessionStorage(purchaseLog: any): void {
    try {
      const sessionLogs = this.getFromSessionStorage()
      sessionLogs.push(purchaseLog)
      sessionStorage.setItem('purchase-logs-session', JSON.stringify(sessionLogs))
    } catch (error) {
      // Ignorar erros de sessionStorage
    }
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

  // Limpar logs antigos (opcional)
  clearOldLogs(daysToKeep: number = 30): void {
    try {
      const logs = this.getFromLocalStorage()
      const cutoffTime = Date.now() - (daysToKeep * 24 * 60 * 60 * 1000)
      
      const filteredLogs = logs.filter(log => log.timestamp > cutoffTime)
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(filteredLogs))
      
      console.log(`🧹 Limpos ${logs.length - filteredLogs.length} logs antigos`)
    } catch (error) {
      console.error('Erro ao limpar logs:', error)
    }
  }

  // Exportar logs (para backup)
  exportLogs(): string {
    try {
      const logs = this.getFromLocalStorage()
      return JSON.stringify(logs, null, 2)
    } catch (error) {
      console.error('Erro ao exportar:', error)
      return '[]'
    }
  }

  // Importar logs (de backup)
  importLogs(jsonData: string): boolean {
    try {
      const logs = JSON.parse(jsonData)
      if (Array.isArray(logs)) {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(logs))
        console.log('📥 Logs importados com sucesso')
        return true
      }
      return false
    } catch (error) {
      console.error('Erro ao importar:', error)
      return false
    }
  }
}

export const storage = new LocalStorage()
