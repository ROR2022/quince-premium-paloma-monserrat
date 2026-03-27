/**
 * debugLogger — Servicio de logging FE→BE
 *
 * Envía logs del browser al endpoint /api/log-client-error para que
 * aparezcan en los logs de Vercel. Especialmente útil en iPhone donde
 * no hay acceso a DevTools.
 *
 * Uso:
 *   import { serverLog } from './debugLogger'
 *   await serverLog('info', 'mi-contexto', 'descripción', { campo: valor })
 *   serverLog('error', ...)      ← fire-and-forget (no await necesario)
 */

export type LogLevel = 'info' | 'warn' | 'error'

/**
 * Envía un log al servidor (Vercel logs) y también al console local.
 * Nunca lanza excepciones — el fallo del log nunca debe interrumpir el flujo.
 */
export async function serverLog(
  level: LogLevel,
  context: string,
  message: string,
  details?: Record<string, unknown>
): Promise<void> {
  // Log local (visible en DevTools desktop / terminal local)
  const localFn = level === 'error' ? console.error : level === 'warn' ? console.warn : console.info
  localFn(`[FotoUploader:${context}] ${message}`, details ?? '')

  // Log remoto (visible en Vercel / servidor)
  try {
    await fetch('/api/log-client-error', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({
        level,
        context,
        message,
        details,
        timestamp: new Date().toISOString(),
      }),
    })
  } catch {
    // Silencioso — el logger nunca debe romper el flujo principal
  }
}

/**
 * Versión fire-and-forget (sin await).
 * Útil dentro de callbacks síncronos (ej. canvas.toBlob, img.onload).
 */
export function serverLogSync(
  level: LogLevel,
  context: string,
  message: string,
  details?: Record<string, unknown>
): void {
  void serverLog(level, context, message, details)
}

/** Convierte un objeto Error a un plain object serializable. */
export function serializeError(err: unknown): Record<string, unknown> {
  if (err instanceof Error) {
    return {
      name:    err.name,
      message: err.message,
      stack:   err.stack?.slice(0, 400) ?? 'no stack',
    }
  }
  return { raw: String(err) }
}

/** Formatea tamaño de bytes de forma legible. */
export function fmtBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
}
