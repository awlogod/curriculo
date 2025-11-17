# 🚀 Como Publicar Seu Site de Currículo

## Opção 1: GitHub Pages (Gratuito e Fácil) ⭐ RECOMENDADO

### Passo a Passo:

1. **Acesse seu repositório no GitHub:**
   - Vá para: https://github.com/awlogod/curriculo

2. **Configure o GitHub Pages:**
   - Clique na aba **"Settings"** (Configurações) no topo do repositório
   - No menu lateral esquerdo, clique em **"Pages"**
   - Em **"Source"**, selecione:
     - **Branch:** `main`
     - **Folder:** `/ (root)`
   - Clique em **"Save"** (Salvar)

3. **Aguarde alguns minutos:**
   - O GitHub vai processar seu site
   - Você verá uma mensagem verde indicando que está publicado

4. **Acesse seu site:**
   - Seu site estará disponível em: **https://awlogod.github.io/curriculo**
   - Pode levar de 1 a 10 minutos para ficar no ar

### ✅ Vantagens:
- ✅ Totalmente gratuito
- ✅ HTTPS automático
- ✅ Atualiza automaticamente quando você faz push
- ✅ Sem necessidade de configuração adicional

---

## Opção 2: Netlify (Super Rápido) 🚀

### Passo a Passo:

1. **Acesse:** https://www.netlify.com
2. **Faça login** com sua conta GitHub
3. **Clique em "Add new site" > "Import an existing project"**
4. **Selecione seu repositório:** `awlogod/curriculo`
5. **Configure:**
   - Build command: (deixe vazio)
   - Publish directory: (deixe vazio ou coloque `/`)
6. **Clique em "Deploy site"**
7. **Pronto!** Seu site estará no ar em segundos

### ✅ Vantagens:
- ✅ Deploy instantâneo
- ✅ URL personalizada (ex: `seu-nome.netlify.app`)
- ✅ HTTPS automático
- ✅ Atualiza automaticamente

---

## Opção 3: Vercel (Para Desenvolvedores) ⚡

### Passo a Passo:

1. **Acesse:** https://vercel.com
2. **Faça login** com sua conta GitHub
3. **Clique em "Add New Project"**
4. **Importe seu repositório:** `awlogod/curriculo`
5. **Configure:**
   - Framework Preset: Other
   - Build Command: (deixe vazio)
   - Output Directory: (deixe vazio)
6. **Clique em "Deploy"**
7. **Pronto!** Site no ar em segundos

### ✅ Vantagens:
- ✅ Deploy super rápido
- ✅ URL personalizada
- ✅ HTTPS automático
- ✅ Performance otimizada

---

## Opção 4: Domínio Personalizado (Opcional)

Se quiser usar um domínio próprio (ex: `www.andrewilckay.com`):

1. **Compre um domínio** em sites como:
   - Registro.br (para .br)
   - Namecheap, GoDaddy, etc.

2. **Configure no GitHub Pages:**
   - Settings > Pages > Custom domain
   - Adicione seu domínio
   - Siga as instruções de DNS

3. **Ou configure no Netlify/Vercel:**
   - Ambos têm suporte fácil para domínios personalizados

---

## 📝 Qual Escolher?

- **GitHub Pages:** Se você já usa GitHub e quer simplicidade
- **Netlify:** Se quer deploy mais rápido e interface amigável
- **Vercel:** Se você é desenvolvedor e quer performance máxima

**Recomendação:** Comece com **GitHub Pages** (já está tudo no GitHub!) e depois experimente outras opções se quiser.

---

## 🔄 Atualizar o Site

Depois de publicar, sempre que você fizer alterações:

```bash
git add .
git commit -m "Atualizar currículo"
git push origin main
```

O site será atualizado automaticamente em alguns minutos (GitHub Pages) ou segundos (Netlify/Vercel).

