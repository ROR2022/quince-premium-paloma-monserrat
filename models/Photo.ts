import mongoose, { Schema, Document, Model } from 'mongoose'

export interface IPhoto extends Document {
  // Identificación
  filename:     string
  originalName: string

  // Almacenamiento
  cloudinaryId:  string | null
  cloudinaryUrl: string | null
  localPath:     string | null
  uploadSource:  'cloudinary' | 'local'

  // Metadatos del archivo
  fileSize:   number
  mimeType:   string
  dimensions: { width: number; height: number }

  // Metadatos del invitado
  uploader: {
    name:      string
    ip?:       string
    userAgent?: string
  }

  // Contexto del evento
  // eventMoment queda como soporte futuro — por ahora siempre 'general'
  eventMoment: 'ceremonia' | 'recepcion' | 'fiesta' | 'general'
  comment:     string

  // Estado
  uploadedAt:       Date
  isPublic:         boolean
  status:           'uploading' | 'ready' | 'error'
  moderationStatus: 'pending' | 'approved' | 'rejected'
  viewCount:        number
  lastViewedAt?:    Date

  // Virtual
  displayUrl: string
}

const PhotoSchema = new Schema<IPhoto>(
  {
    filename:     { type: String, required: true, unique: true },
    originalName: { type: String, required: true },

    cloudinaryId:  { type: String, default: null },
    cloudinaryUrl: { type: String, default: null },
    localPath:     { type: String, default: null },
    uploadSource:  { type: String, enum: ['cloudinary', 'local'], required: true },

    fileSize:   { type: Number, required: true },
    mimeType:   { type: String, required: true },
    dimensions: {
      width:  { type: Number },
      height: { type: Number },
    },

    uploader: {
      name:      { type: String, default: 'Anónimo' },
      ip:        { type: String },
      userAgent: { type: String },
    },

    eventMoment: {
      type:    String,
      enum:    ['ceremonia', 'recepcion', 'fiesta', 'general'],
      default: 'general',
    },
    comment: { type: String, default: '' },

    uploadedAt:       { type: Date, default: Date.now },
    isPublic:         { type: Boolean, default: true },
    status:           { type: String, enum: ['uploading', 'ready', 'error'], default: 'ready' },
    moderationStatus: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'approved' },
    viewCount:        { type: Number, default: 0 },
    lastViewedAt:     { type: Date },
  },
  {
    timestamps: true,
    toJSON:     { virtuals: true },
    toObject:   { virtuals: true },
  }
)

// Índices para performance
PhotoSchema.index({ uploadedAt: -1 })
PhotoSchema.index({ isPublic: 1, status: 1 })
PhotoSchema.index({ eventMoment: 1 })
PhotoSchema.index({ 'uploader.name': 1 })

// Virtual: URL optimizada calculada según la fuente de almacenamiento
PhotoSchema.virtual('displayUrl').get(function (this: IPhoto) {
  if (this.cloudinaryUrl) {
    return this.cloudinaryUrl.replace('/upload/', '/upload/f_auto,q_auto,w_800/')
  }
  return this.localPath ?? ''
})

// Evita registrar el modelo múltiples veces en desarrollo (hot reload)
const Photo: Model<IPhoto> =
  (mongoose.models.Photo as Model<IPhoto>) ??
  mongoose.model<IPhoto>('Photo', PhotoSchema)

export default Photo
