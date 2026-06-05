import { useEffect, useState } from 'react';
import { BOOKING_URL } from '../config';
import { ButtonLink } from '../components/shared/ButtonLink';
import { Reveal } from '../components/shared/Reveal';
import { useSEO } from '../hooks/useSEO';
import { useAppSettings } from '../providers/AppSettingsProvider';

/* ── Icons ── */
const heroIcons = [
  <svg key="apps" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
  </svg>,
  <svg key="automate" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
  </svg>,
  <svg key="ai" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" />
  </svg>,
  <svg key="m365" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3" />
  </svg>,
  <svg key="react" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
  </svg>,
];

const cardIcons = [
  <svg key="apps" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
  </svg>,
  <svg key="automate" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
  </svg>,
  <svg key="ai" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" />
  </svg>,
  <svg key="m365" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3" />
  </svg>,
  <svg key="react" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
  </svg>,
];

const processIcons = [
  <svg key="discover" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
  </svg>,
  <svg key="design" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
  </svg>,
  <svg key="build" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" />
  </svg>,
  <svg key="ship" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>,
];

const serviceTags = [
  ['Power Apps', 'Power Platform', 'M365'],
  ['Power Automate', 'Integrasjoner', 'API'],
  ['AI', 'Microsoft Copilot', 'M365'],
  ['Microsoft 365', 'Teams', 'SharePoint'],
  ['React', 'TypeScript', 'Web'],
];

