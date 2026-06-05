import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BOOKING_URL } from '../config';
import { CTASection } from '../components/shared/CTASection';
import { ButtonLink } from '../components/shared/ButtonLink';
import { Reveal } from '../components/shared/Reveal';
import { Section } from '../components/shared/Section';
import { usePageTitle } from '../hooks/usePageTitle';
import { useSanityCases } from '../hooks/useSanityCases';
import { useSanityPosts } from '../hooks/useSanityPosts';
import { formatPostDate, getExcerpt, getTitle } from '../lib/blogUtils';
import { getCaseSlug, getMetrics, getResult, getSector } from '../lib/caseUtils';
import { urlFor } from '../lib/sanityImage';
import { useAppSettings } from '../providers/AppSettingsProvider';
import type { Language } from '../content/siteContent';

function HeroVisual({ language }: { language: Language }) {
  const steps =
    language === 'no'
      ? [
          { label: 'Skjemainnlevering mottatt', status: 'done' },
          { label: 'Automatisk validering', status: 'done' },
          { label: 'Leder varslet i Teams', status: 'active' },
          { label: 'SharePoint oppdatert', status: 'pending' },
          { label: 'Rapport generert', status: 'pending' },
        ]
      : [
          { label: 'Form submission received', status: 'done' },
          { label: 'Automatic validation', status: 'done' },
          { label: 'Manager notified in Teams', status: 'active' },
          { label: 'SharePoint updated', status: 'pending' },
          { label: 'Report generated', status: 'pending' },
        ];

  const metrics =
    language === 'no'
      ? [
          { v: '247', l: 'Prosesser i dag' },
          { v: '34 min', l: 'Spart per sak' },
          { v: '100%', l: 'Gjennomført' },
        ]
      : [
          { v: '247', l: 'Processes today' },
          { v: '34 min', l: 'Saved per case' },
          { v: '100%', l: 'Completed' },
        ];

  const activeLabel = language === 'no' ? 'Aktiv' : 'Active';
  const flowLabel = language === 'no' ? 'Automatisert arbeidsflyt' : 'Automated workflow';

  return (
    <div className="relative rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 shadow-premium">
      {/* Window chrome */}
      <div className="mb-4 flex items-center gap-2 border-b border-[var(--color-border)] pb-3">
        <div className="flex gap-1.5">
          <div className="h-2.5 w-2.5 rounded-full bg-red-400/40" />
          <div className="h-2.5 w-2.5 rounded-full bg-yellow-400/40" />
          <div className="h-2.5 w-2.5 rounded-full bg-green-400/40" />
        </div>
        <div className="mx-2 h-5 flex-1 rounded-md bg-[var(--color-surface-elevated)]" />
        <div className="h-5 w-5 rounded bg-[var(--color-primary)]/20" />
      </div>

      <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-[var(--color-text-subtle)]">
        {flowLabel}
      </p>

      <div className="space-y-2">
        {steps.map((step) => (
          <div
            key={step.label}
            className={`flex items-center gap-3 rounded-xl px-4 py-3 ${
              step.status === 'active'
                ? 'border border-[var(--color-primary)]/30 bg-[var(--color-primary-soft)]'
                : 'bg-[var(--color-surface-elevated)]'
            }`}
          >
            <div
              className={`h-2 w-2 shrink-0 rounded-full ${
                step.status === 'done'
                  ? 'bg-emerald-400'
                  : step.status === 'active'
                    ? 'animate-pulse bg-[var(--color-primary)]'
                    : 'bg-[var(--color-border)]'
              }`}
            />
            <span
              className={`text-sm ${
                step.status === 'pending'
                  ? 'text-[var(--color-text-subtle)]'
                  : 'font-medium text-[var(--color-text)]'
              }`}
            >
              {step.label}
            </span>
            {step.status === 'done' && (
              <svg
                className="ml-auto h-4 w-4 shrink-0 text-emerald-500"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                  clipRule="evenodd"
                />
              </svg>
            )}
            {step.status === 'active' && (
              <span className="ml-auto shrink-0 text-xs font-semibold text-[var(--color-primary)]">
                {activeLabel}
              </span>
            )}
          </div>
        ))}
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2 border-t border-[var(--color-border)] pt-4">
        {metrics.map((m) => (
          <div key={m.l} className="rounded-xl bg-[var(--color-surface-elevated)] px-3 py-2.5 text-center">
            <p className="text-base font-semibold text-[var(--color-primary)]">{m.v}</p>
            <p className="mt-0.5 text-[10px] leading-4 text-[var(--color-text-subtle)]">{m.l}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function HomePage() {
  const { t, language } = useAppSettings();
  usePageTitle(language === 'no' ? 'Hjem' : 'Home');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const { posts: sanityPosts, loading: postsLoading } = useSanityPosts();
  const { cases: sanityCases, loading: casesLoading } = useSanityCases();
  const featuredPosts = sanityPosts.slice(0, 3);
  const featuredCases = sanityCases.slice(0, 3);

  const trustLogos = [
    { src: '/Ecoxy_web.png', alt: 'Ecoxy' },
    { src: '/Flematec navn logo.png', alt: 'Flematec' },
    { src: '/Logo_150dpi.png', alt: 'Logo 150dpi' },
    { src: '/MM_bank_nyt_logo_160.png', alt: 'MM Bank' },
  ];

  const testimonials =
    language === 'no'
      ? [
          {
            quote: 'Samsari forsto behovene våre raskt og leverte løsninger som sparer oss for mange timer hver uke. De kombinerer solid teknisk kompetanse med ekte forståelse for bankdrift.',
            name: 'Jørn Gudbrandsen',
            title: 'Chief Technology Officer @ Maritime & Merchant Bank',
          },
          {
            quote: 'Den beste måten å beskrive de på er at de får jobben gjort',
            name: 'Kristian Kvernes Hatlen',
            title: 'Daglig leder @ Flematec',
          },
        ]
      : [
          {
            quote: 'Samsari understood our needs quickly and delivered solutions that save us many hours every week. They combine solid technical expertise with genuine understanding of banking operations.',
            name: 'Jørn Gudbrandsen',
            title: 'Chief Technology Officer @ Maritime & Merchant Bank',
          },
          {
            quote: 'The best way to describe them is that they get the job done',
            name: 'Kristian Kvernes Hatlen',
            title: 'CEO @ Flematec',
          },
        ];

  const faqItems =
    language === 'no'
      ? [
          {
            question: 'Hva kan dere automatisere i vår virksomhet?',
            answer:
              'Vi automatiserer ofte prosesser knyttet til godkjenninger, onboarding, internservice, prosjektoppfølging, dokumentflyt og rapportering. Målet er alltid å redusere manuelt arbeid og skape bedre flyt i hverdagen.',
          },
          {
            question: 'Må vi bytte systemer for å jobbe med dere?',
            answer:
              'Nei. Samsari bygger som regel videre på Microsoft 365, Power Platform og eksisterende verktøy. Vi ser først på hvordan dere kan få mer verdi ut av det dere allerede har.',
          },
          {
            question: 'Bygger dere bare standardløsninger?',
            answer:
              'Nei. Vi leverer både ferdige moduler og skreddersydde applikasjoner. Når en produktisert løsning er riktig, går det raskere. Når behovet er mer unikt, bygger vi tilpasset med moderne teknologi.',
          },
          {
            question: 'Hvordan kommer vi i gang?',
            answer:
              'Vanligvis starter vi med en kartleggingssamtale der vi ser på arbeidsflyt, flaskehalser og hvilke gevinster som er mest realistiske å hente ut først. Derfra anbefaler vi neste steg.',
          },
        ]
      : [
          {
            question: 'What kinds of processes can you automate?',
            answer:
              'We typically automate approvals, onboarding, internal services, project follow-up, document flow and reporting. The goal is always to reduce manual work and create better operational flow.',
          },
          {
            question: 'Do we need to replace our current systems?',
            answer:
              'No. Samsari usually builds on top of Microsoft 365, Power Platform and the tools you already use. We start by identifying how to get more value from your existing setup.',
          },
          {
            question: 'Do you only deliver standard solutions?',
            answer:
              'No. We deliver both ready-made modules and tailored applications. When a productized solution is the right fit, we move faster. When the need is more unique, we build custom solutions with modern technology.',
          },
          {
            question: 'How do we get started?',
            answer:
              'We usually begin with a discovery conversation where we review workflow, bottlenecks and the most realistic improvement opportunities. From there, we recommend the best next step.',
          },
        ];

  const whatWeDoIcons = [
    <svg key="0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /></svg>,
    <svg key="1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" /></svg>,
    <svg key="2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" /></svg>,
  ];

  return (
    <>
      {/* Hero — full-screen split layout */}
      <section className="relative flex min-h-screen flex-col justify-center overflow-hidden px-4 pb-36 pt-24 sm:px-6 lg:px-8">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 premium-grid opacity-[0.15]" />
          <div className="absolute left-1/2 top-0 h-[56rem] w-[72rem] -translate-x-1/2 rounded-full bg-[var(--color-primary-soft)] blur-[120px]" />
          <div className="absolute right-0 top-0 h-full w-[32rem] rounded-full bg-[var(--color-accent-soft)] blur-[100px]" />
        </div>

        <div className="mx-auto w-full max-w-7xl">
          <div className="flex flex-col items-center gap-12 lg:flex-row lg:items-center lg:gap-16 xl:gap-20">
            {/* Text */}
            <Reveal className="flex-1 text-center lg:text-left">
              <p className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-primary)] sm:tracking-[0.3em]">
                {t.home.hero.eyebrow}
              </p>
              <h1 className="text-3xl font-semibold tracking-tight sm:text-5xl lg:text-[3.75rem] lg:leading-[1.06]">
                {t.home.hero.title}
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-[var(--color-text-muted)] sm:text-xl sm:leading-8 lg:mx-0">
                {t.home.hero.description}
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start">
                <ButtonLink to={BOOKING_URL}>{t.home.hero.primaryCta}</ButtonLink>
                <ButtonLink to="/services" variant="secondary">{t.home.hero.secondaryCta}</ButtonLink>
              </div>
            </Reveal>

            {/* Visual */}
            <Reveal delay={120} className="w-full max-w-md shrink-0 lg:w-[440px] xl:w-[480px]">
              <HeroVisual language={language} />
            </Reveal>
          </div>

        </div>

        {/* Full-width logo wall */}
        <div className="absolute inset-x-0 bottom-0 border-t border-[var(--color-border)] bg-[var(--color-surface)] dark:bg-[rgba(255,255,255,0.92)]">
          <div className="px-4 py-8 sm:px-6 lg:px-8">
            <p className="mb-5 text-center text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-text-subtle)] dark:text-[rgba(30,48,58,0.82)]">
              {t.common.trustedBy}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6">
              {trustLogos.map((logo) => (
                <div key={logo.src}>
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    className="h-7 w-auto object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* What we do — dark section with 3 feature cards */}
      <section className="bg-[var(--color-dark)] px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
        <div className="mx-auto w-full max-w-7xl">
          <Reveal className="mx-auto max-w-3xl text-center">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-accent)]">
              {language === 'no' ? 'Hva vi gjør' : 'What we do'}
            </p>
            <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
              {language === 'no'
                ? 'Vi hjelper virksomheter å jobbe smartere med teknologien de allerede har.'
                : 'We help businesses work smarter with the technology they already have.'}
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-5 lg:grid-cols-3">
            {(language === 'no'
              ? [
                  { n: '01', title: 'Automatisering av arbeidsprosesser', body: 'Vi erstatter manuelle rutiner, godkjenninger og oppfølging med smarte arbeidsflyter. Resultatet er mer tid til arbeid som faktisk skaper verdi.', tag: 'Power Automate' },
                  { n: '02', title: 'Skreddersydde applikasjoner', body: 'Når standardsystemer ikke passer, bygger vi tilpassede applikasjoner med React og Power Apps — enkle å bruke, robuste å drifte.', tag: 'Power Apps · React' },
                  { n: '03', title: 'Mer verdi fra Microsoft 365', body: 'De fleste virksomheter bruker bare en brøkdel av potensialet i Microsoft 365. Vi hjelper dere å hente ut det dere allerede betaler for.', tag: 'Microsoft 365 · Copilot' },
                ]
              : [
                  { n: '01', title: 'Business process automation', body: 'We replace manual routines, approvals and follow-up with smart workflows. The result is more time for work that actually creates value.', tag: 'Power Automate' },
                  { n: '02', title: 'Tailored applications', body: "When standard systems don't fit, we build custom applications with React and Power Apps — easy to use, robust to operate.", tag: 'Power Apps · React' },
                  { n: '03', title: 'More value from Microsoft 365', body: 'Most businesses use only a fraction of what Microsoft 365 can do. We help you get more from what you already pay for.', tag: 'Microsoft 365 · Copilot' },
                ]
            ).map((item, index) => (
              <Reveal key={item.n} delay={index * 90}>
                <div className="flex h-full flex-col rounded-2xl border border-white/10 bg-white/5 p-8">
                  <div className="mb-5 flex items-center justify-between">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--color-accent)]/10 text-[var(--color-accent)]">
                      {whatWeDoIcons[index]}
                    </span>
                    <span className="text-4xl font-semibold tabular-nums text-white/40">{item.n}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                  <p className="mt-4 flex-1 text-base leading-7 text-white/60">{item.body}</p>
                  <span className="mt-6 inline-block self-start rounded-full border border-[var(--color-accent)]/30 bg-[var(--color-accent)]/10 px-3 py-1 text-xs font-medium text-[var(--color-accent)]">
                    {item.tag}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={270} className="mt-10 flex justify-center">
            <ButtonLink to="/services">
              {language === 'no' ? 'Se alle tjenester' : 'View all services'}
            </ButtonLink>
          </Reveal>
        </div>
      </section>

      {/* Customer cases */}
      <Section
        eyebrow={language === 'no' ? 'Kundecase' : 'Customer cases'}
        title={t.home.casesPreview.title}
        subtitle={t.home.casesPreview.subtitle}
        contentClassName="space-y-8"
      >
        <div className="grid gap-5 lg:grid-cols-3">
          {casesLoading
            ? [1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
                  <div className="h-6 w-24 rounded-full bg-[var(--color-surface-elevated)]" />
                  <div className="mt-4 h-7 w-3/4 rounded bg-[var(--color-surface-elevated)]" />
                  <div className="mt-4 space-y-2">
                    <div className="h-4 w-full rounded bg-[var(--color-surface-elevated)]" />
                    <div className="h-4 w-5/6 rounded bg-[var(--color-surface-elevated)]" />
                  </div>
                </div>
              ))
            : featuredCases.map((item, index) => (
                <Reveal key={item._id} delay={index * 90}>
                  <Link
                    to={`/cases/${getCaseSlug(item.company)}`}
                    className="group flex h-full flex-col rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] transition hover:-translate-y-1 hover:shadow-premium"
                  >
                    {item.mainImage && (
                      <div className="h-32 overflow-hidden rounded-t-2xl">
                        <img
                          src={urlFor(item.mainImage).width(600).fit('max').url()}
                          alt={item.mainImage.alt ?? item.company}
                          className="h-full w-full object-contain p-4"
                        />
                      </div>
                    )}
                    <div className="flex flex-1 flex-col p-6">
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-text-subtle)]">{getSector(item, language)}</p>
                      <h3 className="mt-2 text-xl font-semibold">{item.company}</h3>
                      <p className="mt-3 flex-1 text-sm leading-7 text-[var(--color-text-muted)] line-clamp-3">{getResult(item, language)}</p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {getMetrics(item, language).slice(0, 2).map((metric) => (
                          <span key={metric} className="rounded-full bg-[var(--color-tag)] px-3 py-1 text-xs font-semibold text-[var(--color-primary)]">
                            {metric}
                          </span>
                        ))}
                      </div>
                      <div className="mt-4 flex items-center gap-1 text-sm font-semibold text-[var(--color-primary)] transition group-hover:gap-2">
                        {language === 'no' ? 'Les hele historien' : 'Read the full story'}
                        <span aria-hidden="true">→</span>
                      </div>
                    </div>
                  </Link>
                </Reveal>
              ))}
        </div>
        <div className="flex justify-center">
          <ButtonLink to="/cases" variant="secondary">{t.common.viewAllCases}</ButtonLink>
        </div>
      </Section>

      {/* Testimonials — dark section */}
      <section className="bg-[var(--color-dark)] px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
        <div className="mx-auto w-full max-w-7xl">
          <Reveal className="mx-auto max-w-3xl text-center">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-accent)]">
              {language === 'no' ? 'Hva kundene sier' : 'What clients say'}
            </p>
            <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
              {language === 'no'
                ? 'Resultater som merkes i hverdagen'
                : 'Results that make a difference every day'}
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-5 lg:grid-cols-3">
            {testimonials.map((item, index) => (
              <Reveal key={item.name} delay={index * 90}>
                <div className="flex h-full flex-col rounded-2xl border border-white/10 bg-white/5 p-8">
                  {/* Quote marks */}
                  <svg
                    className="mb-5 h-8 w-8 text-[var(--color-accent)]/50"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
                  </svg>
                  <blockquote className="flex-1">
                    <p className="text-base leading-7 italic text-white/80">{item.quote}</p>
                  </blockquote>
                  <div className="mt-6 flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--color-primary)]/20 text-sm font-semibold text-[var(--color-primary)]">
                      {item.name[0]}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">{item.name}</p>
                      <p className="text-xs text-white/50">{item.title}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* How we work */}
      <Section
        eyebrow={language === 'no' ? 'Slik jobber vi' : 'How we work'}
        title={language === 'no' ? 'Fra innsikt til resultater' : 'From insight to results'}
        subtitle={language === 'no'
          ? 'Vi er direkte og pragmatiske — ingen lange forprosjekter, bare den korteste veien til resultater.'
          : 'We are direct and pragmatic — no lengthy pre-projects, just the shortest path to results.'}
        className="bg-[var(--color-surface-alt)]"
      >
        <div className="grid gap-10 lg:grid-cols-3">
          {(language === 'no'
            ? [
                { step: '01', title: 'Kartlegging', body: 'Vi starter med en samtale om arbeidsflyt, flaskehalser og mål — gratis og uforpliktende.' },
                { step: '02', title: 'Løsningsdesign', body: 'Vi utformer en tilpasset løsning, basert på teknologi dere allerede har betalt for.' },
                { step: '03', title: 'Levering og oppfølging', body: 'Vi bygger, tester og leverer — og er tilgjengelige for justeringer underveis.' },
              ]
            : [
                { step: '01', title: 'Discovery', body: 'We start with a conversation about your workflow, bottlenecks and goals — free and without obligation.' },
                { step: '02', title: 'Solution design', body: 'We design a tailored solution, built on technology you have already paid for.' },
                { step: '03', title: 'Delivery and follow-up', body: 'We build, test and deliver — and stay available for adjustments along the way.' },
              ]
          ).map((item, index) => (
            <Reveal key={item.step} delay={index * 90}>
              <div className="flex flex-col items-start">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--color-primary-soft)] text-sm font-bold text-[var(--color-primary)]">
                  {item.step}
                </span>
                <h3 className="mt-5 text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm leading-7 text-[var(--color-text-muted)]">{item.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* FAQ */}
      <Section
        eyebrow={language === 'no' ? 'Vanlige spørsmål' : 'FAQ'}
        title={language === 'no' ? 'Spørsmål vi ofte får' : 'Questions we often get'}
        subtitle={language === 'no'
          ? 'Korte svar på det kunder typisk lurer på når de vurderer automatisering og Microsoft 365.'
          : 'Short answers to what customers typically ask when considering automation and Microsoft 365.'}
        contentClassName="space-y-2"
      >
        {faqItems.map((item, index) => {
          const isOpen = openFaq === index;
          return (
            <Reveal key={item.question} delay={index * 50}>
              <div className="overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]">
                <button
                  type="button"
                  onClick={() => setOpenFaq((current) => (current === index ? null : index))}
                  className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left"
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${index}`}
                >
                  <span className="min-w-0 break-words pr-2 text-base font-semibold">{item.question}</span>
                  <span
                    className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[var(--color-border)] text-[var(--color-primary)] transition ${isOpen ? 'rotate-45' : ''}`}
                    aria-hidden="true"
                  >
                    +
                  </span>
                </button>
                <div
                  id={`faq-panel-${index}`}
                  className={`grid transition-[grid-template-rows] duration-300 ease-out ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
                >
                  <div className="overflow-hidden">
                    <div className="border-t border-[var(--color-border)] px-6 py-4">
                      <p className="max-w-3xl text-sm leading-7 text-[var(--color-text-muted)]">{item.answer}</p>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          );
        })}
      </Section>

      {/* Blog */}
      <Section
        eyebrow={language === 'no' ? 'Blogg' : 'Blog'}
        title={t.home.blogPreview.title}
        subtitle={t.home.blogPreview.subtitle}
        contentClassName="space-y-8"
      >
        <div className="grid gap-5 lg:grid-cols-3">
          {postsLoading
            ? [1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
                  <div className="h-5 w-28 rounded-full bg-[var(--color-surface-elevated)]" />
                  <div className="mt-4 h-6 w-3/4 rounded bg-[var(--color-surface-elevated)]" />
                  <div className="mt-3 space-y-2">
                    <div className="h-4 w-full rounded bg-[var(--color-surface-elevated)]" />
                    <div className="h-4 w-5/6 rounded bg-[var(--color-surface-elevated)]" />
                  </div>
                </div>
              ))
            : featuredPosts.map((post, index) => (
                <Reveal key={post.slug} delay={index * 80} className="overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] transition hover:-translate-y-1">
                  {post.mainImage && (
                    <img
                      src={urlFor(post.mainImage).width(600).height(320).fit('crop').url()}
                      alt={post.mainImage.alt ?? getTitle(post, language)}
                      className="h-44 w-full object-cover"
                    />
                  )}
                  <div className="p-6">
                    <div className="flex items-center justify-between text-sm text-[var(--color-text-subtle)]">
                      <span className="rounded-full bg-[var(--color-tag)] px-3 py-1 text-xs font-medium text-[var(--color-primary)]">
                        {t.common.categoryLabels[post.category]}
                      </span>
                      <span>{post.readingTime}</span>
                    </div>
                    <h3 className="mt-4 text-xl font-semibold leading-snug">{getTitle(post, language)}</h3>
                    <p className="mt-2 text-sm leading-7 text-[var(--color-text-muted)]">{getExcerpt(post, language)}</p>
                    <div className="mt-5 flex items-center justify-between">
                      <p className="text-xs text-[var(--color-text-subtle)]">{formatPostDate(post.date, language)}</p>
                      <Link to={`/blog/${post.slug}`} className="text-sm font-semibold text-[var(--color-primary)] transition hover:text-[var(--color-link-hover)]">
                        {t.common.readArticle} →
                      </Link>
                    </div>
                  </div>
                </Reveal>
              ))}
        </div>
        <div className="flex justify-center">
          <ButtonLink to="/blog" variant="secondary">{t.common.viewAllArticles}</ButtonLink>
        </div>
      </Section>

    </>
  );
}
