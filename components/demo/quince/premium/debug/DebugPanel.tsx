import { Bug as BugIcon } from "lucide-react"

type DebugPanelProps = {
  showDebug: boolean
  debugMessages: string[]
  onClose: () => void
  onToggle: () => void
}

export function DebugPanel({ showDebug, debugMessages, onClose, onToggle }: DebugPanelProps) {
  return (
    <>
      {showDebug && (
        <div className="fixed top-0 left-0 bg-black/80 text-white p-4 z-50 w-96 max-h-96 overflow-auto text-xs font-mono">
          <div className="flex justify-between items-center mb-2">
            <h3>Depuración Carrusel</h3>
            <button 
              onClick={onClose}
              className="bg-red-500 hover:bg-red-700 text-white px-2 py-1 text-xs rounded"
            >
              Cerrar
            </button>
          </div>
          <div>
            {debugMessages.map((msg, i) => (
              <div key={i} className="border-b border-gray-700 py-1">{msg}</div>
            ))}
          </div>
        </div>
      )}
      
      {!showDebug && (
        <button 
          onClick={onToggle}
          className="fixed top-4 right-20 bg-pink-500/70 hover:bg-pink-700 text-white p-1 rounded-full z-50"
          title="Mostrar panel de depuración"
        >
          <BugIcon className="w-5 h-5" />
        </button>
      )}
    </>
  )
}
