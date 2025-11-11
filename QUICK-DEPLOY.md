# 🚀 Guía Rápida de Despliegue

Esta guía te muestra cómo desplegar tu aplicación en GitHub Pages usando el nuevo comando `npm run deploy`.

## 📋 Requisitos Previos

- Node.js 20+ instalado
- Git configurado
- Repositorio ya creado en GitHub

## 🎯 Despliegue en 3 Pasos

### 1. Instala las nuevas dependencias

```bash
npm install
```

Este comando instalará todas las dependencias necesarias, incluyendo `gh-pages` para el despliegue.

### 2. Construye y despliega en GitHub Pages

```bash
npm run deploy
```

Este comando ejecutará un script interactivo que:

1. ✅ Verificará el estado de tu repositorio
2. 🔨 Compilará la aplicación en modo producción
3. ⚠️  **Te pedirá confirmación antes de desplegar**
4. 🚀 Desplegará a GitHub Pages si confirmas

### 3. Cuando te pida confirmación, presiona "y" (yes)

El script mostrará un mensaje similar a este:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⚠️  Estás a punto de desplegar a GitHub Pages
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Esto publicará tu aplicación en:
https://joseluiscruz-hub.github.io/checklist-de-seguridad-para-montacargas/

¿Deseas continuar con el despliegue? (s/n):
```

**Escribe `y` o `s` y presiona Enter** para confirmar el despliegue.

---

## ✨ ¡Listo!

Después de confirmar, el script:

1. 📤 Desplegará tu aplicación a la rama `gh-pages`
2. 🌐 Tu app estará disponible en:
   ```
   https://joseluiscruz-hub.github.io/checklist-de-seguridad-para-montacargas/
   ```
3. ⏱️  Los cambios serán visibles en 1-2 minutos

---

## 🔧 Funcionalidades Adicionales

### Commitear cambios antes de desplegar

Si tienes cambios sin commitear, el script te preguntará:

```
¿Deseas commitear los cambios antes de desplegar? (s/n):
```

- Presiona `s` para commitear los cambios automáticamente
- Presiona `n` para continuar sin commitear

### Cancelar el despliegue

Si cambias de opinión, presiona `n` cuando el script pida confirmación y el despliegue será cancelado sin hacer cambios.

---

## 📊 ¿Qué hace el comando `npm run deploy`?

1. **Verifica el repositorio** - Comprueba que estés en un repositorio Git válido
2. **Revisa cambios pendientes** - Te permite commitear si hay cambios sin guardar
3. **Compila para producción** - Ejecuta `npm run build:prod` con optimizaciones
4. **Solicita confirmación** - Te pide autorización antes de publicar
5. **Despliega a gh-pages** - Usa `gh-pages` para subir los archivos a la rama `gh-pages`

---

## ❓ Preguntas Frecuentes

### ¿Qué es la rama gh-pages?

Es una rama especial que GitHub usa para alojar sitios estáticos. No necesitas crearla manualmente, el script la crea automáticamente.

### ¿Puedo desplegar sin confirmación?

No, por seguridad el script siempre pedirá confirmación antes de desplegar.

### ¿Cómo actualizo mi aplicación desplegada?

Simplemente ejecuta `npm run deploy` nuevamente. El script actualizará la aplicación automáticamente.

### ¿Necesito configurar GitHub Pages manualmente?

Solo la primera vez:
1. Ve a Settings → Pages en tu repositorio
2. Selecciona Source: **Deploy from a branch**
3. Selecciona la rama: **gh-pages**
4. Click en Save

### ¿Qué pasa si el despliegue falla?

El script mostrará el error específico. Errores comunes:
- No tienes permisos de escritura en el repositorio
- No estás autenticado con GitHub
- La rama gh-pages está protegida

---

## 🔗 Recursos Adicionales

- [Documentación completa de despliegue](DEPLOY.md)
- [Documentación de gh-pages](https://www.npmjs.com/package/gh-pages)
- [GitHub Pages Docs](https://docs.github.com/es/pages)

---

**¿Necesitas ayuda?** Abre un issue en el repositorio o contacta al equipo de desarrollo.
