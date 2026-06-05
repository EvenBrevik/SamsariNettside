import { BOOKING_URL } from '../config';
import { ButtonLink } from '../components/shared/ButtonLink';
import { Reveal } from '../components/shared/Reveal';
import { useSEO } from '../hooks/useSEO';
import { useAppSettings } from '../providers/AppSettingsProvider';
import type { Language } from '../content/siteContent';

/* ── Product icons ── */
const productIcons = [
  // Prosjektportalen — folder/clipboard
  <svg key="portal" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z" />
  </svg>,
  // Forge Engine — lightning/bolt
  <svg key="forge" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
  </svg>,
  // Custom apps — code brackets
  <svg key="custom" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
  </svg>,
];

const customCapabilities = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
      </svg>
    ),
    no: { title: 'React-applikasjoner', desc: 'Vi bygger robuste webapplikasjoner fra bunnen av, med React, TypeScript og skybaserte tjenester som teknologisk fundament.' },
    en: { title: 'React applications', desc: 'We build robust web applications from the ground up, with React, TypeScript and cloud-based services as the technological foundation.' },
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
      </svg>
    ),
    no: { title: 'Power Apps', desc: 'Forretningsapper i Microsoft 365 som samler data, ansvar og prosesser i ett brukervennlig grensesnitt. Vi bruker Dataverse eller SharePoint som database, avhengig av behov og kompleksitet.' },
    en: { title: 'Power Apps', desc: 'Business apps in Microsoft 365 that bring together data, ownership and processes in one user-friendly interface. We use Dataverse or SharePoint as the database, depending on needs and complexity.' },
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
    no: { title: 'Automatiserte arbeidsflyter', desc: 'Power Automate og egenutviklede flyter som eliminerer manuelt arbeid i godkjenninger, onboarding og internservice.' },
    en: { title: 'Automated workflows', desc: 'Power Automate and custom flows that eliminate manual work in approvals, onboarding and internal services.' },
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
      </svg>
    ),
    no: { title: 'Systemer og integrasjoner', desc: 'Koblinger mellom Microsoft 365, egne systemer og tredjeparts API-er slik at data flyter dit det trengs.' },
    en: { title: 'Systems and integrations', desc: 'Connections between Microsoft 365, internal systems and third-party APIs so data flows where it is needed.' },
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" />
      </svg>
    ),
    no: { title: 'AI-drevne løsninger', desc: 'Copilot-integrasjoner, AI-assisterte arbeidsflyter og smarte søk som henter innsikt raskere.' },
    en: { title: 'AI-driven solutions', desc: 'Copilot integrations, AI-assisted workflows and smart search that surfaces insight faster.' },
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3" />
      </svg>
    ),
    no: { title: 'Microsoft 365-oppsett', desc: 'SharePoint-arkitektur, Teams-strukturer og Dataverse-modeller som gir virksomheten et ryddig digitalt fundament.' },
    en: { title: 'Microsoft 365 setup', desc: 'SharePoint architecture, Teams structures and Dataverse models that give the business a clean digital foundation.' },
  },
];

