import { Section, SectionHeading } from "./section"
import { Reveal } from "@/components/reveal"

const paragraphs = [
  "I’m a medical student with a strong interest in the intersection of medicine, technology, design, and patient communication. I build modern websites for physicians and healthcare practices that want their online presence to reflect the quality of care they provide.",
  "I started this because I noticed that many excellent physicians have websites that do not match the level of professionalism, trust, and expertise they bring to their patients every day.",
  "A physician’s website is often one of the first places a patient goes before making a decision. It can shape whether they feel confident reaching out, whether they understand the practice, and whether they see the physician as credible and approachable.",
  "Because I am training in medicine, I understand that healthcare websites need to feel different from ordinary business websites. They need to be clear, trustworthy, professional, easy to navigate, and respectful of the patient experience.",
  "Unlike a generic web designer, I approach each project with a medical perspective. I understand the importance of credibility, patient trust, clean communication, and professional presentation in healthcare.",
  "I focus on creating websites that do more than look good. They should help patients quickly understand who you are, what you offer, and why they can feel confident contacting your practice.",
  "My goal is simple: to help physicians build websites that look modern, communicate clearly, and make it easier for patients to take the next step.",
]

export function AboutSection() {
  return (
    <Section id="about">
      <Reveal>
        <SectionHeading
          eyebrow="About Me"
          title="A medical student building better websites for physicians."
        />
      </Reveal>

      <div className="mt-16 max-w-3xl">
        {paragraphs.map((paragraph, index) => (
          <Reveal key={index} delay={index * 80} rootMargin="0px 0px 15% 0px" threshold={0}>
            <p className="mt-6 text-pretty text-base md:text-lg leading-relaxed text-white/60 first:mt-0">
              {paragraph}
            </p>
          </Reveal>
        ))}

        <Reveal delay={paragraphs.length * 80} rootMargin="0px 0px 15% 0px" threshold={0}>
          <p className="mt-10 text-balance font-mono text-lg md:text-xl uppercase tracking-[0.18em] text-white">
            Your website should reflect the quality of care you provide.
          </p>
        </Reveal>
      </div>
    </Section>
  )
}
