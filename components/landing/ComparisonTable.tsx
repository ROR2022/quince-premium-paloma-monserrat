import { Check, X } from "lucide-react"
import { comparisonFeatures } from "./data/landing-data"

export function ComparisonTable() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="grid grid-cols-4 bg-gray-100">
              <div className="p-4"></div>
              <div className="p-4 text-center">
                <h3 className="text-2xl font-bold text-cyan-400 italic">Básica</h3>
              </div>
              <div className="p-4 text-center">
                <h3 className="text-2xl font-bold text-cyan-400 italic">Premium</h3>
              </div>
              <div className="p-4 text-center">
                <h3 className="text-2xl font-bold text-cyan-400 italic">Vip</h3>
              </div>
            </div>

            {comparisonFeatures.map((feature, index) => (
              <div key={index} className={`grid grid-cols-4 ${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}>
                <div className="p-4 font-semibold text-gray-800">{feature.name}</div>
                <div className="p-4 text-center">
                  {feature.basic ? (
                    <Check className="text-green-500 mx-auto" size={20} />
                  ) : (
                    <X className="text-red-500 mx-auto" size={20} />
                  )}
                </div>
                <div className="p-4 text-center">
                  {feature.premium ? (
                    <Check className="text-green-500 mx-auto" size={20} />
                  ) : (
                    <X className="text-red-500 mx-auto" size={20} />
                  )}
                </div>
                <div className="p-4 text-center">
                  {feature.vip ? (
                    <Check className="text-green-500 mx-auto" size={20} />
                  ) : (
                    <X className="text-red-500 mx-auto" size={20} />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
} 