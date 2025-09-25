# Instruções de Deploy - Redação Smart

## 🚀 Deploy no Vercel

### 1. Preparação
- ✅ Build realizado com sucesso
- ✅ Componentes corrigidos (PrivacyPolicy e TermsOfService)
- ✅ Configuração do Vercel (vercel.json) pronta
- ✅ Variáveis de ambiente configuradas

### 2. Deploy via Vercel CLI
```bash
# Instalar Vercel CLI (se não tiver)
npm i -g vercel

# Fazer login no Vercel
vercel login

# Deploy do projeto
vercel --prod
```

### 3. Deploy via GitHub (Recomendado)
1. Fazer commit das mudanças:
```bash
git add .
git commit -m "Preparação para produção - componentes corrigidos"
git push origin main
```

2. No Vercel Dashboard:
   - Conectar repositório GitHub
   - Configurar variáveis de ambiente
   - Deploy automático

### 4. Variáveis de Ambiente no Vercel
Configurar no painel do Vercel:
```
VITE_BACKEND_URL=https://backend-smart-ys4l.onrender.com
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_51QRFxIJMbU7uvnrj4ntXZiEp8QN9o7TlONkhwR142XW5sdbUw6oPiDngmRlA0KAxyjawA3SXNRwJBLOz0ndDroin00P24GLQeB
VITE_FIREBASE_API_KEY=AIzaSyAcXPZUBkrt2gDizqdsPop0jC04fN7h2w4
VITE_FIREBASE_AUTH_DOMAIN=redacaosmrt.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=redacaosmrt
VITE_FIREBASE_STORAGE_BUCKET=redacaosmrt.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012
VITE_FIREBASE_APP_ID=1:123456789012:web:abcdefghijklmnop
```

### 5. Verificações Pós-Deploy
- [ ] Página inicial carrega
- [ ] Login/Cadastro funcionam
- [ ] Página de planos carrega
- [ ] Página de privacidade carrega (/privacidade)
- [ ] Página de termos carrega (/termos)
- [ ] Páginas de sucesso/cancelamento funcionam
- [ ] Integração com Stripe funciona

### 6. URLs Importantes
- **Frontend:** https://redacaosmart-nz4uzaz7m-rafaelshonos-projects.vercel.app
- **Backend:** https://backend-smart-ys4l.onrender.com
- **Privacidade:** https://redacaosmart-nz4uzaz7m-rafaelshonos-projects.vercel.app/privacidade
- **Termos:** https://redacaosmart-nz4uzaz7m-rafaelshonos-projects.vercel.app/termos

### 7. Configuração do Webhook Stripe
No painel do Stripe, configurar webhook para:
```
URL: https://backend-smart-ys4l.onrender.com/webhook
Eventos: checkout.session.completed
```

## ✅ Status: Pronto para Deploy
Todos os componentes foram corrigidos e o build está funcionando perfeitamente!
