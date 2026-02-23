import { NextRequest, NextResponse } from 'next/server'

// API central para salvar TODAS as compras
const CENTRAL_FILE_PATH = './central-purchases.json'

export async function POST(request: NextRequest) {
  try {
    const logs = await request.json()
    
    // Salvar no arquivo central
    try {
      const fs = await import('fs')
      if (fs.writeFileSync) {
        fs.writeFileSync(CENTRAL_FILE_PATH, JSON.stringify(logs, null, 2))
      }
    } catch (error) {
      console.error('Erro ao salvar logs central:', error)
      return NextResponse.json({ error: 'Falha ao salvar' }, { status: 500 })
    }
    
    console.log(`💾 Salvos ${logs.length} logs no sistema central`)
    return NextResponse.json({ success: true, logs })
  } catch (error) {
    console.error('Erro na API central:', error)
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 })
  }
}
