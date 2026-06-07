import { SiteHeader } from "@/components/site-header"
import { WorksGallery } from "@/components/works-gallery"
import { BackToTop } from "@/components/back-to-top"
import { NetworkBackground } from "@/components/network-background"
import { WebsiteMattersSection } from "@/components/sections/website-matters-section"
import { ProcessSection } from "@/components/sections/process-section"
import { ServicesSection } from "@/components/sections/services-section"
import { AboutSection } from "@/components/sections/about-section"
import { FaqSection } from "@/components/sections/faq-section"
import { ContactSection } from "@/components/sections/contact-section"

export default function Page() {
  return (
    <div className="grain-background min-h-screen bg-background text-foreground">
      <NetworkBackground />
      <div className="grain-content">
        <SiteHeader />

      {/* Landing hero — Works Gallery */}
        <main className="pt-32 pb-16">
          <div className="mx-auto max-w-4xl px-6 pb-16 text-center">
            <h1 className="font-mono text-3xl md:text-5xl font-semibold leading-tight tracking-tight text-balance">
              Your website should reflect the quality of your care
            </h1>
            <p className="mx-auto mt-6 max-w-2xl font-mono text-sm md:text-base leading-relaxed tracking-wide text-foreground/60 text-pretty">
              Explore modern website options built to help patients trust your practice and take the next step
            </p>
          </div>
          <WorksGallery />
        </main>

      {/* In-page sections */}
        <WebsiteMattersSection />
        <ProcessSection />
        <ServicesSection />
        <AboutSection />
        <FaqSection />
        <ContactSection />

        <BackToTop />
      </div>
    </div>
  )
}
