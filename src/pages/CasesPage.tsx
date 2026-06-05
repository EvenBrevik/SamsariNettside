import { Link } from 'react-router-dom';
import { BOOKING_URL } from '../config';
import { ButtonLink } from '../components/shared/ButtonLink';
import { Reveal } from '../components/shared/Reveal';
import { useSEO } from '../hooks/useSEO';
import { useSanityCases } from '../hooks/useSanityCases';
import { getCaseSlug, getMetrics, getResult, getSector } from '../lib/caseUtils';
import { urlFor } from '../lib/sanityImage';
import { useAppSettings } from '../providers/AppSettingsProvider';

export function CasesPage() {
  const { t, language } = useAppSettings();
  useSEO({
    title: no ? 'Kundecase' : 'Customer cases',
    description: no
      ? 'Se hvordan Samsari har hjulpet virksomheter med å automatisere prosesser og skape målbare resultater med Microsoft 365 og Power Platform.'
      : 'See how Samsari has helped businesses automate processes and create measurable results with Microsoft 365 and Power Platform.',
    path: '/cases',
  });
  const { cases: allCases, loading } = useSanityCases();
  const cases = allCases.filter(c => !c.company.toLowerCase().includes('test'));
  const no = language === 'no';

  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[50vh] flex-col items-center justify-center overflow-hidden bg-[var(--color-dark)] px-4 py-32 text-center sm:px-6 lg:px-8">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 premium-grid opacity-[0.07]" />
          <div className="absolute left-1/2 top-0 h-[40rem] w-[60rem] -translate-x-1/2 rounded-full bg-[var(--color-primary-soft)] opacity-30 blur-[140px]" />
        </div>
        <div className="relative mx-auto w-full max-w-3xl">
          <Reveal>
            <p className="mb-6 text-xs font-semibold uppercase tracking-[0.32em] text-[var(--color-accent)]">
              {no ? 'Kundecase' : 'Customer cases'}
            </p>
            <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl lg:leading-[1.05]">
              {t.casesPage.title}
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-white/60 sm:text-lg">
              {t.casesPage.subtitle}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Card grid */}
      <section className="px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto w-full max-w-7xl">

          {loading && (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]">
                  <div className="h-52 rounded-t-2xl bg-[var(--color-surface-elevated)]" />
                  <div className="p-6 space-y-3">
                    <div className="h-3 w-20 rounded bg-[var(--color-surface-elevated)]" />
                    <div className="h-6 w-3/4 rounded bg-[var(--color-surface-elevated)]" />
                    <div className="h-4 w-full rounded bg-[var(--color-surface-elevated)]" />
                    <div className="h-4 w-5/6 rounded bg-[var(--color-surface-elevated)]" />
                  </div>
                </div>
              ))}
            </div>
          )}

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

          {!loading && cases.length > 0 && (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {cases.map((item, index) => {
                const slug = getCaseSlug(item.company);
                const metrics = getMetrics(item, language);
                return (
                  <Reveal key={item._id} delay={index * 70}>
                    <Link
                      to={`/cases/${slug}`}
                      className="group flex h-full flex-col rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] transition hover:-translate-y-1 hover:shadow-premium"
                    >
                      {/* Image / placeholder */}
                      <div className="relative h-36 overflow-hidden rounded-t-2xl bg-[var(--color-dark)] shrink-0">
                        {item.mainImage ? (
                          <img
                            src={urlFor(item.mainImage).width(600).fit('max').url()}
                            alt={item.mainImage.alt ?? item.company}
                            className="h-full w-full object-contain p-4"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center">
                            <span className="text-6xl font-bold text-white/10 select-none">
                              {item.company[0]}
                            </span>
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                        <div className="absolute bottom-4 left-4">
                          <span className="rounded-full border border-white/20 bg-black/40 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white/80 backdrop-blur-sm">
                            {getSector(item, language)}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex flex-1 flex-col p-6">
                        <h2 className="text-xl font-semibold">{item.company}</h2>
                        <p className="mt-2 flex-1 text-sm leading-7 text-[var(--color-text-muted)] line-clamp-3">
                          {getResult(item, language)}
                        </p>
                        {metrics.length > 0 && (
                          <div className="mt-4 flex flex-wrap gap-2">
                            {metrics.slice(0, 2).map((m) => (
                              <span key={m} className="rounded-full bg-[var(--color-tag)] px-3 py-1 text-xs font-semibold text-[var(--color-primary)]">
                                {m}
                              </span>
                            ))}
                          </div>
                        )}
                        <div className="mt-5 flex items-center gap-1 text-sm font-semibold text-[var(--color-primary)] transition group-hover:gap-2">
                          {no ? 'Les hele historien' : 'Read the full story'}
                          <span aria-hidden="true">→</span>
                        </div>
                      </div>
                    </Link>
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
