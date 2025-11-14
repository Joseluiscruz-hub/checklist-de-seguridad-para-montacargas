# Auditoría rápida de UI / UX - Checklist

Objetivo: usar esta lista para revisar pantallas clave y aplicar mejoras visuales y de usabilidad.

## 1. Estructura y Flujo
- [ ] **Claridad del flujo principal:** ¿Es intuitivo el camino desde el inicio hasta completar la tarea (ej. checklist)?
- [ ] **Navegación predecible:** ¿Son claros los botones, menús y enlaces? ¿El usuario sabe siempre dónde está?
- [ ] **Indicadores de progreso:** En flujos largos (como un checklist), ¿se muestra el progreso (ej. barra, pasos)?
- [ ] **Jerarquía visual:** ¿Está claro qué es lo más importante en cada pantalla? ¿Los títulos y botones destacan?

## 2. Consistencia Visual y Sistema de Diseño
- [ ] **Uso de tokens de diseño:** ¿Se usan variables para colores, tipografías y espaciados de forma consistente?
- [ ] **Componentes reutilizables:** ¿Los botones, tarjetas y campos de formulario son consistentes en toda la app?
- [ ] **Iconografía coherente:** ¿Se usa un único set de iconos con un estilo consistente?
- [ ] **Estilos de estado:** ¿Los estados (hover, focus, active, disabled) son visualmente claros en elementos interactivos?

## 3. Tipografía y Legibilidad
- [ ] **Tamaño de fuente adecuado:** ¿El texto del cuerpo es legible (mínimo 16px en móviles)?
- [ ] **Contraste de color:** ¿El contraste entre texto y fondo cumple las directrices de accesibilidad (AA, >=4.5:1)?
- [ ] **Jerarquía tipográfica:** ¿Se usan diferentes tamaños y pesos de fuente para diferenciar títulos, subtítulos y cuerpo?
- [ ] **Espaciado y interlineado:** ¿Hay suficiente espacio entre líneas y párrafos para facilitar la lectura?

## 4. Formularios y Entradas
- [ ] **Etiquetas claras:** ¿Todos los campos de formulario tienen etiquetas visibles y descriptivas?
- [ ] **Controles táctiles adecuados:** ¿Son los botones, checkboxes y otros controles lo suficientemente grandes para ser usados en pantallas táctiles (mín. 44x44px)?
- [ ] **Validación en tiempo real:** ¿Se informa al usuario de errores de validación al momento y de forma clara?
- [ ] **Feedback de acciones:** ¿Se confirma al usuario cuando una acción (guardar, enviar) ha sido exitosa o ha fallado?

## 5. Accesibilidad (a11y)
- [ ] **Navegación por teclado:** ¿Se puede navegar y operar toda la interfaz usando solo el teclado?
- [ ] **Foco visible:** ¿Es claro qué elemento tiene el foco del teclado en todo momento?
- [ ] **Texto alternativo en imágenes:** ¿Las imágenes informativas tienen un atributo `alt` descriptivo?
- [ ] **Uso de ARIA:** ¿Se usan roles y atributos ARIA donde los elementos HTML nativos no son suficientes?

## 6. Diseño Adaptable (Responsive)
- [ ] **Mobile-first:** ¿La experiencia está optimizada para pantallas pequeñas primero?
- [ ] **Puntos de ruptura (breakpoints):** ¿La interfaz se adapta correctamente a diferentes tamaños de pantalla (móvil, tablet, escritorio)?
- [ ] **Legibilidad en móviles:** ¿El contenido se reajusta para evitar el scroll horizontal?

## 7. Rendimiento
- [ ] **Tiempos de carga inicial:** ¿La aplicación carga rápidamente?
- [ ] **Optimización de imágenes:** ¿Las imágenes están comprimidas y en formatos modernos (ej. WebP)?
- [ ] **Feedback de carga:** ¿Se muestran indicadores (spinners, skeletons) cuando los datos están cargando?
