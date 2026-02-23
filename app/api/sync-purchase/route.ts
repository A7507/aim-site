import { NextRequest, NextResponse } from 'next/server'

// Arquivo JSON para sincronização entre dispositivos
const SYNC_FILE_PATH = './purchase-logs.json'

export async function POST(request: NextRequest) {
  try {
    const purchaseLog = await request.json()
    
    // Ler logs existentes
    let logs = []
    try {
      const fs = await import('fs')
      if (fs.existsSync && fs.existsSync(SYNC_FILE_PATH)) {
        const data = fs.readFileSync(SYNC_FILE_PATH, 'utf8')
        logs = JSON.parse(data)
      }
    } catch (error) {
      console.error('Erro ao ler logs:', error)
    }
    
    // Adicionar novo log
    logs.push(purchaseLog)
    
    // Salvar no arquivo
    try {
      const fs = await import('fs')
      if (fs.writeFileSync) {
        fs.writeFileSync(SYNC_FILE_PATH, JSON.stringify(logs, null, 2))
      }
    } catch (error) {
      console.error('Erro ao salvar logs:', error)
      return NextResponse.json({ error: 'Falha ao salvar' }, { status: 500 })
    }
    
    return NextResponse.json({ success: true, logs })
  } catch (error) {
    console.error('Erro na API:', error)
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 })
  }
}
