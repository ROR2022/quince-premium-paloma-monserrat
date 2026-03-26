import { useState, useEffect } from 'react'

export function useImagePreview(files: File[]) {
  const [previews, setPreviews] = useState<string[]>([])

  useEffect(() => {
    const urls = files.map((f) => URL.createObjectURL(f))
    setPreviews(urls)

    return () => {
      urls.forEach((u) => URL.revokeObjectURL(u))
    }
  }, [files])

  return previews
}
