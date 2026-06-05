import { Link, useParams, Navigate } from 'react-router-dom';
import { BOOKING_URL } from '../config';
import { ButtonLink } from '../components/shared/ButtonLink';
import { Reveal } from '../components/shared/Reveal';
import { CTASection } from '../components/shared/CTASection';
import { usePageTitle } from '../hooks/usePageTitle';
import { useSanityCases } from '../hooks/useSanityCases';
import { getCaseSlug, getMetrics, getProblem, getResult, getSector, getSolution } from '../lib/caseUtils';
import { urlFor } from '../lib/sanityImage';
import { useAppSettings } from '../providers/AppSettingsProvider';

export function CaseDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { language } = useAppSettings();
  const { cases, loading } = useSanityCases();
  const no = language === 'no';

  const item = cases.find(c => getCaseSlug(c.company) === slug);

  usePageTitle(item ? item.company : (no ? 'Kundecase' : 'Customer case'));

  if (loading) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-40 sm:px-6 lg:px-8">
        <div className="animate-pulse space-y-6">
          <div className="h-8 w-48 rounded bg-[var(--color-surface-elevated)]" />
          <div className="h-12 w-3/4 rounded bg-[var(--color-surface-elevated)]" />
          <div className="h-96 rounded-2xl bg-[var(--color-surface-elevated)]" />
        </div>
      </div>
    );
  }

  if (!item) return <Navigate to="/cases" replace />;

  const metrics = getMetrics(item, language);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-[var(--color-dark)] px-4 pb-20 pt-32 sm:px-6 lg:px-8">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 premium-grid opacity-[0.06]" />
          <div className="absolute left-1/2 top-0 h-[40rem] w-[60rem] -translate-x-1/2 rounded-full bg-[var(--color-primary-soft)] opacity-20 blur-[140px]" />
        </div>
        <div className="relative mx-auto w-full max-w-4xl">
          {/* Back link */}
          <Link
            to="/cases"
            className="mb-8 inline-flex items-center gap-2 text-sm text-white/50 transition hover:text-white/80"
          >
            <svg viewBox="0 0 16 16" fill="currentColor" className="h-3.5 w-3.5" aria-hidden="true">
              <path d="M3.22 7.22a.75.75 0 000 1.06l5.25 5.25a.75.75 0 101.06-1.06L5.56 8l3.97-4.47a.75.75 0 10-1.06-1.06L3.22 7.22z" />
            </svg>
            {no ? 'Tilbake til kundecase' : 'Back to customer cases'}
          </Link>

          <Reveal>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-accent)]">
              {getSector(item, language)}
            </p>
            <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-5xl">
              {item.company}
            </h1>
            {metrics.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-3">
                {metrics.map((m) => (
                  <span key={m} className="rounded-full border border-[var(--color-accent)]/30 bg-[var(--color-accent)]/10 px-4 py-1.5 text-sm font-semibold text-[var(--color-accent)]">
                    {m}
                  </span>
                ))}
              </div>
            )}
          </Reveal>
        </div>
      </section>

      {/* Main image */}
      {item.mainImage && (
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="-mt-8 overflow-hidden rounded-2xl shadow-premium">
            <img
              src={urlFor(item.mainImage).width(1200).height(600).fit('crop').url()}
              alt={item.mainImage.alt ?? item.company}
              className="h-64 w-full object-cover sm:h-96"
            />
          </div>
        </div>
      )}

      {/* Story */}
      <section className="px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto w-full max-w-4xl">
          <Reveal>
            <div className="space-y-5">
              {/* Challenge */}
              <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 sm:p-8">
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-text-subtle)]">
                  {no ? 'Utfordringen' : 'The challenge'}
                </p>
                <p className="text-base leading-8 text-[var(--color-text-muted)]">
                  {getProblem(item, language)}
                </p>
              </div>

              {/* Arrow */}
              <div className="flex items-center gap-3 px-2">
                <div className="h-px flex-1 bg-[var(--color-border)]" />
                <svg viewBox="0 0 16 16" fill="currentColor" className="h-3.5 w-3.5 shrink-0 text-[var(--color-primary)]" aria-hidden="true">
                  <path d="M8 1a.75.75 0 01.75.75v10.19l3.22-3.22a.75.75 0 111.06 1.06l-4.5 4.5a.75.75 0 01-1.06 0l-4.5-4.5a.75.75 0 111.06-1.06l3.22 3.22V1.75A.75.75 0 018 1z" />
                </svg>
                <div className="h-px flex-1 bg-[var(--color-border)]" />
              </div>

              {/* Solution */}
              <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 sm:p-8">
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-text-subtle)]">
                  {no ? 'Løsningen' : 'The solution'}
                </p>
                <p className="text-base leading-8 text-[var(--color-text-muted)]">
                  {getSolution(item, language)}
                </p>
              </div>

              {/* Arrow */}
              <div className="flex items-center gap-3 px-2">
                <div className="h-px flex-1 bg-[var(--color-border)]" />
                <svg viewBox="0 0 16 16" fill="currentColor" className="h-3.5 w-3.5 shrink-0 text-[var(--color-primary)]" aria-hidden="true">
                  <path d="M8 1a.75.75 0 01.75.75v10.19l3.22-3.22a.75.75 0 111.06 1.06l-4.5 4.5a.75.75 0 01-1.06 0l-4.5-4.5a.75.75 0 111.06-1.06l3.22 3.22V1.75A.75.75 0 018 1z" />
                </svg>
                <div className="h-px flex-1 bg-[var(--color-border)]" />
              </div>

              {/* Result */}
              <div className="rounded-2xl border border-[var(--color-border-strong)] bg-[var(--color-primary-soft)] p-6 sm:p-8">
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-primary)]">
                  {no ? 'Resultatet' : 'The result'}
                </p>
                <p className="text-base leading-8 text-[var(--color-text-muted)]">
                  {getResult(item, language)}
                </p>
              </div>
            </div>
          </Reveal>

          {/* CTA */}
          <Reveal delay={120} className="mt-16 text-center">
            <p className="mb-6 text-lg font-semibold">
              {no ? 'Vil du oppnå lignende resultater?' : 'Want to achieve similar results?'}
            </p>
            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
              <ButtonLink to={BOOKING_URL}>
                {no ? 'Book gratis kartleggingsmøte' : 'Book a free discovery call'}
              </ButtonLink>
              <ButtonLink to="/cases" variant="secondary">
                {no ? 'Se flere kundecase' : 'See more customer cases'}
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
