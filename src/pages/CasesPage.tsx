import { BOOKING_URL } from '../config';
import { ButtonLink } from '../components/shared/ButtonLink';
import { Reveal } from '../components/shared/Reveal';
import { usePageTitle } from '../hooks/usePageTitle';
import { useSanityCases } from '../hooks/useSanityCases';
import { getMetrics, getProblem, getResult, getSector, getSolution } from '../lib/caseUtils';
import { urlFor } from '../lib/sanityImage';
import { useAppSettings } from '../providers/AppSettingsProvider';

export function CasesPage() {
  const { t, language } = useAppSettings();
  usePageTitle(t.nav.cases);
  const { cases, loading } = useSanityCases();

  const no = language === 'no';

  return (
    <>
      {/* ── Hero — dark, centred, editorial ── */}
      <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[var(--color-dark)] px-4 py-24 text-center sm:px-6 lg:px-8">
        {/* Background */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 premium-grid opacity-[0.07]" />
          <div className="absolute left-1/2 top-0 h-[50rem] w-[60rem] -translate-x-1/2 rounded-full bg-[var(--color-primary-soft)] opacity-30 blur-[140px]" />
          <div className="absolute bottom-0 right-0 h-[30rem] w-[30rem] rounded-full bg-[var(--color-accent-soft)] opacity-20 blur-[100px]" />
        </div>

        <div className="relative mx-auto w-full max-w-4xl">
          <Reveal>
            <p className="mb-6 text-xs font-semibold uppercase tracking-[0.32em] text-[var(--color-accent)]">
              {no ? 'Kundecase' : 'Customer cases'}
            </p>
            <h1 className="text-5xl font-semibold tracking-tight text-white sm:text-6xl lg:text-7xl lg:leading-[1.05]">
              {t.casesPage.title}
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/60">
              {t.casesPage.subtitle}
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <ButtonLink to={BOOKING_URL}>{t.common.bookMeeting}</ButtonLink>
              <ButtonLink to="/services" variant="secondary">{t.common.viewAllServices}</ButtonLink>
            </div>
          </Reveal>

          {/* Case teasers row */}
          <Reveal delay={160}>
            <div className="mt-20 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-3">
              {t.cases.map((c) => (
                <div key={c.company} className="flex flex-col bg-[var(--color-dark)] px-6 py-5">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/40">{c.sector}</p>
                  <p className="mt-1 text-base font-semibold text-white">{c.company}</p>
                  {c.metrics[0] && (
                    <p className="mt-2 text-sm font-medium text-[var(--color-accent)]">{c.metrics[0]}</p>
                  )}
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Editorial spreads ── */}
      <section className="px-4 py-20 sm:px-6 lg:px-8 lg:py-32">
        <div className="mx-auto w-full max-w-7xl">

          {/* Section label */}
          <Reveal>
            <div className="mb-16 flex items-center gap-4">
              <span className="h-px flex-1 bg-[var(--color-border)]" />
              <p className="shrink-0 text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-text-subtle)]">
                {no ? 'Casene i detalj' : 'Cases in detail'}
              </p>
              <span className="h-px flex-1 bg-[var(--color-border)]" />
            </div>
          </Reveal>

          {/* Loading */}
          {loading && (
            <div className="space-y-24">
              {[1, 2, 3].map((i) => (
                <div key={i} className={`animate-pulse flex flex-col gap-10 lg:flex-row ${i % 2 === 0 ? 'lg:flex-row-reverse' : ''}`}>
                  <div className="h-96 flex-1 rounded-2xl bg-[var(--color-surface)]" />
                  <div className="flex flex-1 flex-col gap-4 pt-4">
                    <div className="h-4 w-24 rounded bg-[var(--color-surface)]" />
                    <div className="h-10 w-3/4 rounded bg-[var(--color-surface)]" />
                    <div className="h-4 w-full rounded bg-[var(--color-surface)]" />
                    <div className="h-4 w-5/6 rounded bg-[var(--color-surface)]" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* No cases */}
          {!loading && cases.length === 0 && (
            <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] px-8 py-20 text-center">
              <p className="text-[var(--color-text-muted)]">
                {no ? 'Ingen case ennå.' : 'No cases yet.'}
              </p>
              <div className="mt-6 flex justify-center">
                <ButtonLink to={BOOKING_URL}>{t.common.bookMeeting}</ButtonLink>
              </div>
            </div>
          )}

          {/* Case spreads */}
          {!loading && cases.length > 0 && (
            <div className="space-y-28 lg:space-y-36">
              {cases.map((item, index) => {
                const reversed = index % 2 !== 0;
                const metrics = getMetrics(item, language);
                const caseNum = String(index + 1).padStart(2, '0');

                return (
                  <Reveal key={item._id} delay={60}>
                    <article className={`flex flex-col gap-10 lg:flex-row lg:items-stretch lg:gap-16 ${reversed ? 'lg:flex-row-reverse' : ''}`}>

                      {/* ── Visual side ── */}
                      <div className="relative lg:w-[46%] lg:shrink-0">
                        <div className="relative h-72 overflow-hidden rounded-2xl sm:h-96 lg:h-full lg:min-h-[520px]">
                          {item.mainImage ? (
                            <>
                              <img
                                src={urlFor(item.mainImage).width(900).height(700).fit('crop').url()}
                                alt={item.mainImage.alt ?? item.company}
                                className="h-full w-full object-cover"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-[#020a0a]/70 via-transparent to-transparent" />
                            </>
                          ) : (
                            <div className="absolute inset-0 overflow-hidden bg-[var(--color-dark)]">
                              <div className="absolute inset-0 premium-grid opacity-[0.08]" />
                              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[12rem] font-semibold tabular-nums leading-none text-white/[0.04] select-none">
                                {caseNum}
                              </div>
                              <div className="absolute bottom-8 left-8 right-8">
                                <div className="inline-block rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/40">
                                  {getSector(item, language)}
                                </div>
                                <p className="mt-3 text-3xl font-semibold text-white">{item.company}</p>
                              </div>
                            </div>
                          )}

                          {/* Case number badge */}
                          <div className="absolute right-5 top-5 rounded-full border border-white/20 bg-black/40 px-3 py-1 text-xs font-semibold text-white/70 backdrop-blur-sm">
                            Case {caseNum}
                          </div>

                          {/* Image overlay: company + sector */}
                          {item.mainImage && (
                            <div className="absolute bottom-6 left-6 right-6">
                              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/60">
                                {getSector(item, language)}
                              </p>
                              <p className="mt-1 text-2xl font-semibold text-white">{item.company}</p>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* ── Content side ── */}
                      <div className="flex flex-1 flex-col justify-center">

                        {/* Header */}
                        <div className="mb-6">
                          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-primary)]">
                            {getSector(item, language)}
                          </p>
                          <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
                            {item.company}
                          </h2>
                        </div>

                        {/* Metrics */}
                        {metrics.length > 0 && (
                          <div className="mb-8 flex flex-wrap gap-2">
                            {metrics.map((metric) => (
                              <span
                                key={metric}
                                className="rounded-full border border-[var(--color-border-strong)] bg-[var(--color-primary-soft)] px-4 py-1.5 text-xs font-semibold text-[var(--color-primary)]"
                              >
                                {metric}
                              </span>
                            ))}
                          </div>
                        )}

                        {/* Narrative: problem → solution → result */}
                        <div className="space-y-4">
                          <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
                            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--color-text-subtle)]">
                              {no ? 'Utfordringen' : 'The challenge'}
                            </p>
                            <p className="text-sm leading-7 text-[var(--color-text-muted)]">
                              {getProblem(item, language)}
                            </p>
                          </div>

                          <div className="flex items-center gap-3 px-1">
                            <div className="h-px flex-1 bg-[var(--color-border)]" />
                            <svg viewBox="0 0 16 16" fill="currentColor" className="h-3 w-3 shrink-0 text-[var(--color-primary)]" aria-hidden="true">
                              <path d="M13.78 7.22a.75.75 0 010 1.06l-5.25 5.25a.75.75 0 01-1.06-1.06l3.97-3.97H2.75a.75.75 0 010-1.5h8.69L7.47 2.97a.75.75 0 011.06-1.06l5.25 5.25z" />
                            </svg>
                            <div className="h-px flex-1 bg-[var(--color-border)]" />
                          </div>

                          <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
                            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--color-text-subtle)]">
                              {no ? 'Løsningen' : 'The solution'}
                            </p>
                            <p className="text-sm leading-7 text-[var(--color-text-muted)]">
                              {getSolution(item, language)}
                            </p>
                          </div>

                          <div className="flex items-center gap-3 px-1">
                            <div className="h-px flex-1 bg-[var(--color-border)]" />
                            <svg viewBox="0 0 16 16" fill="currentColor" className="h-3 w-3 shrink-0 text-[var(--color-primary)]" aria-hidden="true">
                              <path d="M13.78 7.22a.75.75 0 010 1.06l-5.25 5.25a.75.75 0 01-1.06-1.06l3.97-3.97H2.75a.75.75 0 010-1.5h8.69L7.47 2.97a.75.75 0 011.06-1.06l5.25 5.25z" />
                            </svg>
                            <div className="h-px flex-1 bg-[var(--color-border)]" />
                          </div>

                          <div className="rounded-xl border border-[var(--color-border-strong)] bg-[var(--color-primary-soft)] p-5">
                            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--color-primary)]">
                              {no ? 'Resultatet' : 'The result'}
                            </p>
                            <p className="text-sm leading-7 text-[var(--color-text-muted)]">
                              {getResult(item, language)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </article>
                  </Reveal>
                );
              })}
            </div>
          )}
        </div>
      </section>

    </>
  );
}
