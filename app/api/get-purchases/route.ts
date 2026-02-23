import { NextResponse } from 'next/server'

// Arquivo JSON para sincronização entre dispositivos
const SYNC_FILE_PATH = './purchase-logs.json'

export async function GET() {
  try {
    // Ler logs do arquivo compartilhado
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
    
    return NextResponse.json(logs)
  } catch (error) {
    console.error('Erro na API:', error)
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 })
  }
}
