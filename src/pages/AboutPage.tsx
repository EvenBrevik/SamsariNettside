import { BOOKING_URL } from '../config';
import { Reveal } from '../components/shared/Reveal';
import { usePageTitle } from '../hooks/usePageTitle';
import { useAppSettings } from '../providers/AppSettingsProvider';

const principleIcons = [
  // Connection / closeness to business
  <svg key="a" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
  </svg>,
  // Adoption / used in practice
  <svg key="b" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>,
  // Long-term value / growth
  <svg key="c" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
  </svg>,
];

export function AboutPage() {
  const { t, language } = useAppSettings();
  usePageTitle(t.nav.about);

  const no = language === 'no';

  const story = no
    ? {
        eyebrow: 'Om Samsari',
        statement: 'Fra idé og prosessforståelse til løsninger folk faktisk bruker.',
        what: 'Vi hjelper virksomheter med å automatisere prosesser, utvikle smarte arbeidsflater og få mer ut av Microsoft 365. Vi kombinerer rådgivning, produktforståelse og moderne utvikling for å skape løsninger som fungerer i praksis.',
        originTitle: 'Slik startet Samsari',
        origin: 'Vi så at mange virksomheter satt med gode verktøy, men manglet struktur, flyt og løsninger som faktisk passet hvordan de jobbet. Samsari ble til for å fylle det gapet — med en tilnærming som starter i forretningsbehovet og slutter i løsninger folk faktisk tar i bruk.',
      }
    : {
        eyebrow: 'About Samsari',
        statement: 'From ideas and process understanding to solutions people actually use.',
        what: 'We help businesses automate processes, develop smart workspaces and get more value from Microsoft 365. We combine advisory work, product thinking and modern development to create solutions that work in practice.',
        originTitle: 'How Samsari started',
        origin: 'We saw that many companies had strong tools but lacked the structure, flow and solutions that matched how they actually worked. Samsari was built to close that gap — with an approach that starts in business need and ends with solutions people genuinely adopt.',
      };

  const people = no
    ? [
        {
          name: 'Oliver Lysø',
          role: 'Daglig leder & Gründer',
          email: 'oliver@samsari.no',
          phone: '+47 407 00 457',
          bio: 'Drives av å finne enkle løsninger på komplekse utfordringer og sørger for at hvert prosjekt skaper reell verdi for kundene.',
          image: '/SkjorteSlips.png',
          imageBg: 'bg-[var(--color-surface-elevated)]',
          linkedin: 'https://www.linkedin.com/in/oliver-lyso/',
        },
        {
          name: 'Even Brevik',
          role: 'CTO & Gründer',
          email: 'even@samsari.no',
          phone: '+47 940 53 044',
          bio: 'Brenner for å bygge smarte, stabile løsninger og sørger for at teknologien alltid leverer som den skal.',
          image: '/EvenFullFaceTrans.png',
          imageBg: 'bg-[linear-gradient(160deg,rgba(17,132,205,0.15),rgba(137,88,254,0.10))]',
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
          imageBg: 'bg-[var(--color-surface-elevated)]',
          linkedin: 'https://www.linkedin.com/in/oliver-lyso/',
        },
        {
          name: 'Even Brevik',
          role: 'CTO & Founder',
          email: 'even@samsari.no',
          phone: '+47 940 53 044',
          bio: 'Passionate about building smart, stable solutions and making sure the technology always delivers as it should.',
          image: '/EvenFullFaceTrans.png',
          imageBg: 'bg-[linear-gradient(160deg,rgba(17,132,205,0.15),rgba(137,88,254,0.10))]',
          linkedin: 'https://www.linkedin.com/in/evenbrevik/',
        },
      ];

  return (
    <>
      {/* ── Intro ── */}
      <section className="relative overflow-hidden px-4 pb-16 pt-32 sm:px-6 sm:pt-36 lg:px-8 lg:pb-24 lg:pt-44">
        <div className="pointer-events-none absolute -right-32 top-0 h-96 w-96 rounded-full bg-[var(--color-accent-soft)] blur-[100px]" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,var(--color-primary),var(--color-accent),transparent)] opacity-40" />

        <div className="mx-auto max-w-7xl">
          <Reveal>
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-primary)]">
              {story.eyebrow}
            </p>
            <h1 className="max-w-3xl text-5xl font-semibold tracking-tight sm:text-6xl lg:text-[3.75rem] lg:leading-[1.06]">
              {t.aboutPage.title}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--color-text-muted)]">
              {t.aboutPage.subtitle}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Story ── */}
      <section className="px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">

            {/* Left: big statement + what */}
            <Reveal>
              <p className="text-2xl font-semibold leading-snug tracking-tight text-[var(--color-text)] sm:text-3xl">
                {story.statement}
              </p>
              <p className="mt-6 text-base leading-8 text-[var(--color-text-muted)]">{story.what}</p>
            </Reveal>

            {/* Right: origin */}
            <Reveal delay={80}>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--color-primary)]">
                {story.originTitle}
              </p>
              <p className="mt-5 text-base leading-8 text-[var(--color-text-muted)]">{story.origin}</p>

              {/* Quick facts */}
              <div className="mt-8 grid grid-cols-2 gap-4 border-t border-[var(--color-border)] pt-8">
                {[
                  { v: '2025', l: no ? 'Etablert' : 'Founded' },
                  { v: 'Kristiansund', l: no ? 'Lokasjon' : 'Location' },
                  { v: 'M365', l: no ? 'Plattform' : 'Platform' },
                  { v: no ? 'Norsk' : 'Norwegian', l: no ? 'Bakgrunn' : 'Background' },
                ].map((f) => (
                  <div key={f.l}>
                    <p className="text-lg font-semibold text-[var(--color-text)]">{f.v}</p>
                    <p className="text-xs text-[var(--color-text-subtle)]">{f.l}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Principles ── */}
      <section className="bg-[var(--color-surface-alt)] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="mb-12 max-w-2xl">
              <div className="mb-3 inline-flex items-center gap-3">
                <span className="h-px w-8 bg-[linear-gradient(90deg,var(--color-primary),var(--color-accent))]" />
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--color-primary)]">
                  {no ? 'Hva vi tror på' : 'What we believe'}
                </p>
              </div>
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                {no ? 'Prinsipper som styrer arbeidet vårt' : 'Principles that guide our work'}
              </h2>
            </div>
          </Reveal>

          <div className="grid gap-6 sm:grid-cols-3">
            {t.aboutPage.principles.map((p, i) => (
              <Reveal key={p.title} delay={i * 70}>
                <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-7">
                  <span className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--color-primary-soft)] text-[var(--color-primary)]">
                    {principleIcons[i]}
                  </span>
                  <h3 className="text-lg font-semibold">{p.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-[var(--color-text-muted)]">{p.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Team ── */}
      <section className="bg-[var(--color-dark)] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="mb-12">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-accent)]">
                {no ? 'Menneskene bak' : 'The people behind'}
              </p>
              <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                {no ? 'Et lite team med høye ambisjoner' : 'A small team with high ambitions'}
              </h2>
              <p className="mt-3 max-w-xl text-base leading-7 text-white/55">
                {t.aboutPage.subtitle}
              </p>
            </div>
          </Reveal>

          <div className="grid gap-5 sm:grid-cols-2">
            {people.map((person, i) => (
              <Reveal key={person.email} delay={i * 90}>
                <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
                  {/* Photo */}
                  <div className={`relative h-72 overflow-hidden sm:h-80 ${person.imageBg}`}>
                    <img
                      src={person.image}
                      alt={person.name}
                      className="h-full w-full object-cover object-top"
                    />
                  </div>

                  {/* Info */}
                  <div className="p-7">
                    <div className="mb-5 border-b border-white/10 pb-5">
                      <h3 className="text-2xl font-semibold text-white">{person.name}</h3>
                      <p className="mt-1 text-sm font-medium text-[var(--color-accent)]">{person.role}</p>
                    </div>

                    <p className="text-sm leading-7 text-white/60">{person.bio}</p>

                    <div className="mt-6 space-y-2.5">
                      <a
                        href={`mailto:${person.email}`}
                        className="flex items-center gap-2.5 text-sm text-white/55 transition hover:text-white"
                      >
                        <svg viewBox="0 0 16 16" fill="currentColor" className="h-3.5 w-3.5 shrink-0 text-white/30" aria-hidden="true">
                          <path d="M1.75 2h12.5c.966 0 1.75.784 1.75 1.75v8.5A1.75 1.75 0 0114.25 14H1.75A1.75 1.75 0 010 12.25v-8.5C0 2.784.784 2 1.75 2zM1.5 5.854V12.25c0 .138.112.25.25.25h12.5a.25.25 0 00.25-.25V5.854l-4.651 3.434a1.75 1.75 0 01-2.098 0L1.5 5.854zm1.232-2.1l5.338 3.941a.25.25 0 00.3 0l5.338-3.94H2.732z" />
                        </svg>
                        {person.email}
                      </a>
                      <a
                        href={`tel:${person.phone.replace(/\s+/g, '')}`}
                        className="flex items-center gap-2.5 text-sm text-white/55 transition hover:text-white"
                      >
                        <svg viewBox="0 0 16 16" fill="currentColor" className="h-3.5 w-3.5 shrink-0 text-white/30" aria-hidden="true">
                          <path d="M1.885.511a1.745 1.745 0 012.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 00.178.643l2.457 2.457a.678.678 0 00.644.178l2.189-.547a1.745 1.745 0 011.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 01-7.01-4.42 18.634 18.634 0 01-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z" />
                        </svg>
                        {person.phone}
                      </a>
                    </div>

                    <a
                      href={person.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-5 inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/8 px-4 py-2 text-sm font-semibold text-white/70 transition hover:bg-white/15 hover:text-white"
                    >
                      <svg viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4" aria-hidden="true">
                        <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 01.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z" />
                      </svg>
                      LinkedIn
                    </a>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

    </>
  );
}
