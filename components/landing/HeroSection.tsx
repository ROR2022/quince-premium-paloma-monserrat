import { HeroCarousel } from "./HeroCarousel"
import { heroContent } from "./data/landing-data"

export function HeroSection() {
  return (
    <HeroCarousel>
      <p className="text-xl md:text-2xl font-light tracking-widest">
        {heroContent.description}
        <br />
        {heroContent.subdescription}
      </p>
    </HeroCarousel>
  )
} 