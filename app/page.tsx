import { CtaSection } from "@/components/site/cta"
import { Footer } from "@/components/site/footer"
import { Hero } from "@/components/site/hero"
import { Navbar } from "@/components/site/navbar"

export default function Page() {
  return (
    <main className="min-h-svh">
      <Navbar />
      <Hero />
      <CtaSection />
      <Footer />
    </main>
  )
}
