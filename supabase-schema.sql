-- Criar tabela de logs de compras
CREATE TABLE IF NOT EXISTS purchase_logs (
  id TEXT PRIMARY KEY,
  timestamp BIGINT NOT NULL,
  items JSONB NOT NULL,
  total DECIMAL(10,2) NOT NULL,
  payment_method TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'completed',
  customer_name TEXT,
  customer_email TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Criar índices para melhor performance
CREATE INDEX IF NOT EXISTS idx_purchase_logs_timestamp ON purchase_logs(timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_purchase_logs_status ON purchase_logs(status);
CREATE INDEX IF NOT EXISTS idx_purchase_logs_email ON purchase_logs(customer_email);

-- Habilitar RLS (Row Level Security) para segurança
ALTER TABLE purchase_logs ENABLE ROW LEVEL SECURITY;

-- Criar política para permitir leitura e escrita
CREATE POLICY "Allow all operations on purchase_logs" ON purchase_logs
  FOR ALL USING (true) WITH CHECK (true);
