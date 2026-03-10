"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { interactiveInvitationContent } from "./data/landing-data";
import { InteractivePhoneDemo } from "./InteractivePhoneDemo";
import { ContactModal } from "./ContactModal";

export function InteractiveInvitationSection() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const handleModalContact = () => {
    setIsContactModalOpen(true);
  };

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center lg:text-left mb-8 sm:mb-10 lg:mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
            <span className="text-cyan-400">
              {interactiveInvitationContent.title}
            </span>
          </h2>
          <p className="text-xl sm:text-2xl lg:text-3xl font-bold mb-6 sm:mb-8 leading-tight">
            {interactiveInvitationContent.subtitle}{" "}
            <span className="text-pink-500">
              {interactiveInvitationContent.highlight}
            </span>
          </p>
          <Button
            onClick={handleModalContact}
            className="bg-green-500 hover:bg-green-600 text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg rounded-lg transition-all duration-300 hover:scale-105 shadow-lg"
          >
            <MessageCircle className="mr-2 w-5 h-5" />
            {interactiveInvitationContent.buttonText}
          </Button>
        </div>

        {/* Interactive Demo */}
        <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-xl border border-gray-100 overflow-hidden">
          <div className="mb-6 sm:mb-8 text-center">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-3">
              {interactiveInvitationContent.featuresTitle}
            </h3>
            <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
              Haz click en cada característica para ver cómo funciona en tiempo
              real
            </p>
          </div>

          <InteractivePhoneDemo />
        </div>

        {/* Bottom CTA */}
        <div className="bg-gradient-to-r from-pink-500 to-pink-600 text-white text-center py-4 sm:py-6 rounded-xl sm:rounded-2xl mt-6 sm:mt-8 shadow-lg mx-2 sm:mx-0">
          <p className="text-lg sm:text-xl font-bold mb-1 sm:mb-2 px-4">
            {interactiveInvitationContent.bottomText}
          </p>
          <p className="text-pink-100 text-sm sm:text-base px-4">
            Todas las funcionalidades incluidas sin costos adicionales
          </p>
        </div>
      </div>

      {/* Modal de contacto */}
      <ContactModal 
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
    </section>
  );
}
