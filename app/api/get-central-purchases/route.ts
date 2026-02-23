import { NextResponse } from 'next/server'

// API central para buscar TODAS as compras
const CENTRAL_FILE_PATH = './central-purchases.json'

export async function GET() {
  try {
    // Ler logs do arquivo central
    let logs = []
    try {
      const fs = await import('fs')
      if (fs.existsSync && fs.existsSync(CENTRAL_FILE_PATH)) {
        const data = fs.readFileSync(CENTRAL_FILE_PATH, 'utf8')
        logs = JSON.parse(data)
      }
    } catch (error) {
      console.error('Erro ao ler logs central:', error)
    }
    
    console.log(`📋 Enviadas ${logs.length} compras do sistema central`)
    return NextResponse.json(logs)
  } catch (error) {
    console.error('Erro na API central:', error)
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 })
  }
}
