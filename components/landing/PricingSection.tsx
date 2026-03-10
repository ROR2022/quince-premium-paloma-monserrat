"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import { plans } from "./data/landing-data";
import { useRouter } from "next/navigation";

export function PricingSection() {
  const router = useRouter();

  const handleDemoClick = (demoType: string) => {
    router.push(`/demo/${demoType}`);
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-800">
          CONTAMOS CON 3 PAQUETES:
        </h2>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={`relative ${
                plan.popular ? "ring-2 ring-pink-500" : ""
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <Badge className="bg-cyan-400 text-black px-4 py-1 text-sm font-bold italic">
                    {plan.badge}
                  </Badge>
                </div>
              )}

              <CardHeader className="text-center pb-4">
                <div className="mb-4">
                  <div className="w-16 h-0.5 bg-gray-300 mx-auto mb-2"></div>
                  <div className="w-8 h-8 mx-auto bg-gray-200 rounded-full flex items-center justify-center">
                    <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                  </div>
                  <div className="w-16 h-0.5 bg-gray-300 mx-auto mt-2"></div>
                </div>

                <CardTitle className="text-2xl font-bold text-gray-800 mb-2">
                  {plan.name}
                </CardTitle>
                <div className="text-4xl font-bold">
                  <span className="text-red-600">{plan.price}</span>
                  <span className="text-lg text-gray-600 ml-1">
                    {plan.currency}
                  </span>
                </div>
              </CardHeader>

              <CardContent>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-gray-700">
                      <Check
                        className="text-yellow-500 mr-3 flex-shrink-0"
                        size={16}
                      />
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="flex gap-2">
                  <Button className="flex-1 bg-pink-500 hover:bg-pink-600 text-white" 
                  onClick={() => handleDemoClick(`quince/${plan.name.toLowerCase()}`)}>
                    Ver Demo XV
                  </Button>
                  <Button className="flex-1 bg-black hover:bg-gray-800 text-white" 
                  onClick={() => handleDemoClick(`boda/${plan.name.toLowerCase()}`)}>
                    Ver Demo BODA
                  </Button>
                </div>

                <div className="mt-4">
                  <div className="w-16 h-0.5 bg-gray-300 mx-auto mb-2"></div>
                  <div className="w-8 h-8 mx-auto bg-gray-200 rounded-full flex items-center justify-center">
                    <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                  </div>
                  <div className="w-16 h-0.5 bg-gray-300 mx-auto mt-2"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
