"use client"

// Número de WhatsApp destino (con código de país, sin + ni espacios)
const WHATSAPP_PHONE = "5213314402148" //+52 1 33 1440 2148

import { useState, useRef, type FormEvent } from "react"
import { useInView } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import { basicDemoData } from "./data/basic-demo-data"

export function BasicAttendance() {
  const [name, setName] = useState("")
  const [attendance, setAttendance] = useState<string | null>(null)
  const [companions, setCompanions] = useState("")
  const [phone, setPhone] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    if (!name || !attendance || !phone) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos requeridos.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    const emoji = attendance === "yes" ? "✅" : "❌"
    const asistencia = attendance === "yes" ? "SÍ asistirá" : "NO podrá asistir"
    const acompanantes = companions.trim() || "Ninguno"

    const mensaje =
      `${emoji} *Confirmación - XV Paloma Monserrat*\n\n` +
      `👤 *Nombre:* ${name}\n` +
      `📱 *Teléfono:* ${phone}\n` +
      `🎉 *Asistencia:* ${asistencia}\n` +
      `👥 *Acompañantes:* ${acompanantes}`

    const url = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(mensaje)}`

    // Reset form
    setName("")
    setAttendance(null)
    setCompanions("")
    setPhone("")
    setIsSubmitting(false)

    toast({
      title: "¡Gracias!",
      description: "Abriendo WhatsApp para enviar tu confirmación...",
    })

    // Redirige en la misma pestaña — sin window.open, sin pop-blockers
    window.location.href = url
  }

  return (
    <section className="py-16 px-4 relative overflow-hidden min-h-screen">
      {/* Grid de 4 imágenes de fondo */}
      <div className="absolute inset-0 w-full h-full">
        <div className="grid grid-cols-2 grid-rows-2 w-full h-full">
          <div 
            className="bg-cover bg-center opacity-40 transition-opacity duration-500" 
            style={{
              backgroundImage: "url('/images/custom/mono1.jpeg')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }} 
          />
          <div 
            className="bg-cover bg-center opacity-35 transition-opacity duration-500" 
            style={{
              backgroundImage: "url('/images/custom/mono2.jpeg')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }} 
          />
          <div 
            className="bg-cover bg-center opacity-30 transition-opacity duration-500" 
            style={{
              backgroundImage: "url('/images/custom/mono3.jpeg')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }} 
          />
          <div 
            className="bg-cover bg-center opacity-35 transition-opacity duration-500" 
            style={{
              backgroundImage: "url('/images/custom/mono4.jpeg')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }} 
          />
        </div>
      </div>
      
      {/* Overlay coquette para legibilidad - MÁS SUTIL */}
      <div className="absolute inset-0 bg-gradient-to-br from-coquette-rosa-claro-50/70 to-white/60"></div>
      
      <div
        ref={ref}
        className={`relative z-10 max-w-3xl mx-auto text-center transition-all duration-1000 ${
          isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-coquette-rosa-intenso-600 to-coquette-rosa-intenso-700 bg-clip-text text-transparent drop-shadow-sm">
          {basicDemoData.attendance.title}
        </h2>

        <div className="mt-4 mb-8 text-center">
          <p className="text-lg text-coquette-plateado-800 font-medium drop-shadow-sm">Respetuosamente</p>
          <p className="text-lg font-medium my-2 text-coquette-rosa-intenso-700 drop-shadow-sm">&lt;{basicDemoData.event.restrictions}&gt;</p>
          <p className="text-lg text-coquette-plateado-800 font-medium drop-shadow-sm">{basicDemoData.attendance.subtitle}</p>
        </div>

        <div 
        style={{ backgroundColor: 'transparent' }}
        className="rounded-xl shadow-2xl border border-white/30 p-6 md:p-8 mt-8">
          <form onSubmit={handleSubmit} className="space-y-6 text-left">
            <div>
              <Label htmlFor="name" className="text-base text-white font-bold drop-shadow-lg bg-coquette-rosa-intenso-600/80 px-2 py-1 rounded">
                {basicDemoData.attendance.fields.name}
              </Label>
              <Input
                id="name"
                placeholder="Ingresa tu nombre"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="mt-2 border-white/50 focus:border-coquette-rosa-intenso-400 focus:ring-coquette-rosa-claro-500/50 bg-white/30 backdrop-blur-md text-gray-900 font-semibold placeholder:text-gray-700"
              />
            </div>

            <div>
              <Label className="text-base mb-2 inline-block text-white font-bold drop-shadow-lg bg-coquette-rosa-intenso-600/80 px-2 py-1 rounded">
                {basicDemoData.attendance.fields.response}
              </Label>
              <RadioGroup value={attendance || ""} onValueChange={setAttendance}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="no" className="text-coquette-rosa-intenso-600 border-white/60" />
                  <Label htmlFor="no" className="text-white font-bold drop-shadow-lg bg-black/20 px-2 py-1 rounded">{basicDemoData.attendance.fields.responseOptions.no}</Label>
                </div>
                <div className="flex items-center space-x-2 mt-2">
                  <RadioGroupItem value="yes" id="yes" className="text-coquette-rosa-intenso-600 border-white/60" />
                  <Label htmlFor="yes" className="text-white font-bold drop-shadow-lg bg-black/20 px-2 py-1 rounded">{basicDemoData.attendance.fields.responseOptions.yes}</Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label htmlFor="companions" className="text-base text-white font-bold drop-shadow-lg bg-coquette-rosa-intenso-600/80 px-2 py-1 rounded">
                {basicDemoData.attendance.fields.companions}
              </Label>
              <Textarea
                id="companions"
                placeholder="Nombre y apellido"
                value={companions}
                onChange={(e) => setCompanions(e.target.value)}
                className="mt-2 border-white/50 focus:border-coquette-rosa-intenso-400 focus:ring-coquette-rosa-claro-500/50 bg-white/30 backdrop-blur-md text-gray-900 font-semibold placeholder:text-gray-700"
              />
            </div>

            <div>
              <Label htmlFor="phone" className="text-base text-white font-bold drop-shadow-lg bg-coquette-rosa-intenso-600/80 px-2 py-1 rounded">
                {basicDemoData.attendance.fields.phone}
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder="Para enviarte algún aviso de importancia."
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="mt-2 border-white/50 focus:border-coquette-rosa-intenso-400 focus:ring-coquette-rosa-claro-500/50 bg-white/30 backdrop-blur-md text-gray-900 font-semibold placeholder:text-gray-700"
              />
            </div>

            <div className="text-center pt-4">
              <Button
                type="submit"
                className="w-full bg-coquette-rosa-intenso-500 hover:bg-coquette-rosa-intenso-600 text-white py-6 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-coquette-rosa-intenso-500/40 font-bold"
                disabled={isSubmitting}
              >
                {isSubmitting ? "ENVIANDO..." : "ENVIAR RESPUESTA"}
              </Button>
            </div>

            {/* Nota del demo */}
            <div className="mt-4 p-3 bg-black/30 backdrop-blur-md rounded-lg border border-white/30 shadow-md">
              <p className="text-xs text-white font-bold drop-shadow-lg">
                💡 La confirmación se envía automáticamente por WhatsApp.
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
} 