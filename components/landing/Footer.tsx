import { footerContent } from "./data/landing-data"

export function Footer() {
  return (
    <footer className="bg-black text-white py-8">
      <div className="container mx-auto px-4 text-center">
        <p className="mb-2">{footerContent.copyright}</p>
        <div className="flex justify-center gap-4 text-sm">
          {footerContent.links.map((link, index) => (
            <span key={index} className="flex items-center gap-4">
              <a href={link.href} className="hover:text-gray-300">
                {link.text}
              </a>
              {index < footerContent.links.length - 1 && <span>|</span>}
            </span>
          ))}
        </div>
      </div>
    </footer>
  )
} 