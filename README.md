# Site de Currículo

Um site de currículo moderno, responsivo e elegante criado com HTML, CSS e JavaScript.

## 🚀 Características

- ✨ Design moderno e profissional
- 📱 Totalmente responsivo (mobile, tablet, desktop)
- 🎨 Interface limpa e intuitiva
- ⚡ Animações suaves
- 🌈 Gradientes e cores modernas
- 📧 Links de contato funcionais

## 📋 Estrutura

- `index.html` - Estrutura principal do site
- `styles.css` - Estilos e design responsivo
- `script.js` - Interatividade e animações

## 🛠️ Como Usar

1. Abra o arquivo `index.html` no seu navegador
2. Personalize as informações substituindo os placeholders:
   - `[Seu Nome]` - Seu nome completo
   - `[Seu Cargo/Profissão]` - Seu cargo atual ou profissão
   - `[Sua Cidade, Estado]` - Sua localização
   - `seuemail@exemplo.com` - Seu email
   - `(11) 99999-9999` - Seu telefone
   - Links do LinkedIn e GitHub
   - Experiências profissionais
   - Educação
   - Habilidades
   - Idiomas

3. Para adicionar sua foto de perfil:
   - Substitua o `<div class="image-placeholder">` por uma tag `<img>`:
   ```html
   <img src="sua-foto.jpg" alt="Seu Nome" class="profile-photo">
   ```
   - E adicione no CSS:
   ```css
   .profile-photo {
       width: 120px;
       height: 120px;
       border-radius: 50%;
       object-fit: cover;
       border: 4px solid rgba(255, 255, 255, 0.3);
   }
   ```

## 🎨 Personalização

### Cores

As cores principais podem ser alteradas no arquivo `styles.css` através das variáveis CSS:

```css
:root {
    --primary-color: #2563eb;    /* Cor principal */
    --primary-dark: #1e40af;     /* Cor principal escura */
    --secondary-color: #64748b;  /* Cor secundária */
    /* ... */
}
```

### Fontes

A fonte utilizada é a Inter do Google Fonts. Para alterar, modifique o link no `<head>` do HTML e a propriedade `font-family` no CSS.

## 📱 Responsividade

O site é totalmente responsivo e se adapta a:
- Dispositivos móveis (< 480px)
- Tablets (480px - 768px)
- Desktops (> 768px)

## 🌐 Deploy

Você pode fazer deploy deste site em:
- GitHub Pages
- Netlify
- Vercel
- Qualquer serviço de hospedagem estática

## 📝 Licença

Este projeto é de uso livre. Sinta-se à vontade para personalizar e usar como quiser!

