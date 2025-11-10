#!/bin/bash

# Script de Despliegue Automático para GitHub Pages
# Checklist de Seguridad para Montacargas - Coca-Cola FEMSA

echo "🚀 Iniciando despliegue en GitHub Pages..."
echo ""

# Colores para output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Verificar que estamos en un repositorio git
if [ ! -d .git ]; then
    echo -e "${RED}❌ Error: No estás en un repositorio Git${NC}"
    echo "Ejecuta primero: git init"
    exit 1
fi

# Verificar cambios pendientes
if [ -n "$(git status --porcelain)" ]; then
    echo -e "${YELLOW}📝 Hay cambios pendientes para commit${NC}"
    echo ""

    # Preguntar si quiere hacer commit
    read -p "¿Quieres hacer commit de los cambios? (s/n): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Ss]$ ]]; then
        echo -e "${BLUE}📝 Añadiendo archivos...${NC}"
        git add .

        read -p "Mensaje del commit: " commit_message
        git commit -m "$commit_message"

        echo -e "${GREEN}✅ Commit creado${NC}"
    else
        echo -e "${YELLOW}⚠️  Cambios no comiteados. Abortando despliegue.${NC}"
        exit 1
    fi
fi

# Verificar que existe un remote
if ! git remote | grep -q 'origin'; then
    echo -e "${RED}❌ No hay remote 'origin' configurado${NC}"
    echo ""
    read -p "Ingresa la URL de tu repositorio GitHub: " repo_url
    git remote add origin "$repo_url"
    echo -e "${GREEN}✅ Remote 'origin' añadido${NC}"
fi

# Obtener la rama actual
current_branch=$(git branch --show-current)

# Cambiar a main si está en master
if [ "$current_branch" = "master" ]; then
    echo -e "${BLUE}🔄 Cambiando de master a main...${NC}"
    git branch -M main
    current_branch="main"
fi

# Push al repositorio
echo -e "${BLUE}⬆️  Subiendo cambios a GitHub...${NC}"
if git push -u origin "$current_branch"; then
    echo -e "${GREEN}✅ Cambios subidos exitosamente${NC}"
    echo ""
    echo -e "${GREEN}🎉 ¡Despliegue iniciado!${NC}"
    echo ""
    echo "GitHub Actions compilará y desplegará tu aplicación automáticamente."
    echo ""
    echo -e "📊 Ver progreso: ${BLUE}https://github.com/$(git config remote.origin.url | sed 's/.*:\(.*\)\.git/\1/')/actions${NC}"
    echo ""

    # Extraer usuario y repo
    repo_info=$(git config remote.origin.url | sed 's/.*:\(.*\)\.git/\1/' | sed 's/.*\/\(.*\)\/\(.*\)/\1\/\2/')
    echo -e "🌐 Tu app estará en: ${GREEN}https://$(echo $repo_info | cut -d'/' -f1).github.io/$(echo $repo_info | cut -d'/' -f2)/${NC}"
    echo ""
    echo "⏱️  El despliegue toma aproximadamente 2-5 minutos."
else
    echo -e "${RED}❌ Error al subir cambios${NC}"
    echo "Verifica tu conexión y credenciales de GitHub"
    exit 1
fi

