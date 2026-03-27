import { NextRequest, NextResponse } from 'next/server'

// ─── POST /api/log-client-error ──────────────────────────────────────────────
// Recibe errores del lado del cliente para poder verlos en los logs de Vercel.
// Útil al depurar desde iPhone donde no hay DevTools.
// Solo activo mientras dure el debugging — puede eliminarse después.
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const ua   = request.headers.get('user-agent') ?? 'unknown'
    const ip   = request.headers.get('x-forwarded-for') ?? 'unknown'

    console.error(`[CLIENT ERROR] ip=${ip} | ua=${ua}`)
    console.error('[CLIENT ERROR] context:', body.context ?? 'n/a')
    console.error('[CLIENT ERROR] message:', body.message ?? 'n/a')
    console.error('[CLIENT ERROR] details:', JSON.stringify(body.details ?? {}))

    return NextResponse.json({ received: true })
  } catch {
    return NextResponse.json({ received: false }, { status: 400 })
  }
}
