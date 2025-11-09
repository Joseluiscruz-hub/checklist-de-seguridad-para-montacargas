# 🚀 Guía de Despliegue en GitHub Pages

Esta guía te ayudará a desplegar tu aplicación en GitHub Pages paso a paso.

## 📋 Prerrequisitos

- [x] Tener una cuenta de GitHub
- [x] Git instalado en tu computadora
- [x] La aplicación funcionando localmente

## 🎯 Pasos para el Despliegue

### 1️⃣ Crear un Repositorio en GitHub

1. Ve a [GitHub](https://github.com) e inicia sesión
2. Click en el botón **"+"** en la esquina superior derecha
3. Selecciona **"New repository"**
4. Configura tu repositorio:
   - **Repository name:** `checklist-de-seguridad-para-montacargas`
   - **Description:** `Sistema de Inspección de Seguridad para Montacargas - Coca-Cola FEMSA`
   - **Visibility:** Public (o Private si prefieres)
   - **NO** marques "Initialize this repository with a README"
5. Click en **"Create repository"**

### 2️⃣ Inicializar Git Localmente

Abre tu terminal en la carpeta del proyecto y ejecuta:

```bash
# Inicializar el repositorio
git init

# Configurar tu información (si no lo has hecho antes)
git config user.name "Tu Nombre"
git config user.email "tu-email@ejemplo.com"

# Añadir todos los archivos
git add .

# Crear el primer commit
git commit -m "Initial commit - Checklist de Seguridad para Montacargas"
```

### 3️⃣ Conectar con GitHub

Reemplaza `TU-USUARIO` con tu nombre de usuario de GitHub:

```bash
# Añadir el repositorio remoto
git remote add origin https://github.com/TU-USUARIO/checklist-de-seguridad-para-montacargas.git

# Cambiar a la rama main (si estás en master)
git branch -M main

# Subir los archivos
git push -u origin main
```

**Nota:** Si GitHub te pide autenticación, puedes usar:
- **Personal Access Token (recomendado)**
- SSH Keys
- GitHub CLI

### 4️⃣ Habilitar GitHub Pages

1. Ve a tu repositorio en GitHub
2. Click en **"Settings"** (Configuración)
3. En el menú lateral izquierdo, click en **"Pages"**
4. En **"Source"**, selecciona **"GitHub Actions"**
5. ¡Listo! No necesitas configurar nada más

### 5️⃣ Esperar el Despliegue Automático

1. Ve a la pestaña **"Actions"** en tu repositorio
2. Verás un workflow ejecutándose llamado **"Deploy to GitHub Pages"**
3. Espera a que termine (toma 2-5 minutos)
4. Cuando veas un ✅ verde, ¡tu app está desplegada!

### 6️⃣ Acceder a tu Aplicación

Tu aplicación estará disponible en:

```
https://TU-USUARIO.github.io/checklist-de-seguridad-para-montacargas/
```

Reemplaza `TU-USUARIO` con tu nombre de usuario de GitHub.

---

## 🔄 Actualizar la Aplicación

Cada vez que quieras actualizar tu app desplegada:

```bash
# 1. Hacer cambios en tu código local

# 2. Guardar los cambios
git add .
git commit -m "Descripción de tus cambios"

# 3. Subir a GitHub
git push origin main

# 4. GitHub Actions desplegará automáticamente
```

---

## 🛠️ Configuración Avanzada

### Personalizar el Dominio

Si tienes un dominio personalizado:

1. Ve a Settings → Pages
2. En "Custom domain", ingresa tu dominio
3. Configura los DNS records según las instrucciones de GitHub

### Ajustar Base URL

Si cambias el nombre del repositorio, actualiza `angular.json`:

```json
"production": {
  "outputHashing": "all",
  "baseHref": "/NUEVO-NOMBRE-REPO/"
}
```

---

## 🔍 Solución de Problemas

### ❌ El workflow falla

**Problema:** Error en GitHub Actions

**Solución:**
1. Ve a Actions → Click en el workflow fallido
2. Revisa los logs para ver el error
3. Errores comunes:
   - Dependencias faltantes → `npm ci` debería instalarlas
   - Error de compilación → Revisa que `npm run build` funcione localmente
   - Permisos → Verifica que el workflow tenga permisos de Pages

### ❌ La página muestra 404

**Problema:** GitHub Pages no encuentra los archivos

**Solución:**
1. Verifica que el workflow se ejecutó exitosamente
2. Asegúrate de haber habilitado GitHub Pages con "Source: GitHub Actions"
3. Espera 5-10 minutos adicionales (a veces tarda en propagarse)

### ❌ Los recursos no cargan (404 en JS/CSS)

**Problema:** Base URL incorrecta

**Solución:**
1. Verifica que `baseHref` en `angular.json` coincida con el nombre de tu repositorio
2. Debe terminar en `/`: `/checklist-de-seguridad-para-montacargas/`
3. Rebuild y push nuevamente

### ❌ Error de autenticación con Git

**Problema:** Git no acepta tu contraseña

**Solución:**
1. GitHub ya NO acepta contraseñas para git
2. Usa un **Personal Access Token**:
   - Ve a Settings → Developer settings → Personal access tokens → Tokens (classic)
   - Generate new token
   - Marca "repo" scope
   - Copia el token y úsalo como contraseña

---

## 📱 Probar Localmente la Build de Producción

Antes de desplegar, prueba localmente:

```bash
# Compilar para producción
npm run build:prod

# Ver los archivos compilados
cd dist
# Abre index.html en un servidor local
```

Puedes usar cualquier servidor HTTP simple:

```bash
# Con Python
python -m http.server 8080

# Con Node.js (si tienes http-server)
npx http-server dist -p 8080
```

---

## 🔐 Configuración de Seguridad

### Para Repositorios Privados

Si tu repositorio es privado:

1. Ve a Settings → Actions → General
2. En "Workflow permissions", selecciona:
   - **Read and write permissions**
3. Marca **Allow GitHub Actions to create and approve pull requests**
4. Save

### Variables de Entorno

Si necesitas variables de entorno en producción:

1. Ve a Settings → Secrets and variables → Actions
2. Click en "New repository secret"
3. Añade tus secretos (ej: API keys)
4. Úsalos en el workflow con `${{ secrets.NOMBRE_SECRETO }}`

---

## 📊 Monitoreo

### Ver Estadísticas de Despliegue

- **Actions tab:** Ver todos los despliegues
- **Pages settings:** Ver URL y estado
- **Insights → Traffic:** Ver visitantes (si es público)

### Logs de Build

Cada despliegue genera logs detallados:
1. Ve a Actions
2. Click en el workflow
3. Expande cada step para ver logs

---

## 🎉 ¡Listo!

Tu aplicación ahora está:
- ✅ Desplegada en GitHub Pages
- ✅ Disponible públicamente (o privada si elegiste private)
- ✅ Con despliegue automático cada vez que hagas push
- ✅ Con SSL/HTTPS automático de GitHub

**URL de tu app:** `https://TU-USUARIO.github.io/checklist-de-seguridad-para-montacargas/`

---

## 📚 Recursos Adicionales

- [Documentación de GitHub Pages](https://docs.github.com/es/pages)
- [Documentación de GitHub Actions](https://docs.github.com/es/actions)
- [Angular Deployment Guide](https://angular.io/guide/deployment)

---

## 💡 Tips

1. **Prueba localmente primero:** Siempre ejecuta `npm run build:prod` antes de hacer push
2. **Commits descriptivos:** Usa mensajes claros para identificar cambios
3. **Branch protegida:** Considera proteger la rama `main` para evitar push accidentales
4. **Automatic deploys:** GitHub Actions despliega automáticamente, no necesitas hacer nada manual

---

**¿Necesitas ayuda?** Abre un issue en el repositorio o consulta la documentación de GitHub.

