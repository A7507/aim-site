# 🚀 Configuração de Environment Variables no Vercel

## 📋 Variáveis Necessárias

Copie e cole estas variáveis no painel do Vercel:

### 1. Vá para o Dashboard do Vercel
- Acesse seu projeto no Vercel
- Clique em **Settings** → **Environment Variables**

### 2. Adicione as seguintes variáveis:

```
NEXT_PUBLIC_SUPABASE_URL
Valor: https://yaqjetrnyvdmondsynokd.supabase.co

NEXT_PUBLIC_SUPABASE_ANON_KEY
Valor: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlhZ2pldHJueXZkbW9uZHN5bm9rZCIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNzIwNjQ3NDc4LCJleHAiOjE3NTEyNzY2Nzh9.V10-FQ_eDbyT3WPG
```

### 3. Configuração Adicional (Opcional)

```
SUPABASE_SERVICE_ROLE_KEY
Valor: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlhZ2pldHJueXZkbW9uZHN5bm9rZCIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNzIwNjQ3NDc4LCJleHAiOjE3NTEyNzY2Nzh9.V10-FQ_eDbyT3WPG
```

## 🔧 Passo a Passo no Vercel

### 1. No Dashboard do Vercel:
- Selecione seu projeto
- Vá para **Settings** tab
- Clique em **Environment Variables** no menu lateral

### 2. Para cada variável:
- **Name**: `NEXT_PUBLIC_SUPABASE_URL`
- **Value**: `https://yaqjetrnyvdmondsynokd.supabase.co`
- Clique em **Save**

- **Name**: `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- **Value**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlhZ2pldHJueXZkbW9uZHN5bm9rZCIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNzIwNjQ3NDc4LCJleHAiOjE3NTEyNzY2Nzh9.V10-FQ_eDbyT3WPG`
- Clique em **Save**

### 3. Redeploy:
- Após adicionar as variáveis, vá para **Deployments**
- Clique em **Redeploy** ou aguarde o próximo deploy automático

## ✅ Verificação

Após o deploy, verifique se está funcionando:

1. **Acesse seu site no Vercel**
2. **Faça uma compra de teste**
3. **Acesse /admin** para ver os logs
4. **Verifique o console** para mensagens de sucesso

## 🚨 Importante

- ✅ Use `NEXT_PUBLIC_` prefixo para variáveis públicas
- ✅ As variáveis ficam visíveis no frontend (não coloque secrets)
- ✅ Redeploy após adicionar variáveis
- ✅ Teste em ambiente de produção

## 🌱 Ambiente Local

Para desenvolvimento local, o arquivo `.env.local` já está configurado com:
- Mesmas variáveis do Vercel
- Funciona offline com fallback
- Sincronização automática quando online

## 🎯 Resultado

Com estas variáveis configuradas:
- ✅ **Produção**: Dados salvos no Supabase
- ✅ **Cross-device**: Funciona em qualquer dispositivo
- ✅ **Real-time**: Logs atualizados instantaneamente
- ✅ **Backup**: localStorage + Supabase

**Pronto para produção! 🚀**
