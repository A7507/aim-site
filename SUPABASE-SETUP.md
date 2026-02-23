# Configuração do Supabase para Logs de Compras

## 🚀 Passos para Configurar

### 1. Criar Tabela no Supabase

1. Acesse seu projeto Supabase: https://yaqjetrnyvdmondsynokd.supabase.co
2. Vá para **SQL Editor** no menu lateral
3. Copie e cole o conteúdo do arquivo `supabase-schema.sql`
4. Clique em **Run** para executar

### 2. Estrutura da Tabela

A tabela `purchase_logs` terá os seguintes campos:
- `id`: ID único da compra
- `timestamp`: Data/hora da compra
- `items`: JSON com os itens comprados
- `total`: Valor total
- `payment_method`: Método de pagamento
- `status`: Status (completed, pending, failed)
- `customer_name`: Nome do cliente
- `customer_email`: Email do cliente
- `created_at`: Data de criação no Supabase

### 3. Como Funciona

✅ **Salvamento Automático:**
- Quando um cliente confirma pagamento, os dados são salvos no Supabase
- Se o Supabase falhar, faz fallback para localStorage

✅ **Dashboard Admin:**
- Busca dados优先 do Supabase
- Se falhar, usa dados do localStorage
- Mostra logs em tempo real de qualquer dispositivo

✅ **Acesso Universal:**
- Visualize logs de qualquer computador/celular
- Dados sincronizados na nuvem
- Backup automático

### 4. Testar a Integração

1. Inicie o servidor: `npm run dev`
2. Faça uma compra de teste no site
3. Acesse `/admin` com suas credenciais
4. Verifique se os logs aparecem no dashboard

### 5. Verificar no Supabase

1. No dashboard Supabase, vá para **Table Editor**
2. Selecione a tabela `purchase_logs`
3. Você verá todos os logs de compras em tempo real

## 🔧 Configuração Já Feita

- ✅ Cliente Supabase configurado
- ✅ Integração no carrinho/contexto
- ✅ Dashboard atualizado para buscar da nuvem
- ✅ Fallback para localStorage
- ✅ Schema SQL pronto

## 📱 Benefícios

- **Acesso de qualquer lugar**: Visualize logs de qualquer dispositivo
- **Dados persistentes**: Não perca informações ao limpar cache
- **Tempo real**: Atualizações instantâneas
- **Backup automático**: Dados seguros na nuvem
- **Escalável**: Suporta milhares de transações

## 🚨 Importante

Execute o SQL no Supabase ANTES de testar as compras para garantir que a tabela exista!
