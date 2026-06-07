import { Section, SectionHeading } from "./section"
import { Reveal } from "@/components/reveal"

const services = [
  {
    number: "01",
    title: "Custom website redesigns",
    description: "Refresh outdated practice websites with a clearer structure, stronger visuals, and patient-focused messaging.",
  },
  {
    number: "02",
    title: "Landing pages for private practices",
    description: "Create focused pages for specialties, services, campaigns, or new patient inquiries.",
  },
  {
    number: "03",
    title: "Mobile optimization",
    description: "Improve small-screen readability, navigation, speed, and calls to action for patients on phones.",
  },
  {
    number: "04",
    title: "Appointment/contact form improvements",
    description: "Make it easier for visitors to request appointments, ask questions, or contact the office.",
  },
  {
    number: "05",
    title: "SEO basics",
    description: "Set up practical page titles, descriptions, headings, and local signals for search visibility.",
  },
  {
    number: "06",
    title: "Copywriting for physician services",
    description: "Write clear service copy that explains care options without sounding generic or overly clinical.",
  },
  {
    number: "07",
    title: "Google Business Profile support",
    description: "Align profile details, links, and messaging so local patients find accurate practice information.",
  },
  {
    number: "08",
    title: "Website maintenance",
    description: "Keep pages, content, forms, and basic site details current after launch.",
  },
]

export function ServicesSection() {
  return (
    <Section id="services">
      <Reveal>
        <SectionHeading
          eyebrow="What We Improve"
          title="Services"
          description="Focused website support for physicians and private practices that need a clearer, more trustworthy online presence."
        />
      </Reveal>
      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10 border border-white/10 rounded-3xl overflow-hidden">
        {services.map((service, index) => (
          <Reveal key={service.number} className="h-full" delay={index * 80} rootMargin="0px 0px 15% 0px" threshold={0}>
            <div className="h-full bg-black p-10 transition-colors duration-300 ease-out hover:bg-neutral-900 focus-within:bg-neutral-900">
              <span className="font-mono text-xs tracking-[0.35em] text-white/30">{service.number}</span>
              <h3 className="mt-6 font-mono text-xl tracking-[0.2em] uppercase">{service.title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-white/50 text-pretty">{service.description}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
