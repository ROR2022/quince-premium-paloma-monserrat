export interface UploaderFormData {
  uploaderName: string
}

export interface UploadFileState {
  file: File
  preview: string
  status: 'pending' | 'compressing' | 'uploading' | 'success' | 'error'
  progress: number
  error?: string
}

export interface CloudinaryUploadResult {
  publicId:  string
  secureUrl: string
  width:     number
  height:    number
}

export interface UploadResult {
  success:      boolean
  cloudinaryUrl?: string
  cloudinaryId?:  string
  localPath?:     string
  uploadSource:   'cloudinary' | 'local'
  fileSize:       number
  mimeType:       string
  dimensions:     { width: number; height: number }
  filename:       string
  originalName:   string
  error?:         string
}
