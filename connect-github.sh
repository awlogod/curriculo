#!/bin/bash

# Script para conectar o repositório local ao GitHub
# Uso: ./connect-github.sh SEU_USUARIO_GITHUB

if [ -z "$1" ]; then
    echo "❌ Erro: Você precisa fornecer seu nome de usuário do GitHub"
    echo "Uso: ./connect-github.sh SEU_USUARIO_GITHUB"
    echo ""
    echo "Exemplo: ./connect-github.sh dede"
    exit 1
fi

GITHUB_USER=$1
REPO_NAME="curriculo"

echo "🔗 Conectando ao repositório GitHub..."
echo ""

# Adicionar remote
git remote add origin https://github.com/$GITHUB_USER/$REPO_NAME.git 2>/dev/null

if [ $? -eq 0 ]; then
    echo "✅ Remote 'origin' adicionado com sucesso!"
elif [ $? -eq 128 ]; then
    echo "⚠️  Remote 'origin' já existe. Atualizando..."
    git remote set-url origin https://github.com/$GITHUB_USER/$REPO_NAME.git
    echo "✅ Remote 'origin' atualizado!"
else
    echo "❌ Erro ao adicionar remote"
    exit 1
fi

echo ""
echo "📤 Fazendo push para o GitHub..."
echo ""
git push -u origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "🎉 Sucesso! Seu repositório está no GitHub:"
    echo "   https://github.com/$GITHUB_USER/$REPO_NAME"
    echo ""
    echo "💡 Para habilitar GitHub Pages (site público):"
    echo "   1. Vá em Settings > Pages"
    echo "   2. Selecione 'main' como branch"
    echo "   3. Selecione '/ (root)' como folder"
    echo "   4. Salve e aguarde alguns minutos"
    echo "   5. Seu site estará em: https://$GITHUB_USER.github.io/$REPO_NAME"
else
    echo ""
    echo "❌ Erro ao fazer push. Verifique:"
    echo "   1. Se o repositório foi criado no GitHub"
    echo "   2. Se você tem permissões de escrita"
    echo "   3. Se suas credenciais estão configuradas"
    exit 1
fi

