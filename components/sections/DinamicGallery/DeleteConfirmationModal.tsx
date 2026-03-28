'use client'

import { useState } from 'react'
import { Trash2, X, Lock } from 'lucide-react'

interface Props {
  onConfirm: () => void
  onCancel:  () => void
}

export function DeleteConfirmationModal({ onConfirm, onCancel }: Props) {
  const [step, setStep]         = useState<'confirm' | 'password'>('confirm')
  const [password, setPassword] = useState('')
  const [error, setError]       = useState(false)
  const [loading, setLoading]   = useState(false)
  const [shake, setShake]       = useState(false)

  async function handleVerify() {
    setLoading(true)
    setError(false)

    const res = await fetch('/api/verify-delete-password', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ password }),
    })

    setLoading(false)

    if (res.ok) {
      onConfirm()
    } else {
      setError(true)
      setShake(true)
      setPassword('')
      setTimeout(() => setShake(false), 500)
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' && password.trim()) handleVerify()
  }

  // ─── Paso 1: confirmación inicial ──────────────────────────────────────────
  if (step === 'confirm') {
    return (
      <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-sm w-full">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center shrink-0">
              <Trash2 className="w-5 h-5 text-red-500" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">¿Eliminar foto?</h3>
              <p className="text-sm text-gray-500">Esta acción no se puede deshacer.</p>
            </div>
          </div>
          <div className="flex gap-3">
            <button
              onClick={onCancel}
              className="flex-1 border border-gray-300 text-gray-700 py-2.5 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-1.5"
            >
              <X className="w-4 h-4" /> Cancelar
            </button>
            <button
              onClick={() => setStep('password')}
              className="flex-1 bg-red-500 text-white py-2.5 rounded-xl text-sm font-medium hover:bg-red-600 transition-colors flex items-center justify-center gap-1.5"
            >
              <Trash2 className="w-4 h-4" /> Eliminar
            </button>
          </div>
        </div>
      </div>
    )
  }

  // ─── Paso 2: verificación de contraseña ────────────────────────────────────
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-sm w-full">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center shrink-0">
            <Lock className="w-5 h-5 text-amber-500" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">Autorización requerida</h3>
            <p className="text-sm text-gray-500">Ingresa la contraseña para eliminar.</p>
          </div>
        </div>

        <div className={`mb-4 ${shake ? 'animate-shake' : ''}`}>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Contraseña"
            autoFocus
            className={`w-full border rounded-xl px-4 py-2.5 text-sm outline-none transition-colors
              ${error ? 'border-red-400 bg-red-50 focus:border-red-500' : 'border-gray-300 focus:border-amber-400'}`}
          />
          {error && (
            <p className="text-xs text-red-500 mt-1.5 pl-1">Contraseña incorrecta. Intenta de nuevo.</p>
          )}
        </div>

        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 border border-gray-300 text-gray-700 py-2.5 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-1.5"
          >
            <X className="w-4 h-4" /> Cancelar
          </button>
          <button
            onClick={handleVerify}
            disabled={!password.trim() || loading}
            className="flex-1 bg-red-500 text-white py-2.5 rounded-xl text-sm font-medium hover:bg-red-600 transition-colors flex items-center justify-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
            ) : (
              <Trash2 className="w-4 h-4" />
            )}
            Confirmar
          </button>
        </div>
      </div>
    </div>
  )
}
