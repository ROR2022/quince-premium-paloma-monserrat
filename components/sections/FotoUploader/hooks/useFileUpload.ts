import { useState, useCallback } from 'react'
import { UPLOAD_CONFIG } from '../constants/upload.constants'

export function useFileUpload() {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [fileError, setFileError] = useState<string | null>(null)

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setFileError(null)
    const files = Array.from(e.target.files ?? [])

    if (files.length === 0) return

    if (files.length > UPLOAD_CONFIG.maxFiles) {
      setFileError(`Máximo ${UPLOAD_CONFIG.maxFiles} archivos a la vez`)
      return
    }

    setSelectedFiles(files)
  }, [])

  const clearFiles = useCallback(() => {
    setSelectedFiles([])
    setFileError(null)
  }, [])

  return { selectedFiles, fileError, handleFileChange, clearFiles }
}
