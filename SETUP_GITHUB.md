# Como criar o repositório no GitHub

## Opção 1: Via Interface Web (Recomendado)

1. Acesse [GitHub.com](https://github.com) e faça login
2. Clique no botão **"+"** no canto superior direito e selecione **"New repository"**
3. Preencha:
   - **Repository name**: `curriculo` (ou o nome que preferir)
   - **Description**: "Site de currículo moderno e responsivo"
   - **Visibility**: Escolha Public ou Private
   - **NÃO** marque "Initialize this repository with a README" (já temos um)
4. Clique em **"Create repository"**

5. Depois, execute os seguintes comandos no terminal:

```bash
cd /Users/dede/Documents/projetos/curriculo
git remote add origin https://github.com/SEU_USUARIO/curriculo.git
git branch -M main
git push -u origin main
```

**Substitua `SEU_USUARIO` pelo seu nome de usuário do GitHub!**

## Opção 2: Via GitHub CLI (se tiver instalado)

Se você instalar o GitHub CLI (`gh`), pode executar:

```bash
gh repo create curriculo --public --source=. --remote=origin --push
```

## Verificar se está tudo certo

Após o push, você pode verificar com:

```bash
git remote -v
git status
```

