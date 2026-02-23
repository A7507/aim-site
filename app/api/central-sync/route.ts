import { NextRequest, NextResponse } from 'next/server'

// API central para sincronização de TODAS as compras
const CENTRAL_FILE_PATH = './central-purchases.json'

export async function POST(request: NextRequest) {
  try {
    const purchaseLog = await request.json()
    
    // Ler logs existentes
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
    
    // Adicionar novo log
    logs.push(purchaseLog)
    
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
    
    // Broadcast para todos os admins conectados
    await broadcastToAdmins(purchaseLog)
    
    console.log('✅ Compra salva no sistema central:', purchaseLog.id)
    return NextResponse.json({ success: true, logs })
  } catch (error) {
    console.error('Erro na API central:', error)
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 })
  }
}

async function broadcastToAdmins(purchaseLog: any) {
  try {
    // Aqui você pode adicionar notificações para múltiplos admins
    // Por enquanto, apenas log no console
    console.log('📢 Broadcast para admins:', purchaseLog.id)
  } catch (error) {
    console.error('Erro no broadcast:', error)
  }
}
