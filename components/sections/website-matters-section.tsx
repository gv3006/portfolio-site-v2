import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Section, SectionHeading } from "./section"
import { Reveal } from "@/components/reveal"

function Cite({ children }: { children: string }) {
  return (
    <span
      aria-label={`Reference ${children}`}
      className="mx-1 inline-flex translate-y-[-0.12em] items-center rounded-full border border-border bg-foreground/[0.06] px-2 py-0.5 font-mono text-[0.6rem] leading-none text-foreground/55 transition-colors duration-200 hover:border-foreground/25 hover:bg-foreground/[0.1] hover:text-foreground/75"
    >
      {children}
    </span>
  )
}

const reasons = [
  {
    number: "01",
    title: "Patient Acquisition",
    description: (
      <>
        Physicians’ online self-disclosure is associated with patient acquisition. In a cross-sectional study of 1,798
        physicians, both the breadth of information shared, including clinical performance, academic experience, and
        social reputation, and the depth of expertise coverage were positively associated with patient visits.
        <Cite>1</Cite> Other online profile features, including services offered, scientific publications, and
        professional avatars, also influence physician selection behavior.<Cite>2</Cite>
      </>
    ),
  },
  {
    number: "02",
    title: "First Impressions and Patient Decisions",
    description: (
      <>
        Prospective patients often form impressions of a physician before ever meeting in person, largely through
        information found online.<Cite>3-5</Cite> Many patients seek health information online, and online reviews are
        frequently used alongside recommendations from family or friends.<Cite>4-5</Cite> A well-maintained website
        helps communicate expertise, care philosophy, services offered, insurance participation, office hours, and
        contact information.<Cite>6</Cite>
      </>
    ),
  },
  {
    number: "03",
    title: "Reputation Management",
    description: (
      <>
        Online physician ratings are an important part of how patients evaluate and compare physicians, functioning as
        part of a physician’s “digital CV.”<Cite>7</Cite> Positive ratings are shaped by the patient experience,
        including physician friendliness, communication, and practice cleanliness.<Cite>8</Cite> A well-designed
        website can support this experience by making key information easier to find, including services, office hours,
        contact information, insurance participation, patient education resources, online scheduling, secure messaging,
        and bill payment.<Cite>6</Cite> By reducing friction before and after the visit, a website can strengthen the
        overall patient experience that contributes to online reputation.
      </>
    ),
  },
  {
    number: "04",
    title: "Practice Differentiation",
    description: (
      <>
        A physician website helps a private practice distinguish itself in a competitive market by communicating what
        sets the practice apart.<Cite>3</Cite> Beyond basic contact information, it can highlight subspecialty expertise,
        services offered, care philosophy, academic background, patient experience, and professional reputation.
        <Cite>1-3,6</Cite> By presenting a clear and credible digital identity, a website can help patients understand
        why one physician or practice may better fit their needs than another.<Cite>1-3</Cite>
      </>
    ),
  },
]

const references = [
  {
    number: "1",
    title:
      "Liu Q, Yin P, Fan J. The Relationship Between Physician Self-Disclosure and Patient Acquisition in Digital Health Markets: Cross-Sectional Study. Journal of Medical Internet Research. 2026.",
  },
  {
    number: "2",
    title:
      "Qin M, Zhu W, You C, Li S, Qiu S. Patient’s Behavior of Selection Physician in Online Health Communities: Based on an Elaboration Likelihood Model. Frontiers in Public Health. 2022.",
  },
  {
    number: "3",
    title:
      "Kim L, Tylor DA, Chang CY. Marketing Your Practice: Setting Yourself Apart in a Competitive Market, Online Reputation Building, and Managing Patient Experience/Satisfaction. Otolaryngologic Clinics of North America. 2022.",
  },
  {
    number: "4",
    title:
      "Forgie EME, Lai H, Cao B, et al. Social Media and the Transformation of the Physician-Patient Relationship: Viewpoint. Journal of Medical Internet Research. 2021.",
  },
  {
    number: "5",
    title:
      "Kim JK, Tawk K, Kim JM, et al. Online ratings and narrative comments of American Head and Neck Society surgeons. Head & Neck. 2024.",
  },
  {
    number: "6",
    title:
      "Recupero P, Fisher CE. Resource Document on Telepsychiatry and Related Technologies in Clinical Psychiatry. American Psychiatric Association. 2014.",
  },
  {
    number: "7",
    title:
      "Committee on Patient Safety and Quality Improvement. Professional Use of Digital and Social Media: ACOG Committee Opinion, Number 791. Obstetrics and Gynecology. 2019.",
  },
  {
    number: "8",
    title:
      "Bidmon S, Elshiewy O, Terlutter R, Boztug Y. What Patients Value in Physicians: Analyzing Drivers of Patient Satisfaction Using Physician-Rating Website Data. Journal of Medical Internet Research. 2020.",
  },
]

export function WebsiteMattersSection() {
  return (
    <Section id="why-it-matters">
      <Reveal>
        <SectionHeading
          eyebrow="Evidence-Based Digital Presence"
          title="Why Your Website Matters"
          description="Websites influence private practice through four key mechanisms: patient acquisition, first impressions and patient decisions, reputation management, and practice differentiation in an increasingly competitive digital marketplace."
        />
      </Reveal>

      <div className="mt-16 grid grid-cols-1 gap-4 md:grid-cols-2">
        {reasons.map((reason, index) => (
          <Reveal
            key={reason.number}
            className="h-full"
            delay={index * 80}
            rootMargin="0px 0px 15% 0px"
            threshold={0}
          >
            <article className="group relative h-full overflow-hidden rounded-3xl border border-border bg-card p-10 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-foreground/20 hover:bg-secondary focus-within:border-foreground/20 focus-within:bg-secondary">
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(0,0,0,0.06),transparent_34%)]" />
              </div>

              <div className="relative z-10">
                <span className="font-mono text-xs tracking-[0.35em] text-foreground/30">{reason.number}</span>

                <h3 className="mt-6 text-balance font-mono text-xl uppercase tracking-[0.18em] text-foreground">
                  {reason.title}
                </h3>

                <p className="mt-4 text-pretty text-sm leading-relaxed text-foreground/50">{reason.description}</p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal delay={320} rootMargin="0px 0px 15% 0px" threshold={0}>
        <div className="mt-10 overflow-hidden rounded-3xl border border-border bg-card">
          <Accordion type="single" collapsible>
            <AccordionItem value="references" className="border-b-0">
              <AccordionTrigger className="px-6 py-5 hover:bg-foreground/[0.03] hover:no-underline focus-visible:ring-foreground/30 md:px-8 [&>svg]:text-foreground/40">
                <span className="font-mono text-xs uppercase tracking-[0.35em] text-foreground/35">References</span>
              </AccordionTrigger>

              <AccordionContent className="pb-0">
                <div className="divide-y divide-border border-t border-border">
                  {references.map((reference) => (
                    <article key={reference.number} id={`ref-${reference.number}`} className="px-6 py-5 md:px-8">
                      <div className="grid gap-3 text-left md:grid-cols-[3rem_1fr]">
                        <span className="font-mono text-xs tracking-[0.25em] text-foreground/30">
                          [{reference.number}]
                        </span>

                        <p className="text-xs leading-relaxed text-foreground/45 md:text-sm">{reference.title}</p>
                      </div>
                    </article>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </Reveal>
    </Section>
  )
}
