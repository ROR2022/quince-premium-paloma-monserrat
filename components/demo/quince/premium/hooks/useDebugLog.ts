import { useState, useCallback, useRef } from 'react'

export function useDebugLog(maxMessages = 50) {
  const [showDebug, setShowDebug] = useState(false)
  const [debugMessages, setDebugMessages] = useState<string[]>([])
  
  // Use useRef to store the maxMessages to avoid recreating the function
  const maxMessagesRef = useRef(maxMessages)
  maxMessagesRef.current = maxMessages
  
  const debugLog = useCallback((message: string) => {
    console.log(message)
    setDebugMessages(prev => [message, ...prev].slice(0, maxMessagesRef.current))
  }, []) // Remove maxMessages from dependencies since we use useRef
  
  const toggleDebugPanel = useCallback(() => {
    setShowDebug(prev => !prev)
  }, [])
  
  return {
    showDebug,
    setShowDebug,
    debugMessages,
    debugLog,
    toggleDebugPanel
  }
}
