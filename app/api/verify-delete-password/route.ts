import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { password } = await req.json()

  if (!password || password !== process.env.DELETE_PASSWORD) {
    return NextResponse.json({ ok: false }, { status: 401 })
  }

  return NextResponse.json({ ok: true })
}