export function ServicesPage() {
  const { t, language } = useAppSettings();
  useSEO({ title: language === 'no' ? 'Tjenester' : 'Services', description: language === 'no' ? 'Samsari tilbyr automatisering, Power Apps, AI og Microsoft 365-tjenester som hjelper virksomheter å jobbe smartere.' : 'Samsari offers automation, Power Apps, AI and Microsoft 365 services that help businesses work smarter.', path: '/services' });

  const [active, setActive] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setActive((n) => (n + 1) % 5), 2400);
    return () => clearInterval(id);
  }, []);

  const heroServices =
    language === 'no'
      ? [
          { title: 'Power Apps', tagline: 'Skreddersydde apper folk faktisk bruker', tags: ['Forretningsapper', 'M365'] },
          { title: 'Power Automate', tagline: 'Automatiser godkjenninger og arbeidsflyt', tags: ['Automasjon', 'Integrasjon'] },
          { title: 'AI & Copilot', tagline: 'Raskere innsikt og smartere kunnskapsarbeid', tags: ['AI', 'Copilot'] },
          { title: 'Microsoft 365', tagline: 'Mer verdi fra det dere allerede betaler for', tags: ['Teams', 'SharePoint'] },
          { title: 'React-applikasjoner', tagline: 'Skreddersydde webapper med React og TypeScript', tags: ['React', 'TypeScript'] },
        ]
      : [
          { title: 'Power Apps', tagline: 'Custom apps people actually use', tags: ['Business apps', 'M365'] },
          { title: 'Power Automate', tagline: 'Automate approvals and workflows', tags: ['Automation', 'Integration'] },
          { title: 'AI & Copilot', tagline: 'Faster insights, smarter knowledge work', tags: ['AI', 'Copilot'] },
          { title: 'Microsoft 365', tagline: 'More value from what you already pay for', tags: ['Teams', 'SharePoint'] },
          { title: 'React applications', tagline: 'Custom web apps with React and TypeScript', tags: ['React', 'TypeScript'] },
        ];

  const challengeLabel = language === 'no' ? 'Utfordringen' : 'The challenge';
  const valueLabel = language === 'no' ? 'Forretningsverdi' : 'Business value';
  const panelLabel = language === 'no' ? 'Tjenesteområder' : 'Service areas';
  const scrollLabel = language === 'no' ? 'Scroll for å utforske tjenestene' : 'Scroll to explore services';
  const activeLabel = language === 'no' ? 'Aktiv' : 'Active';
  const footerLabel = language === 'no' ? 'Fra innsikt til første løsning' : 'From insight to first solution';

  const cardsEyebrow = language === 'no' ? 'Tjenestene i detalj' : 'Services in detail';
  const cardsTitle =
    language === 'no'
      ? 'Fire tjenesteområder — én samlet leveranseevne'
      : 'Four service areas — one unified delivery capability';

  const processEyebrow = language === 'no' ? 'Leveransemetode' : 'How we work';
  const processTitle = language === 'no' ? 'Fra innsikt til resultater — uten unødvendige omveier' : 'From insight to results — without unnecessary detours';
  const processSub =
    language === 'no'
      ? 'Vi er direkte og pragmatiske. Ingen lange forprosjekter — bare den korteste veien til gevinst.'
      : 'We are direct and pragmatic. No lengthy pre-projects — just the shortest path to results.';

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative flex min-h-screen flex-col justify-center overflow-hidden px-4 py-24 sm:px-6 lg:px-8">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 premium-grid opacity-[0.12]" />
          <div className="absolute -left-32 top-1/4 h-[44rem] w-[44rem] rounded-full bg-[var(--color-primary-soft)] blur-[120px]" />
          <div className="absolute -right-24 bottom-1/4 h-[36rem] w-[36rem] rounded-full bg-[var(--color-accent-soft)] blur-[100px]" />
        </div>

        <div className="mx-auto w-full max-w-7xl">
          <div className="flex flex-col items-center gap-14 lg:flex-row lg:items-center lg:gap-20 xl:gap-28">

            {/* Left: copy */}
            <Reveal className="flex-1 text-center lg:text-left">
              <span className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border-strong)] bg-[var(--color-primary-soft)] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-primary)]">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-primary)]" aria-hidden="true" />
                {language === 'no' ? 'Hva vi leverer' : 'What we deliver'}
              </span>
              <h1 className="mt-6 text-5xl font-semibold tracking-tight sm:text-6xl lg:text-[3.5rem] lg:leading-[1.08]">
                {t.servicesPage.title}
              </h1>
              <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-[var(--color-text-muted)] lg:mx-0">
                {t.servicesPage.subtitle}
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start">
                <ButtonLink to={BOOKING_URL}>{t.common.bookMeeting}</ButtonLink>
                <ButtonLink to="/cases" variant="secondary">{t.common.viewAllCases}</ButtonLink>
              </div>
              <div className="mt-12 grid grid-cols-3 divide-x divide-[var(--color-border)] border-t border-[var(--color-border)] pt-10">
                {t.home.hero.stats.map((stat) => (
                  <div key={stat.label} className="px-4 text-center first:pl-0 last:pr-0 lg:text-left">
                    <p className="text-2xl font-semibold text-[var(--color-primary)]">{stat.value}</p>
                    <p className="mt-1 text-xs leading-5 text-[var(--color-text-subtle)]">{stat.label}</p>
                  </div>
                ))}
              </div>
            </Reveal>

            {/* Right: animated service panel */}
            <Reveal delay={140} className="w-full max-w-[420px] shrink-0 lg:w-[420px]">
              <div className="overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-premium">
                <div className="flex items-center gap-2 border-b border-[var(--color-border)] bg-[var(--color-surface-elevated)] px-5 py-3">
                  <div className="flex gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-red-400/40" />
                    <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/40" />
                    <span className="h-2.5 w-2.5 rounded-full bg-green-400/40" />
                  </div>
                  <span className="ml-3 text-xs font-medium text-[var(--color-text-subtle)]">{panelLabel}</span>
                  <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-md bg-[var(--color-primary-soft)] text-[9px] font-bold text-[var(--color-primary)]">5</span>
                </div>
                <div className="divide-y divide-[var(--color-border)]">
                  {heroServices.map((svc, i) => {
                    const isActive = i === active;
                    return (
                      <div
                        key={svc.title}
                        className={`flex items-start gap-4 px-5 py-4 transition-colors duration-500 ${isActive ? 'bg-[var(--color-primary-soft)]' : 'bg-transparent'}`}
                      >
                        <span className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-colors duration-500 ${isActive ? 'bg-[var(--color-primary)] text-white' : 'bg-[var(--color-surface-elevated)] text-[var(--color-text-subtle)]'}`}>
                          {heroIcons[i]}
                        </span>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between gap-2">
                            <p className={`text-sm font-semibold transition-colors duration-500 ${isActive ? 'text-[var(--color-primary)]' : 'text-[var(--color-text)]'}`}>
                              {svc.title}
                            </p>
                            {isActive && (
                              <span className="shrink-0 rounded-full bg-[var(--color-primary)] px-2 py-0.5 text-[10px] font-semibold text-white">
                                {activeLabel}
                              </span>
                            )}
                          </div>
                          <p className="mt-0.5 text-xs leading-4 text-[var(--color-text-subtle)]">{svc.tagline}</p>
                          <div className="mt-2 flex flex-wrap gap-1">
                            {svc.tags.map((tag) => (
                              <span key={tag} className="rounded-full bg-[var(--color-surface-elevated)] px-2 py-0.5 text-[10px] font-medium text-[var(--color-text-subtle)]">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="flex items-center justify-between border-t border-[var(--color-border)] bg-[var(--color-surface-elevated)] px-5 py-3">
                  <p className="text-xs text-[var(--color-text-subtle)]">{footerLabel}</p>
                  <p className="text-sm font-semibold text-[var(--color-primary)]">4 {language === 'no' ? 'uker' : 'weeks'}</p>
                </div>
              </div>
              <p className="mt-4 text-center text-[11px] text-[var(--color-text-subtle)]">{scrollLabel} ↓</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Service cards ── */}
      <section className="px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto w-full max-w-7xl">

          {/* Section header */}
          <Reveal>
            <div className="mb-14 max-w-3xl">
              <div className="mb-4 inline-flex items-center gap-3">
                <span className="h-px w-8 bg-[linear-gradient(90deg,var(--color-primary),var(--color-accent))]" />
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--color-primary)]">{cardsEyebrow}</p>
              </div>
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">{cardsTitle}</h2>
              <p className="mt-4 text-base leading-8 text-[var(--color-text-muted)] sm:text-lg">{t.servicesPage.intro}</p>
            </div>
          </Reveal>

          {/* Cards */}
          <div className="space-y-5">
            {t.services.map((service, index) => (
              <Reveal key={service.title} delay={index * 60}>
                <article className="relative overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-soft transition hover:shadow-premium">
                  {/* Gradient top accent */}
                  <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,var(--color-primary),var(--color-accent),transparent)] opacity-80" />

                  <div className="p-7 lg:p-9">
                    {/* Card header row */}
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[var(--color-primary-soft)] text-[var(--color-primary)]">
                          {cardIcons[index]}
                        </span>
                        <div>
                          <p className="text-xs font-semibold tabular-nums text-[var(--color-text-subtle)]">
                            {String(index + 1).padStart(2, '0')}
                          </p>
                          <h3 className="text-xl font-semibold tracking-tight sm:text-2xl">{service.title}</h3>
                        </div>
                      </div>

                      {/* Tech tags */}
                      <div className="flex flex-wrap items-center gap-2">
                        {serviceTags[index].map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full border border-[var(--color-border)] bg-[var(--color-surface-elevated)] px-3 py-1 text-xs font-medium text-[var(--color-text-subtle)]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Summary */}
                    <p className="mt-6 text-base leading-7 text-[var(--color-text-muted)] sm:text-lg lg:max-w-3xl">
                      {service.summary}
                    </p>

                    {/* Problem + Value callouts */}
                    <div className="mt-6 grid gap-4 sm:grid-cols-2">
                      <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)] p-5">
                        <p className="mb-2.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--color-text-subtle)]">
                          {challengeLabel}
                        </p>
                        <p className="text-sm leading-6 text-[var(--color-text-muted)]">{service.problem}</p>
                      </div>
                      <div className="rounded-xl border border-[var(--color-border-strong)] bg-[var(--color-primary-soft)] p-5">
                        <p className="mb-2.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--color-primary)]">
                          {valueLabel}
                        </p>
                        <p className="text-sm leading-6 text-[var(--color-text-muted)]">{service.value}</p>
                      </div>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── How we work — dark section ── */}
      <section className="bg-[var(--color-dark)] px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto w-full max-w-7xl">
          <Reveal>
            <div className="mb-14 max-w-3xl">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-accent)]">
                {processEyebrow}
              </p>
              <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">{processTitle}</h2>
              <p className="mt-4 text-base leading-8 text-white/60 sm:text-lg">{processSub}</p>
            </div>
          </Reveal>

          <div className="grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {t.home.process.steps.map((step, index) => (
              <Reveal key={step.step} delay={index * 70}>
                <div className="flex h-full flex-col bg-[var(--color-dark)] p-7 lg:p-8">
                  <div className="mb-5 flex items-center justify-between">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/6 text-white/70">
                      {processIcons[index]}
                    </span>
                    <span className="text-3xl font-semibold tabular-nums text-white/20">{step.step}</span>
                  </div>
                  <h3 className="text-base font-semibold text-white">{step.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-6 text-white/60">{step.description}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={280} className="mt-10 flex justify-center">
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-11 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,var(--color-button-primary),var(--color-button-accent))] px-6 py-3 text-sm font-semibold text-white shadow-glow transition hover:-translate-y-0.5"
            >
              {t.common.bookMeeting}
            </a>
          </Reveal>
        </div>
      </section>

    </>
  );
}
