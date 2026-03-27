import { NextRequest, NextResponse } from 'next/server'

// ─── POST /api/log-client-error ──────────────────────────────────────────────
// Recibe logs del FE (info / warn / error) y los emite en los logs de Vercel.
// Útil para depurar desde iPhone donde no hay DevTools.
export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}))
    const ua        = request.headers.get('user-agent') ?? 'unknown'
    const ip        = request.headers.get('x-forwarded-for') ?? 'unknown'

    const level     = (body.level ?? 'error') as 'info' | 'warn' | 'error'
    const context   = body.context  ?? 'n/a'
    const message   = body.message  ?? 'n/a'
    const details   = body.details  ?? {}
    const timestamp = body.timestamp ?? new Date().toISOString()

    const tag   = `[CLIENT:${level.toUpperCase()}]`
    const logFn = level === 'info' ? console.log : level === 'warn' ? console.warn : console.error

    // Un único log por request — Vercel muestra TODO en la vista de resumen
    logFn(
      `${tag} | ${timestamp} | ctx=${context} | ${message}`,
      Object.keys(details).length > 0 ? JSON.stringify(details) : '',
      `| ua=${ua.slice(0, 100)} | ip=${ip}`
    )

    return NextResponse.json({ received: true })
  } catch {
    return NextResponse.json({ received: false }, { status: 400 })
  }
}
