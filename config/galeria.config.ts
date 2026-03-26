/**
 * Configuración central de la Galería Colaborativa.
 *
 * Este es el ÚNICO archivo que debe cambiar al reutilizar el sistema
 * en otro proyecto. El núcleo portátil (components/sections, lib, models,
 * app/api) lee de aquí — nunca tiene datos del evento hardcodeados.
 *
 * Ver GALERIA-PORTABILIDAD.md para instrucciones de reutilización.
 */
export const GALERIA_CONFIG = {
  event: {
    /** Nombre para mostrar en títulos de página y textos de UI */
    name: 'Paloma Monserrat',
    /** Slug para rutas de fallback local (minúsculas, guiones, sin espacios) */
    slug: 'paloma-monserrat',
  },

  upload: {
    maxFiles: 10,
    maxFileSizeMB: 4.5,
    uploaderLabel: '¿Cómo te llamas?',
    uploaderPlaceholder: 'Tu nombre',
    successMessage: '¡Fotos subidas exitosamente! Gracias por compartir.',
    /** Milisegundos antes de resetear el formulario tras éxito */
    resetDelayMs: 10000,
  },

  gallery: {
    photosPerPage: 20,
    /** Horas durante las que una foto muestra el badge "NUEVO" */
    newBadgeHours: 6,
    /** Intervalo en ms para verificar fotos nuevas */
    checkNewIntervalMs: 30000,
    title: 'Galería del evento',
    emptyMessage: 'Aún no hay fotos. ¡Sé el primero en compartir!',
  },

  qr: {
    title: '📸 ¡Comparte tus fotos!',
    subtitle: 'Escanea el código para subir tus fotos del evento',
    downloadLabel: 'Descargar QR',
  },

  pages: {
    upload: '/fotos',
    gallery: '/gallery',
    home: '/',
  },
} as const

export type GaleriaConfig = typeof GALERIA_CONFIG
