import { Section, SectionHeading } from "./section"
import { Reveal } from "@/components/reveal"

const steps = [
  {
    number: "01",
    title: "Build your vision",
    description: "Pick from several physician-focused website directions or request a completely custom desing.",
    label: "Direction",
  },
  {
    number: "02",
    title: "Send your practice details",
    description: "Services, photos, contact info, preferred tone. The more you share, the more we can tailor your site to your specific practice.",
    label: "Content",
  },
  {
    number: "03",
    title: "Review your draft site",
    description: "See a polished preview and request changes.",
    label: "Preview",
  },
   {
    number: "04",
    title: "Refine",
    description: "Reiterate rounds of edits on the design and content until your site is exactly how you want it.",
    label: "Edit",
  },
  {
    number: "05",
    title: "Launch",
    description: "Go live with a professional site built for patient trust.",
    label: "Live",
  },
]

export function ProcessSection() {
  return (
    <Section id="process">
      <Reveal>
        <SectionHeading eyebrow="Simple Start" title="Process" description="Make it feel easy." />
      </Reveal>
      <div className="mt-16 divide-y divide-white/10 border-t border-white/10">
        {steps.map((step, index) => (
          <Reveal key={step.number} delay={index * 80}>
            <article className="grid grid-cols-1 md:grid-cols-12 gap-4 py-8 group transition-colors hover:bg-white/[0.02] -mx-6 px-6">
              <div className="md:col-span-1 font-mono text-xs tracking-widest text-white/40">{step.number}</div>
              <div className="md:col-span-7">
                <h3 className="font-mono text-lg tracking-[0.2em] uppercase">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/50 text-pretty">{step.description}</p>
              </div>
              <div className="md:col-span-4 md:text-right">
                <span className="inline-block font-mono text-xs tracking-widest uppercase text-white/60 border border-white/15 rounded-full px-4 py-1">
                  {step.label}
                </span>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
