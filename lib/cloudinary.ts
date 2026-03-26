import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
})

/**
 * Transformaciones predefinidas por caso de uso.
 * thumbnail → miniaturas en grid
 * gallery   → vista normal en galería
 * modal     → foto ampliada en modal
 */
export const CLOUDINARY_TRANSFORMS = {
  thumbnail:  'f_auto,q_auto,w_300,h_300,c_fill',
  gallery:    'f_auto,q_auto,w_800',
  modal:      'f_auto,q_best,w_1920',
} as const

export type CloudinaryTransform = keyof typeof CLOUDINARY_TRANSFORMS

/**
 * Genera una URL optimizada de Cloudinary aplicando la transformación indicada.
 */
export function generateOptimizedUrl(
  publicId: string,
  transform: CloudinaryTransform
): string {
  return cloudinary.url(publicId, {
    transformation: [{ raw_transformation: CLOUDINARY_TRANSFORMS[transform] }],
  })
}

export default cloudinary
