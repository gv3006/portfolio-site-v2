import { Section, SectionHeading } from "./section"
import { Reveal } from "@/components/reveal"

const reasons = [
  {
    number: "01",
    title: "Trust forms before the first call",
    description:
      "Patients often judge the quality of a practice by its website before they ever speak with the team.",
  },
  {
    number: "02",
    title: "Clear services reduce hesitation",
    description:
      "Straightforward pages help visitors understand what you offer, who you help, and what to expect next.",
  },
  {
    number: "03",
    title: "Mobile visits need to feel effortless",
    description:
      "Many patients browse from a phone, so speed, readability, and simple navigation directly shape confidence.",
  },
  {
    number: "04",
    title: "Better paths create more appointments",
    description:
      "Visible contact details and focused calls to action make it easier for the right patient to take the next step.",
  },
]

export function WebsiteMattersSection() {
  return (
    <Section id="why-it-matters">
      <Reveal>
        <SectionHeading
          eyebrow="Patient Trust Starts Online"
          title="Why Your Website Matters"
          description="Your website is often the first proof of your care quality. It should help patients feel informed, comfortable, and ready to contact your practice."
        />
      </Reveal>
      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10 border border-white/10 rounded-3xl overflow-hidden">
        {reasons.map((reason, index) => (
          <Reveal key={reason.number} delay={index * 80}>
            <article className="h-full bg-black p-10 transition-colors hover:bg-white/[0.03]">
              <span className="font-mono text-xs tracking-[0.35em] text-white/30">{reason.number}</span>
              <h3 className="mt-6 font-mono text-xl tracking-[0.18em] uppercase text-balance">{reason.title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-white/50 text-pretty">{reason.description}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
