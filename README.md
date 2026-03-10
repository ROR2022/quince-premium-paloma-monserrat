# 🎀 Giselle Premium - Quinceañera Invitation Template

## ✨ Tema Coquette Implementado

Una elegante plantilla de invitación para quinceañera con un refinado tema **coquette** que combina tonos rosados suaves, rosa intenso y plateado para crear una experiencia visual sofisticada y femenina.

---

## 🎨 Características del Tema Coquette

### Paleta de Colores
- **Rosa Claro** (#FFD1DC) - Color primario suave y elegante
- **Rosa Intenso** (#FF69B4) - Color de acento vibrante
- **Plateado** (#C0C0C0) - Neutro elegante y refinado
- **Blanco** (#FFFFFF) - Base limpia y pura

### Efectos Especiales
- ✨ **Animaciones coquette** - Efectos de pulse, float y glow
- 🌟 **Gradientes elegantes** - Transiciones suaves entre colores
- 💫 **Efectos hover** - Interactividad refinada
- 🎭 **Experiencia VIP** - Elementos premium exclusivos

---

## 🚀 Características Principales

### 📱 **Totalmente Responsive**
- Diseño adaptativo para móviles, tablets y desktop
- Optimizado para experiencia táctil
- Performance optimizada en todos los dispositivos

### 🎵 **Control de Música Integrado**
- Reproductor de música de fondo
- Controles elegantes con tema coquette
- Autoplay opcional y controles de volumen

### 🖼️ **Galería Premium**
- Galería de fotos interactiva
- Efectos de zoom y navegación suave
- Soporte para múltiples categorías de imágenes

### 💌 **RSVP Inteligente**
- Formulario de confirmación integrado
- Validación automática de campos
- Almacenamiento de respuestas

### 🎁 **Mesa de Regalos**
- Lista de regalos personalizable
- Links directos a tiendas
- Opciones de contribución monetaria

---

## 🛠️ Tecnologías Utilizadas

### Frontend
- **Next.js 14** - Framework React de última generación
- **TypeScript** - Tipado estático para mayor robustez
- **Tailwind CSS** - Framework de utilidades CSS
- **Framer Motion** - Animaciones fluidas y elegantes

### UI Components
- **Shadcn/ui** - Componentes de interfaz de alta calidad
- **Radix UI** - Primitivos accesibles y personalizables
- **Lucide React** - Iconografía moderna y limpia

### Optimización
- **CSS Variables** - Gestión eficiente de colores
- **Animaciones CSS** - Performance optimizada
- **Bundle Optimization** - Carga rápida y eficiente

---

## 📦 Instalación y Configuración

### Requisitos Previos
- Node.js 18+ 
- pnpm, npm o yarn
- Git

### Instalación
```bash
# Clonar repositorio
git clone [repositorio-url]
cd quince-premium-giselle

# Instalar dependencias
pnpm install

# Ejecutar en desarrollo
pnpm dev

# Build para producción
pnpm build
```

### Scripts Disponibles
```bash
pnpm dev          # Servidor de desarrollo
pnpm build        # Build de producción
pnpm start        # Servidor de producción
pnpm lint         # Verificar código
pnpm type-check   # Verificar TypeScript
```

---

## 🎨 Personalización del Tema

### Configuración de Colores
Editar `tailwind.config.ts` para personalizar la paleta:

```typescript
const coqueticolors = {
  'coquette-rosa-claro': {
    50: '#FFF8F9',
    500: '#FFD1DC',
    900: '#FF3065',
  },
  // ... más colores
}
```

### Variables CSS
Modificar en `app/globals.css`:

```css
:root {
  --coquette-rosa-claro: #FFD1DC;
  --coquette-rosa-intenso: #FF69B4;
  --coquette-plateado: #C0C0C0;
  --coquette-blanco: #FFFFFF;
}
```

---

## 📁 Estructura del Proyecto

```
├── app/                      # Páginas y layout principal
├── components/
│   ├── demo/quince/         # Componentes de la invitación
│   │   ├── BasicHero.tsx    # Hero básico
│   │   ├── PremiumHero.tsx  # Hero premium
│   │   ├── VipHero.tsx      # Hero VIP
│   │   └── data/            # Datos de configuración
│   ├── ui/                  # Componentes base UI
│   └── landing/             # Componentes de landing
├── hooks/                   # Custom hooks React
├── lib/                     # Utilidades y helpers
├── public/                  # Assets estáticos
└── styles/                  # Estilos globales
```

---

## 🎯 Niveles de Experiencia

### 🌟 **Básico**
- Hero con información esencial
- Galería simple de fotos
- RSVP básico
- Información del evento

### ⭐ **Premium** 
- Animaciones mejoradas
- Galería con efectos avanzados
- RSVP con validación
- Mesa de regalos interactiva

### 💎 **VIP**
- Efectos exclusivos y elegantes
- Galería premium con zoom
- RSVP personalizado
- Experiencia completa inmersiva

---

## 🎨 Guía de Uso del Tema Coquette

### Gradientes Recomendados
```html
<!-- Rosa claro a intenso -->
<div class="bg-gradient-to-r from-coquette-rosa-claro-300 to-coquette-rosa-intenso-500">

<!-- Plateado elegante -->
<div class="bg-gradient-to-br from-coquette-plateado-200 to-coquette-rosa-claro-300">
```

### Efectos de Animación
```html
<!-- Pulsación suave -->
<div class="coquette-pulse">Elemento con pulse</div>

<!-- Flotación elegante -->
<div class="coquette-float">Elemento flotante</div>

<!-- Brillo animado -->
<div class="coquette-glow">Elemento con brillo</div>
```

### Botones Coquette
```html
<!-- Botón principal -->
<button class="bg-coquette-rosa-intenso-500 hover:bg-coquette-rosa-intenso-600 
               text-white px-6 py-3 rounded-lg transition-all duration-300
               hover:shadow-lg hover:shadow-coquette-rosa-intenso-500/50">
  Confirmar Asistencia
</button>
```

---

## 📊 Performance y Optimización

### Métricas
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **Time to Interactive**: < 3.0s

### Optimizaciones Implementadas
- ✅ Lazy loading de imágenes
- ✅ Code splitting automático
- ✅ CSS purgado y optimizado
- ✅ Compresión de assets
- ✅ Caching inteligente

---

## 🌐 Compatibilidad

### Navegadores Soportados
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

### Dispositivos
- ✅ iPhone/iPad (iOS 14+)
- ✅ Android (Chrome 90+)
- ✅ Desktop (Windows/Mac/Linux)
- ✅ Tablets (todas las orientaciones)

---

## 🔧 Desarrollo

### Agregar Nuevos Componentes
1. Crear componente en `components/demo/quince/`
2. Aplicar colores coquette consistentes
3. Agregar efectos hover apropiados
4. Documentar en README correspondiente

### Testing
```bash
# Tests unitarios
pnpm test

# Tests de integración
pnpm test:integration

# Tests E2E
pnpm test:e2e

# Tests de accesibilidad
pnpm test:a11y
```

### Linting y Formateo
```bash
# ESLint
pnpm lint

# Prettier
pnpm format

# TypeScript check
pnpm type-check
```

---

## 📚 Documentación Adicional

### Archivos de Referencia
- 📖 **[TEMA-COQUETTE-DOCUMENTACION.md](./TEMA-COQUETTE-DOCUMENTACION.md)** - Documentación completa del tema
- 📋 **[CHANGELOG-COQUETTE.md](./CHANGELOG-COQUETTE.md)** - Historial detallado de cambios
- 🎯 **[plan-implementacion-coquette.md](./plan-implementacion-coquette.md)** - Plan de implementación

### Recursos de Diseño
- Paleta de colores completa con códigos hex
- Guías de uso de gradientes y efectos
- Ejemplos de implementación
- Best practices de UX/UI

---

## 🎉 Casos de Uso

### Eventos Quinceañera
- ✨ Celebración de 15 años elegante
- 🎭 Tema romántico y sofisticado
- 👗 Estilo coquette y femenino
- 🌸 Paleta rosa y plateado

### Personalizaciones
- Fácil cambio de colores base
- Contenido completamente editable
- Múltiples layouts disponibles
- Efectos configurables

---

## 🆘 Soporte

### Documentación
- Consultar archivos de documentación incluidos
- Revisar ejemplos en components/demo/
- Verificar configuración en tailwind.config.ts

### Solución de Problemas Comunes
1. **Colores no se aplican**: Verificar build de Tailwind
2. **Animaciones no funcionan**: Comprobar CSS globals.css
3. **Responsive issues**: Revisar breakpoints en config
4. **Performance**: Optimizar imágenes y lazy loading

---

## 📄 Licencia

Este proyecto está licenciado bajo los términos especificados en el contrato con el cliente.

---

## 🏷️ Versión

**v1.0.0** - Implementación completa del tema coquette (Agosto 2025)

### Última Actualización
- **Fecha**: 11 de Agosto, 2025
- **Cambios**: Implementación completa del tema coquette
- **Estado**: ✅ Producción ready

---

*Desarrollado con ❤️ y tema coquette 🎀*
