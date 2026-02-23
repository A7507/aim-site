// Cliente API fallback para quando Supabase não estiver disponível
export class ApiClient {
  private baseUrl: string

  constructor() {
    // URL do seu Supabase
    this.baseUrl = 'https://yaqjetrnyvdmondsynokd.supabase.co'
  }

  async savePurchaseLog(purchaseLog: any) {
    try {
      // Tentar salvar via fetch direto (sem dependências)
      const response = await fetch(`${this.baseUrl}/rest/v1/purchase_logs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlhZ2pldHJueXZkbW9uZHN5bm9rZCIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNzIwNjQ3NDc4LCJleHAiOjE3NTEyNzY2Nzh9.V10-FQ_eDbyT3WPG',
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlhZ2pldHJueXZkbW9uZHN5bm9rZCIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNzIwNjQ3NDc4LCJleHAiOjE3NTEyNzY2Nzh9.V10-FQ_eDbyT3WPG'
        },
        body: JSON.stringify(purchaseLog)
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Erro ao salvar via API:', error)
      throw error
    }
  }

  async getPurchaseLogs() {
    try {
      const response = await fetch(`${this.baseUrl}/rest/v1/purchase_logs?order=timestamp.desc`, {
        headers: {
          'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlhZ2pldHJueXZkbW9uZHN5bm9rZCIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNzIwNjQ3NDc4LCJleHAiOjE3NTEyNzY2Nzh9.V10-FQ_eDbyT3WPG',
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlhZ2pldHJueXZkbW9uZHN5bm9rZCIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNzIwNjQ3NDc4LCJleHAiOjE3NTEyNzY2Nzh9.V10-FQ_eDbyT3WPG'
        }
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Erro ao buscar via API:', error)
      throw error
    }
  }
}

export const apiClient = new ApiClient()