function ProjectPortalMock({ language }: { language: Language }) {
  const projects =
    language === 'no'
      ? [
          { name: 'Onboarding Q2', progress: 100, status: 'done' },
          { name: 'SharePoint-migrering', progress: 65, status: 'active' },
          { name: 'Power Platform-utrulling', progress: 20, status: 'pending' },
        ]
      : [
          { name: 'Onboarding Q2', progress: 100, status: 'done' },
          { name: 'SharePoint migration', progress: 65, status: 'active' },
          { name: 'Power Platform rollout', progress: 20, status: 'pending' },
        ];
  const stats =
    language === 'no'
      ? [{ v: '12', l: 'Prosjekter' }, { v: '48', l: 'Oppgaver' }, { v: '94%', l: 'Levert' }]
      : [{ v: '12', l: 'Projects' }, { v: '48', l: 'Tasks' }, { v: '94%', l: 'Delivered' }];

  return (
    <div className="overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-soft">
      <div className="flex items-center gap-2 border-b border-[var(--color-border)] bg-[var(--color-surface-elevated)] px-4 py-2.5">
        <div className="flex gap-1.5">
          <span className="h-2 w-2 rounded-full bg-red-400/40" />
          <span className="h-2 w-2 rounded-full bg-yellow-400/40" />
          <span className="h-2 w-2 rounded-full bg-green-400/40" />
        </div>
        <span className="ml-2 text-[10px] font-medium text-[var(--color-text-subtle)]">
          {language === 'no' ? 'Prosjektportal' : 'Project Portal'} — app.samsari.no
        </span>
        <span className="ml-auto text-[9px] font-semibold text-emerald-500">● Live</span>
      </div>
      <div className="space-y-2 p-4">
        {projects.map((p) => (
          <div key={p.name} className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-elevated)] px-3 py-2.5">
            <div className="flex items-center justify-between gap-2">
              <span className="text-[11px] font-medium text-[var(--color-text)]">{p.name}</span>
              <span className="text-[10px] tabular-nums text-[var(--color-text-subtle)]">{p.progress}%</span>
            </div>
            <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-[var(--color-border)]">
              <div
                className={`h-full rounded-full ${p.status === 'done' ? 'bg-emerald-400' : p.status === 'active' ? 'bg-[var(--color-primary)]' : 'bg-[var(--color-border-strong)]'}`}
                style={{ width: `${p.progress}%` }}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-3 divide-x divide-[var(--color-border)] border-t border-[var(--color-border)]">
        {stats.map((s) => (
          <div key={s.l} className="py-2.5 text-center">
            <p className="text-sm font-semibold text-[var(--color-primary)]">{s.v}</p>
            <p className="text-[9px] text-[var(--color-text-subtle)]">{s.l}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ForgeEngineMock({ language }: { language: Language }) {
  const no = language === 'no';
  const materials = no
    ? ['Stål S235', 'Stål S355', 'Aluminium 5754', 'Rustfritt 304']
    : ['Steel S235', 'Steel S355', 'Aluminium 5754', 'Stainless 304'];
  const thicknesses = ['3mm', '5mm', '8mm', '10mm'];
  const stats = no
    ? [{ v: '<30s', l: 'Svartid' }, { v: '100%', l: 'Automatisert' }, { v: 'DXF+STEP', l: 'Filformater' }, { v: '24/7', l: 'Tilgjengelig' }]
    : [{ v: '<30s', l: 'Response' }, { v: '100%', l: 'Automated' }, { v: 'DXF+STEP', l: 'Formats' }, { v: '24/7', l: 'Available' }];

  return (
    <div className="overflow-hidden rounded-xl border border-white/10 bg-[#0d1117]">
      {/* Chrome */}
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-2.5">
        <div className="flex gap-1.5">
          <span className="h-2 w-2 rounded-full bg-red-400/30" />
          <span className="h-2 w-2 rounded-full bg-yellow-400/30" />
          <span className="h-2 w-2 rounded-full bg-green-400/30" />
        </div>
        <span className="ml-2 text-[10px] font-medium text-white/50">Forge Engine — forgeengine.no</span>
        <span className="ml-auto text-[9px] font-semibold text-[var(--color-accent)]">
          {no ? 'Interaktiv demo' : 'Interactive demo'}
        </span>
      </div>

      <div className="space-y-3 p-4">
        {/* Uploaded file */}
        <div className="flex items-center gap-3 rounded-lg border border-white/8 bg-white/5 px-3 py-2.5">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4 shrink-0 text-white/40" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
          </svg>
          <div className="min-w-0 flex-1">
            <p className="text-[11px] font-semibold text-white/80">brakett v2.step</p>
            <p className="text-[9px] text-white/35">245 KB · STEP {no ? 'fil' : 'file'}</p>
          </div>
          <span className="shrink-0 rounded-full bg-emerald-500/15 px-2 py-0.5 text-[9px] font-semibold text-emerald-400">
            {no ? 'Lastet opp' : 'Uploaded'} ✓
          </span>
        </div>

        {/* Material selector */}
        <div>
          <p className="mb-1.5 text-[9px] font-semibold uppercase tracking-[0.15em] text-white/35">
            {no ? 'Materiale' : 'Material'}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {materials.map((m, i) => (
              <span
                key={m}
                className={`rounded-md px-2 py-1 text-[10px] font-medium transition ${
                  i === 0
                    ? 'bg-[var(--color-accent)]/25 text-[var(--color-accent)] ring-1 ring-[var(--color-accent)]/40'
                    : 'bg-white/6 text-white/40'
                }`}
              >
                {m}
              </span>
            ))}
          </div>
        </div>

        {/* Thickness selector */}
        <div>
          <p className="mb-1.5 text-[9px] font-semibold uppercase tracking-[0.15em] text-white/35">
            {no ? 'Tykkelse' : 'Thickness'}
          </p>
          <div className="flex gap-1.5">
            {thicknesses.map((t, i) => (
              <span
                key={t}
                className={`rounded-md px-2.5 py-1 text-[10px] font-medium transition ${
                  i === 1
                    ? 'bg-[var(--color-accent)]/25 text-[var(--color-accent)] ring-1 ring-[var(--color-accent)]/40'
                    : 'bg-white/6 text-white/40'
                }`}
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Price result */}
        <div className="rounded-lg border border-[var(--color-accent)]/20 bg-[var(--color-accent)]/8 px-4 py-3">
          <p className="text-[9px] font-semibold uppercase tracking-[0.15em] text-[var(--color-accent)]/70">
            {no ? 'Estimert pris' : 'Estimated price'}
          </p>
          <p className="mt-1 text-2xl font-semibold text-white">580 NOK</p>
          <p className="text-[9px] text-white/35">{no ? 'eks. mva · demoberegning' : 'excl. VAT · demo calculation'}</p>
        </div>
      </div>

      {/* Stats strip */}
      <div className="grid grid-cols-4 divide-x divide-white/8 border-t border-white/10">
        {stats.map((s) => (
          <div key={s.l} className="py-2.5 text-center">
            <p className="text-[10px] font-semibold text-emerald-400">{s.v}</p>
            <p className="text-[8px] text-white/30">{s.l}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ProductsPage() {
  const { t, language } = useAppSettings();
  useSEO({ title: language === 'no' ? 'Produkter' : 'Products', description: language === 'no' ? 'Ferdigbygde og skreddersydde applikasjoner fra Samsari, inkludert Prosjektportalen og Forge Engine.' : 'Ready-made and custom applications from Samsari, including the Project Portal and Forge Engine.', path: '/products' });

  const heroLabel = language === 'no' ? 'Produkter & løsninger' : 'Products & solutions';
  const catalogLabel = language === 'no' ? 'Produktkatalog' : 'Product catalog';
  const productsLabel = language === 'no' ? 'produkter' : 'products';
  const m365Label = language === 'no' ? 'Alle bygget på Microsoft 365' : 'All built on Microsoft 365';

  const featuredEyebrow = language === 'no' ? 'I bruk i dag' : 'Live today';
  const featuredTitle = language === 'no' ? 'To produkter du kan ta i bruk nå' : 'Two products you can use today';
  const featuredSub =
    language === 'no'
      ? 'Egne produkter Samsari har bygget og drifter — klar til å tas i bruk og tilpasses virksomheten din.'
      : 'Products Samsari has built and operates — ready to deploy and adapt to your business.';
  const openLabel = language === 'no' ? 'Åpne' : 'Open';
  const checkLabel = language === 'no' ? 'Hva du får' : 'What you get';

  const customEyebrow = language === 'no' ? 'Skreddersøm' : 'Custom development';
  const customTitle =
    language === 'no'
      ? 'Vi bygger det du trenger — enten det finnes eller ikke'
      : 'We build what you need — whether it exists or not';
  const customSub =
    language === 'no'
      ? 'Prosjektportalen og Forge Engine er to av løsningene vi har bygget. Vi leverer også skreddersydde applikasjoner, systemer og automatiseringer — fra enkle arbeidsflyter til komplekse integrasjonsprosjekter.'
      : 'The Project Portal and Forge Engine are two of the solutions we have built. We also deliver custom applications, systems and automations — from simple workflows to complex integration projects.';
  const andMoreLabel =
    language === 'no'
      ? '... og mange andre systemer, automatiseringer og løsninger tilpasset din virksomhet.'
      : '... and many other systems, automations and solutions tailored to your business.';

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
                {heroLabel}
              </span>
              <h1 className="mt-6 text-5xl font-semibold tracking-tight sm:text-6xl lg:text-[3.5rem] lg:leading-[1.08]">
                {t.productsPage.title}
              </h1>
              <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-[var(--color-text-muted)] lg:mx-0">
                {t.productsPage.subtitle}
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start">
                <ButtonLink to={BOOKING_URL}>{t.common.bookMeeting}</ButtonLink>
                <ButtonLink to="/services" variant="secondary">{t.common.viewAllServices}</ButtonLink>
              </div>
              <div className="mt-12 grid grid-cols-3 divide-x divide-[var(--color-border)] border-t border-[var(--color-border)] pt-10">
                {[
                  { v: '2', l: language === 'no' ? 'Live produkter' : 'Live products' },
                  { v: language === 'no' ? '100%' : '100%', l: language === 'no' ? 'Bygget på M365' : 'Built on M365' },
                  { v: language === 'no' ? '∞' : '∞', l: language === 'no' ? 'Skreddersydde løsninger' : 'Custom solutions' },
                ].map((s) => (
                  <div key={s.l} className="px-4 text-center first:pl-0 last:pr-0 lg:text-left">
                    <p className="text-2xl font-semibold text-[var(--color-primary)]">{s.v}</p>
                    <p className="mt-1 text-xs leading-5 text-[var(--color-text-subtle)]">{s.l}</p>
                  </div>
                ))}
              </div>
            </Reveal>

            {/* Right: product catalog panel */}
            <Reveal delay={140} className="w-full max-w-[420px] shrink-0 lg:w-[420px]">
              <div className="overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-premium">
                <div className="flex items-center gap-2 border-b border-[var(--color-border)] bg-[var(--color-surface-elevated)] px-5 py-3">
                  <div className="flex gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-red-400/40" />
                    <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/40" />
                    <span className="h-2.5 w-2.5 rounded-full bg-green-400/40" />
                  </div>
                  <span className="ml-3 text-xs font-medium text-[var(--color-text-subtle)]">{catalogLabel}</span>
                  <span className="ml-auto text-[10px] font-semibold text-[var(--color-primary)]">
                    {t.products.length} {productsLabel}
                  </span>
                </div>

                <div className="p-4 space-y-3">
                  {/* First 2 products: 2-col grid */}
                  <div className="grid grid-cols-2 gap-3">
                    {t.products.slice(0, 2).map((product, i) => (
                      <div
                        key={product.title}
                        className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)] p-4"
                      >
                        <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--color-primary-soft)] text-[var(--color-primary)]">
                          {productIcons[i]}
                        </div>
                        <p className="text-sm font-semibold leading-tight">{product.title}</p>
                        {product.url && (
                          <p className="mt-1 text-[10px] text-[var(--color-text-subtle)] truncate">
                            ↗ {product.url.replace('https://', '')}
                          </p>
                        )}
                        <span className="mt-2 inline-block rounded-full bg-[var(--color-primary-soft)] px-2 py-0.5 text-[9px] font-medium text-[var(--color-primary)]">
                          {product.badge}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Third product: full-width */}
                  <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)] p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[var(--color-accent-soft)] text-[var(--color-accent)]">
                        {productIcons[2]}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold">{t.products[2].title}</p>
                        <span className="inline-block rounded-full bg-[var(--color-accent-soft)] px-2 py-0.5 text-[9px] font-medium text-[var(--color-accent)]">
                          {t.products[2].badge}
                        </span>
                      </div>
                      <p className="ml-auto shrink-0 text-right text-[10px] text-[var(--color-text-subtle)]">
                        React · Power Apps
                        <br />+ {language === 'no' ? 'mye mer' : 'much more'}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-[var(--color-border)] bg-[var(--color-surface-elevated)] px-5 py-3">
                  <p className="text-[10px] text-[var(--color-text-subtle)]">{m365Label}</p>
                  <div className="flex gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-primary)]" />
                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Featured products ── */}
      <section className="px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto w-full max-w-7xl">
          <Reveal>
            <div className="mb-14 max-w-3xl">
              <div className="mb-4 inline-flex items-center gap-3">
                <span className="h-px w-8 bg-[linear-gradient(90deg,var(--color-primary),var(--color-accent))]" />
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--color-primary)]">{featuredEyebrow}</p>
              </div>
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">{featuredTitle}</h2>
              <p className="mt-4 text-base leading-8 text-[var(--color-text-muted)] sm:text-lg">{featuredSub}</p>
            </div>
          </Reveal>

          <div className="space-y-6">
            {/* Prosjektportalen */}
            <Reveal>
              <article className="relative overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-soft transition hover:shadow-premium">
                <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,var(--color-primary),var(--color-accent),transparent)] opacity-80" />
                <div className="grid gap-10 p-7 lg:grid-cols-[1fr_360px] lg:items-start lg:p-10">
                  {/* Text */}
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[var(--color-primary-soft)] text-[var(--color-primary)]">
                        {productIcons[0]}
                      </div>
                      <div>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--color-primary)]">
                          {t.products[0].badge}
                        </p>
                        <h3 className="text-2xl font-semibold tracking-tight sm:text-3xl">{t.products[0].title}</h3>
                      </div>
                      {t.products[0].url && (
                        <a
                          href={t.products[0].url}
                          target="_blank"
                          rel="noreferrer"
                          className="ml-auto inline-flex items-center gap-1.5 rounded-xl border border-[var(--color-border-strong)] bg-[var(--color-primary-soft)] px-3 py-1.5 text-xs font-semibold text-[var(--color-primary)] transition hover:bg-[var(--color-primary)] hover:text-white"
                        >
                          {openLabel}
                          <svg viewBox="0 0 16 16" fill="currentColor" className="h-3 w-3" aria-hidden="true">
                            <path d="M6.22 8.72a.75.75 0 001.06 1.06l5.22-5.22v1.69a.75.75 0 001.5 0v-3.5a.75.75 0 00-.75-.75h-3.5a.75.75 0 000 1.5h1.69L6.22 8.72z" />
                            <path d="M3.5 6.75c0-.69.56-1.25 1.25-1.25H7A.75.75 0 007 4H4.75A2.75 2.75 0 002 6.75v4.5A2.75 2.75 0 004.75 14h4.5A2.75 2.75 0 0012 11.25V9a.75.75 0 00-1.5 0v2.25c0 .69-.56 1.25-1.25 1.25h-4.5c-.69 0-1.25-.56-1.25-1.25v-4.5z" />
                          </svg>
                        </a>
                      )}
                    </div>

                    <p className="mt-5 text-base leading-7 text-[var(--color-text-muted)] sm:text-lg">
                      {t.products[0].description}
                    </p>

                    <div className="mt-6 rounded-xl border border-[var(--color-border-strong)] bg-[var(--color-primary-soft)] p-5">
                      <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--color-primary)]">
                        {checkLabel}
                      </p>
                      <ul className="space-y-2">
                        {t.products[0].highlights.map((h) => (
                          <li key={h} className="flex items-start gap-2.5 text-sm text-[var(--color-text-muted)]">
                            <svg viewBox="0 0 16 16" fill="currentColor" className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-primary)]" aria-hidden="true">
                              <path fillRule="evenodd" d="M12.416 3.376a.75.75 0 01.208 1.04l-5 7.5a.75.75 0 01-1.154.114l-3-3a.75.75 0 011.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 011.04-.207z" clipRule="evenodd" />
                            </svg>
                            {h}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Mock visual */}
                  <div className="lg:sticky lg:top-28">
                    <ProjectPortalMock language={language} />
                  </div>
                </div>
              </article>
            </Reveal>

            {/* Forge Engine */}
            <Reveal delay={60}>
              <article className="relative overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-dark)] shadow-soft transition hover:shadow-premium">
                <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,var(--color-accent),var(--color-primary),transparent)] opacity-80" />
                <div className="grid gap-10 p-7 lg:grid-cols-[1fr_360px] lg:items-start lg:p-10">
                  {/* Text */}
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[var(--color-accent)]/15 text-[var(--color-accent)]">
                        {productIcons[1]}
                      </div>
                      <div>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--color-accent)]">
                          {t.products[1].badge}
                        </p>
                        <h3 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">{t.products[1].title}</h3>
                      </div>
                      {t.products[1].url && (
                        <a
                          href={t.products[1].url}
                          target="_blank"
                          rel="noreferrer"
                          className="ml-auto inline-flex items-center gap-1.5 rounded-xl border border-[var(--color-accent)]/30 bg-[var(--color-accent)]/10 px-3 py-1.5 text-xs font-semibold text-[var(--color-accent)] transition hover:bg-[var(--color-accent)] hover:text-white"
                        >
                          {openLabel}
                          <svg viewBox="0 0 16 16" fill="currentColor" className="h-3 w-3" aria-hidden="true">
                            <path d="M6.22 8.72a.75.75 0 001.06 1.06l5.22-5.22v1.69a.75.75 0 001.5 0v-3.5a.75.75 0 00-.75-.75h-3.5a.75.75 0 000 1.5h1.69L6.22 8.72z" />
                            <path d="M3.5 6.75c0-.69.56-1.25 1.25-1.25H7A.75.75 0 007 4H4.75A2.75 2.75 0 002 6.75v4.5A2.75 2.75 0 004.75 14h4.5A2.75 2.75 0 0012 11.25V9a.75.75 0 00-1.5 0v2.25c0 .69-.56 1.25-1.25 1.25h-4.5c-.69 0-1.25-.56-1.25-1.25v-4.5z" />
                          </svg>
                        </a>
                      )}
                    </div>

                    <p className="mt-5 text-base leading-7 text-white/70 sm:text-lg">
                      {t.products[1].description}
                    </p>

                    <div className="mt-6 rounded-xl border border-[var(--color-accent)]/20 bg-[var(--color-accent)]/8 p-5">
                      <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--color-accent)]">
                        {checkLabel}
                      </p>
                      <ul className="space-y-2">
                        {t.products[1].highlights.map((h) => (
                          <li key={h} className="flex items-start gap-2.5 text-sm text-white/65">
                            <svg viewBox="0 0 16 16" fill="currentColor" className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-accent)]" aria-hidden="true">
                              <path fillRule="evenodd" d="M12.416 3.376a.75.75 0 01.208 1.04l-5 7.5a.75.75 0 01-1.154.114l-3-3a.75.75 0 011.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 011.04-.207z" clipRule="evenodd" />
                            </svg>
                            {h}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Mock visual */}
                  <div className="lg:sticky lg:top-28">
                    <ForgeEngineMock language={language} />
                  </div>
                </div>
              </article>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Custom + more (dark) ── */}
      <section className="bg-[var(--color-dark)] px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto w-full max-w-7xl">
          <Reveal>
            <div className="mb-14 max-w-3xl">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-accent)]">
                {customEyebrow}
              </p>
              <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">{customTitle}</h2>
              <p className="mt-4 text-base leading-8 text-white/60 sm:text-lg">{customSub}</p>
            </div>
          </Reveal>

          <div className="grid auto-rows-fr gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {customCapabilities.map((cap, i) => {
              const content = language === 'no' ? cap.no : cap.en;
              return (
                <Reveal key={content.title} delay={i * 50} className="h-full">
                  <div className="flex h-full flex-col rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:bg-white/[0.08]">
                    <span className="mb-4 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--color-accent)]/10 text-[var(--color-accent)]">
                      {cap.icon}
                    </span>
                    <h3 className="text-base font-semibold text-white">{content.title}</h3>
                    <p className="mt-2 flex-1 text-sm leading-6 text-white/60">{content.desc}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>

          <Reveal delay={300}>
            <p className="mt-10 text-center text-sm italic text-white/40">{andMoreLabel}</p>
          </Reveal>

          <Reveal delay={340} className="mt-10 flex justify-center">
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
