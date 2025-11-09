# 📋 Checklist de Seguridad para Montacargas

<div align="center">
  <h3>Sistema de Inspección de Seguridad para Coca-Cola FEMSA</h3>
  <p>Aplicación web progresiva para la gestión de inspecciones diarias de montacargas</p>
  
  [![Angular](https://img.shields.io/badge/Angular-20.3-DD0031?style=for-the-badge&logo=angular&logoColor=white)](https://angular.io/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
</div>

---

## 🌟 Características

- ✅ **Gestión Completa de Inspecciones** - 23 puntos de verificación organizados por categorías
- 📱 **Diseño Responsivo** - Funciona en móviles, tablets y desktop
- 🌙 **Modo Oscuro** - Tema claro y oscuro con persistencia
- 💾 **Almacenamiento Offline** - IndexedDB para funcionamiento sin conexión
- 📸 **Captura de Evidencias** - Fotos y comentarios para cada incidencia
- ✍️ **Firma Digital** - Firma electrónica del inspector
- 📊 **Estadísticas Visuales** - Gráficos con Chart.js
- 🖨️ **Reportes Imprimibles** - Generación de PDFs profesionales
- 📱 **Escáner QR** - Identificación rápida de montacargas
- 🚨 **Reporte de Incidencias** - Sistema dedicado para problemas graves

## 🚀 Demo en Vivo

🔗 **[Ver Aplicación](https://[TU-USUARIO].github.io/checklist-de-seguridad-para-montacargas/)**

## 📦 Instalación Local

### Prerrequisitos
- Node.js 20+ 
- npm 10+

### Pasos

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/[TU-USUARIO]/checklist-de-seguridad-para-montacargas.git
   cd checklist-de-seguridad-para-montacargas
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Ejecutar en desarrollo:**
   ```bash
   npm run dev
   ```

4. **Abrir en el navegador:**
   ```
   http://localhost:3000
   ```

## 🏗️ Compilar para Producción

```bash
npm run build
```

Los archivos compilados estarán en la carpeta `dist/`.

## 🌐 Despliegue en GitHub Pages

El despliegue es automático mediante GitHub Actions:

1. **Push a la rama principal:**
   ```bash
   git add .
   git commit -m "Deploy to GitHub Pages"
   git push origin main
   ```

2. **GitHub Actions se encargará del resto**
   - Compila la aplicación automáticamente
   - Despliega a GitHub Pages
   - Tu app estará disponible en: `https://[TU-USUARIO].github.io/checklist-de-seguridad-para-montacargas/`

3. **Habilitar GitHub Pages (solo la primera vez):**
   - Ve a Settings → Pages
   - Source: GitHub Actions
   - ¡Listo!

## 📱 Uso de la Aplicación

### 1. Iniciar Sesión de Inspección
- Click en "INICIAR NUEVO CHECKLIST"
- Completa: Inspector, Tripulación, Turno, Ubicación

### 2. Seleccionar Montacargas
- Busca manualmente o usa el escáner QR
- Click en "Verificar"

### 3. Completar Checklist
- Marca cada punto como "Cumple" o "No Cumple"
- Añade comentarios y fotos para incidencias
- Firma digitalmente

### 4. Guardar
- Click en "Guardar Sesión"
- Los datos se almacenan localmente

### 5. Consultar
- **Historial:** Ver todas las inspecciones
- **Estadísticas:** Análisis visual con gráficos
- **Reportes:** Generar documentos imprimibles

## 🛠️ Tecnologías

| Tecnología | Propósito |
|------------|-----------|
| Angular 20.3 | Framework principal |
| TypeScript 5.8 | Lenguaje de programación |
| Tailwind CSS | Estilos y diseño |
| IndexedDB | Base de datos local |
| Chart.js | Gráficos y estadísticas |
| Signature Pad | Firma digital |
| html5-qrcode | Escáner de códigos QR |
| Font Awesome | Iconografía |

## 📂 Estructura del Proyecto

```
src/
├── app.component.ts/html       # Componente raíz
├── app.routes.ts               # Configuración de rutas
├── components/                 # Componentes reutilizables
│   ├── checklist-modal/
│   ├── incident-report-modal/
│   ├── manuals-modal/
│   └── qr-scanner/
├── pages/                      # Páginas principales
│   ├── checklist/
│   ├── history/
│   ├── stats/
│   └── settings/
├── services/                   # Servicios
│   ├── db.service.ts
│   └── theme.service.ts
├── models/                     # Interfaces TypeScript
└── data/                       # Datos mock
```

## 🎨 Configuración

### Montacargas
Edita `src/data/mock.data.ts` para añadir/modificar montacargas:

```typescript
export const FORKLIFTS: Forklift[] = [
  { id: 'CUA-25097', name: 'ECO CUA-25097', model: 'General' },
  // Añade más aquí...
];
```

### Tripulaciones
```typescript
export const CREWS = [
  { name: 'CRACK\'S', color: '#f472b6' },
  // Personaliza colores y nombres...
];
```

### Checklist
Modifica los puntos de verificación en `CHECKLIST_TEMPLATE`.

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto es propiedad de **Coca-Cola FEMSA**.
© 2025 - Todos los derechos reservados.

## 📧 Contacto

Para soporte o consultas sobre el proyecto, contacta al equipo de desarrollo.

---

**Hecho con ❤️ para Coca-Cola FEMSA**
