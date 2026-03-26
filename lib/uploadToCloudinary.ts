import cloudinary from './cloudinary'

export interface CloudinaryUploadResult {
  publicId: string
  secureUrl: string
  width: number
  height: number
  format: string
  bytes: number
}

export interface UploadOptions {
  folder?: string
  tags?: string[]
}

/**
 * Sube un buffer de imagen a Cloudinary.
 *
 * Folder y tags se toman de las variables de entorno por defecto,
 * pero pueden sobreescribirse con las opciones.
 * No tiene referencias al evento — es infraestructura pura.
 */
export async function uploadImageToCloudinary(
  buffer: Buffer,
  fileName: string,
  options: UploadOptions = {}
): Promise<CloudinaryUploadResult> {
  const folder = options.folder ?? process.env.CLOUDINARY_FOLDER ?? 'galeria'
  const tags   = options.tags  ?? (process.env.CLOUDINARY_TAGS?.split(',').map(t => t.trim()) ?? [])

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        public_id: `${Date.now()}_${fileName.replace(/[^a-zA-Z0-9]/g, '_')}`,
        tags,
        resource_type: 'image',
        use_filename: false,
        overwrite: false,
      },
      (error, result) => {
        if (error || !result) {
          reject(error ?? new Error('Cloudinary no retornó resultado'))
          return
        }
        resolve({
          publicId:  result.public_id,
          secureUrl: result.secure_url,
          width:     result.width,
          height:    result.height,
          format:    result.format,
          bytes:     result.bytes,
        })
      }
    )
    uploadStream.end(buffer)
  })
}
