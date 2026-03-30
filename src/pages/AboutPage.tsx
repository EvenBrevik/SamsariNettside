import { CTASection } from '../components/shared/CTASection';
import { PageHero } from '../components/shared/PageHero';
import { Reveal } from '../components/shared/Reveal';
import { Section } from '../components/shared/Section';
import { useAppSettings } from '../providers/AppSettingsProvider';

export function AboutPage() {
  const { t, language } = useAppSettings();

  const pageContent =
    language === 'no'
      ? {
          eyebrow: 'Om Samsari',
          introTitle: 'Vi bygger løsninger som gjør arbeid enklere',
          introBody:
            'Samsari hjelper virksomheter med å automatisere prosesser, utvikle smarte arbeidsflater og få mer ut av Microsoft 365. Vi kombinerer rådgivning, produktforståelse og moderne utvikling for å skape løsninger som fungerer i praksis.',
          foundedTitle: 'Hvordan vi startet',
          foundedBody:
            'Samsari ble startet med et ønske om å gjøre teknologi mer nyttig i arbeidshverdagen. Vi så at mange virksomheter satt med gode verktøy, men manglet struktur, flyt og løsninger som faktisk passet hvordan de jobbet.',
          foundedExtra:
            'Derfor bygger vi både ferdige løsninger og skreddersydde applikasjoner, slik at kundene våre kan få rask verdi uten å ofre fleksibilitet.',
          cards: [
            {
              title: 'Hva vi gjør',
              body: 'Vi automatiserer arbeidsprosesser, bygger produktiserte løsninger og utvikler tilpassede applikasjoner med moderne teknologi.',
            },
            {
              title: 'Hvordan vi jobber',
              body: 'Vi starter med forretningsbehovet, finner den enkleste veien til verdi og bygger løsninger som er enkle å ta i bruk og videreutvikle.',
            },
            {
              title: 'Hva som er viktig for oss',
              body: 'Teknologi skal skape reell effekt. Derfor er vi opptatt av tydelig verdi, robuste løsninger og tett samarbeid med kundene våre.',
            },
          ],
          teamEyebrow: 'Møt menneskene i Samsari',
          teamTitle: 'Et lite team med høye ambisjoner',
          teamSubtitle:
            'Vi kombinerer forretningsforståelse, produktutvikling og teknisk gjennomføring for å bygge løsninger som faktisk gjør en forskjell.',
          linkedIn: 'LinkedIn',
        }
      : {
          eyebrow: 'About Samsari',
          introTitle: 'We build solutions that make work simpler',
          introBody:
            'Samsari helps businesses automate processes, develop smart workspaces and get more value from Microsoft 365. We combine advisory work, product thinking and modern development to create solutions that work in the real world.',
          foundedTitle: 'How we started',
          foundedBody:
            'Samsari was founded with a desire to make technology more useful in day-to-day work. We saw that many companies already had strong tools, but lacked structure, flow and solutions that truly matched how they worked.',
          foundedExtra:
            'That is why we build both ready-made solutions and tailored applications, so our customers can get fast value without sacrificing flexibility.',
          cards: [
            {
              title: 'What we do',
              body: 'We automate business processes, build productized solutions and develop tailored applications using modern technology.',
            },
            {
              title: 'How we work',
              body: 'We start with the business need, find the simplest path to value and build solutions that are easy to adopt and improve.',
            },
            {
              title: 'What matters to us',
              body: 'Technology should create real impact. That is why we focus on clear value, robust solutions and close collaboration with our customers.',
            },
          ],
          teamEyebrow: 'Meet the people behind Samsari',
          teamTitle: 'A small team with high ambitions',
          teamSubtitle:
            'We combine business understanding, product development and technical execution to build solutions that make a real difference.',
          linkedIn: 'LinkedIn',
        };

  const people =
    language === 'no'
      ? [
          {
            name: 'Oliver Lysø',
            role: 'Daglig leder & Gründer',
            email: 'oliver@samsari.no',
            phone: '+47 407 00 457',
            bio: 'Drives av å finne enkle løsninger på komplekse utfordringer og sørger for at hvert prosjekt skaper reell verdi for kundene.',
            image: '/SkjorteSlips.png',
            linkedin: 'https://www.linkedin.com/in/oliver-lyso/',
          },
          {
            name: 'Even Brevik',
            role: 'CTO & Gründer',
            email: 'even@samsari.no',
            phone: '+47 940 53 044',
            bio: 'Brenner for å bygge smarte, stabile løsninger og sørger for at teknologien alltid leverer som den skal.',
            image: '/EvenFullFaceTrans.png',
            linkedin: 'https://www.linkedin.com/in/evenbrevik/',
          },
        ]
      : [
          {
            name: 'Oliver Lysø',
            role: 'CEO & Founder',
            email: 'oliver@samsari.no',
            phone: '+47 407 00 457',
            bio: 'Driven by finding simple solutions to complex challenges and making sure every project creates real value for customers.',
            image: '/SkjorteSlips.png',
            linkedin: 'https://www.linkedin.com/in/oliver-lyso/',
          },
          {
            name: 'Even Brevik',
            role: 'CTO & Founder',
            email: 'even@samsari.no',
            phone: '+47 940 53 044',
            bio: 'Passionate about building smart, stable solutions and making sure the technology always delivers as it should.',
            image: '/EvenFullFaceTrans.png',
            linkedin: 'https://www.linkedin.com/in/evenbrevik/',
          },
        ];

  return (
    <>
      <PageHero
        eyebrow={pageContent.eyebrow}
        title={t.aboutPage.title}
        subtitle={t.aboutPage.subtitle}
        intro={t.aboutPage.intro}
      />

      <Section contentClassName="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <Reveal className="rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-surface)] p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--color-primary)]">
            {pageContent.introTitle}
          </p>
          <p className="mt-5 text-3xl font-semibold tracking-tight">
            {language === 'no'
              ? 'Fra idé og prosessforståelse til løsninger som brukes i hverdagen.'
              : 'From ideas and process understanding to solutions people actually use every day.'}
          </p>
          <p className="mt-5 text-base leading-8 text-[var(--color-text-muted)]">{pageContent.introBody}</p>
        </Reveal>

        <Reveal delay={80} className="rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-surface)] p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--color-primary)]">
            {pageContent.foundedTitle}
          </p>
          <p className="mt-5 text-base leading-8 text-[var(--color-text-muted)]">{pageContent.foundedBody}</p>
          <p className="mt-4 text-base leading-8 text-[var(--color-text-muted)]">{pageContent.foundedExtra}</p>
        </Reveal>
      </Section>

      <Section contentClassName="grid gap-6 lg:grid-cols-3">
        {pageContent.cards.map((card, index) => (
          <Reveal
            key={card.title}
            delay={index * 80}
            className="rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-surface)] p-6"
          >
            <h2 className="text-xl font-semibold">{card.title}</h2>
            <p className="mt-3 text-sm leading-7 text-[var(--color-text-muted)]">{card.body}</p>
          </Reveal>
        ))}
      </Section>

      <Section
        eyebrow={pageContent.teamEyebrow}
        title={pageContent.teamTitle}
        subtitle={pageContent.teamSubtitle}
        contentClassName="grid gap-6 lg:grid-cols-2"
      >
        {people.map((person, index) => (
          <Reveal
            key={person.email}
            delay={index * 90}
            className="overflow-hidden rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-surface)]"
          >
            <div className="border-b border-[var(--color-border)] bg-[var(--color-surface-elevated)] p-6">
              <div className="flex items-center gap-5">
                <div className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-[1.5rem] bg-[var(--color-surface)] sm:h-32 sm:w-32">
                  <img src={person.image} alt={person.name} className="h-full w-full object-cover object-top" />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold">{person.name}</h3>
                  <p className="mt-1 text-sm font-medium text-[var(--color-primary)]">{person.role}</p>
                </div>
              </div>
            </div>

            <div className="p-6">
              <p className="text-sm leading-7 text-[var(--color-text-muted)]">{person.bio}</p>

              <div className="mt-6 space-y-3 text-sm">
                <a href={`mailto:${person.email}`} className="block text-[var(--color-text)] transition hover:text-[var(--color-primary)]">
                  {person.email}
                </a>
                <a href={`tel:${person.phone.replace(/\s+/g, '')}`} className="block text-[var(--color-text)] transition hover:text-[var(--color-primary)]">
                  {person.phone}
                </a>
                <a
                  href={person.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex text-sm font-semibold text-[var(--color-primary)] transition hover:text-[var(--color-accent)]"
                >
                  {pageContent.linkedIn}
                </a>
              </div>
            </div>
          </Reveal>
        ))}
      </Section>

      <CTASection title={t.home.finalCta.title} description={t.home.finalCta.description} cta={t.common.bookMeeting} />
    </>
  );
}
