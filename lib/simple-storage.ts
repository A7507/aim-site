// Sistema de armazenamento simplificado que funciona em qualquer dispositivo
export class SimpleStorage {
  private supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://yaqjetrnyvdmondsynokd.supabase.co'
  private apiKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlhZ2pldHJueXZkbW9uZHN5bm9rZCIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNzIwNjQ3NDc4LCJleHAiOjE3NTEyNzY2Nzh9.V10-FQ_eDbyT3WPG'

  async savePurchaseLog(purchaseLog: any): Promise<boolean> {
    try {
      // Tentar salvar no Supabase via fetch
      const response = await fetch(`${this.supabaseUrl}/rest/v1/purchase_logs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': this.apiKey,
          'Authorization': `Bearer ${this.apiKey}`,
          'Prefer': 'return=minimal'
        },
        body: JSON.stringify(purchaseLog)
      })

      if (response.ok) {
        console.log('✅ Salvo no Supabase com sucesso')
        return true
      } else {
        throw new Error(`HTTP ${response.status}`)
      }
    } catch (error) {
      console.warn('⚠️ Falha ao salvar no Supabase, usando localStorage:', error)
      // Sempre salva no localStorage como backup
      this.saveToLocalStorage(purchaseLog)
      return false
    }
  }

  async getPurchaseLogs(): Promise<any[]> {
    try {
      // Tentar buscar do Supabase
      const response = await fetch(`${this.supabaseUrl}/rest/v1/purchase_logs?order=timestamp.desc`, {
        headers: {
          'apikey': this.apiKey,
          'Authorization': `Bearer ${this.apiKey}`
        }
      })

      if (response.ok) {
        const data = await response.json()
        console.log('✅ Dados carregados do Supabase:', data.length, 'registros')
        return data
      } else {
        throw new Error(`HTTP ${response.status}`)
      }
    } catch (error) {
      console.warn('⚠️ Falha ao buscar do Supabase, usando localStorage:', error)
      // Fallback para localStorage
      return this.getFromLocalStorage()
    }
  }

  private saveToLocalStorage(purchaseLog: any): void {
    try {
      const existingLogs = localStorage.getItem('purchase-logs')
      let logs = existingLogs ? JSON.parse(existingLogs) : []
      logs.push(purchaseLog)
      localStorage.setItem('purchase-logs', JSON.stringify(logs))
      console.log('💾 Salvo no localStorage')
    } catch (error) {
      console.error('❌ Erro ao salvar no localStorage:', error)
    }
  }

  private getFromLocalStorage(): any[] {
    try {
      const logs = localStorage.getItem('purchase-logs')
      return logs ? JSON.parse(logs) : []
    } catch (error) {
      console.error('❌ Erro ao ler do localStorage:', error)
      return []
    }
  }

  // Método para sincronizar localStorage com Supabase quando voltar online
  async syncOfflineData(): Promise<void> {
    const localLogs = this.getFromLocalStorage()
    
    for (const log of localLogs) {
      try {
        await this.savePurchaseLog(log)
        // Se salvou com sucesso, remove do localStorage
        this.removeFromLocalStorage(log.id)
      } catch (error) {
        console.warn('⚠️ Não foi possível sincronizar:', log.id)
      }
    }
  }

  private removeFromLocalStorage(logId: string): void {
    try {
      const logs = this.getFromLocalStorage()
      const filteredLogs = logs.filter((log: any) => log.id !== logId)
      localStorage.setItem('purchase-logs', JSON.stringify(filteredLogs))
    } catch (error) {
      console.error('❌ Erro ao remover do localStorage:', error)
    }
  }
}

export const storage = new SimpleStorage()
