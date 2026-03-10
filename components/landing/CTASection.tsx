"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button"
import { MessageCircle } from "lucide-react"
import { ctaContent } from "./data/landing-data"
import { ContactModal } from "./ContactModal";

export function CTASection() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const handleModalContact = () => {
    setIsContactModalOpen(true);
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 text-center">
        <div className="mb-4">
          <div className="w-16 h-0.5 bg-gray-300 mx-auto mb-2"></div>
          <div className="w-8 h-8 mx-auto bg-gray-200 rounded-full flex items-center justify-center">
            <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
          </div>
          <div className="w-16 h-0.5 bg-gray-300 mx-auto mt-2"></div>
        </div>

        <p className="text-xl md:text-2xl text-pink-500 font-bold mb-2">
          {ctaContent.deliveryText}
        </p>
        <p className="text-lg text-pink-500 mb-8">{ctaContent.consultText}</p>

        <Button 
          onClick={handleModalContact}
        className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 text-lg rounded-lg mb-12">
          <MessageCircle className="mr-2" />
          {ctaContent.buttonText}
        </Button>

        <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
          {ctaContent.mainTitle}
        </h3>

        <p className="text-lg text-gray-600 mb-8">
          {ctaContent.description}
        </p>

        <h4 className="text-xl md:text-2xl font-bold text-gray-800">{ctaContent.finalTitle}</h4>
      </div>

      {/* Modal de contacto */}
      <ContactModal 
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
    </section>
  )
} 