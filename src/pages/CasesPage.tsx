import { CTASection } from '../components/shared/CTASection';
import { PageHero } from '../components/shared/PageHero';
import { Reveal } from '../components/shared/Reveal';
import { Section } from '../components/shared/Section';
import { useAppSettings } from '../providers/AppSettingsProvider';

export function CasesPage() {
  const { t } = useAppSettings();
  return (
    <>
      <PageHero title={t.casesPage.title} subtitle={t.casesPage.subtitle} intro={t.casesPage.intro} />
      <Section contentClassName="space-y-6">
        {t.cases.map((item, index) => (
          <Reveal key={item.company} delay={index * 80} className="rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-soft">
            <div className="flex flex-col gap-4 border-b border-[var(--color-border)] pb-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--color-primary)]">{item.sector}</p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight">{item.company}</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {item.metrics.map((metric) => <span key={metric} className="rounded-full bg-[var(--color-tag)] px-3 py-1 text-xs font-medium text-[var(--color-primary)]">{metric}</span>)}
              </div>
            </div>
            <div className="mt-6 grid gap-4 lg:grid-cols-3">
              <div className="rounded-2xl bg-[var(--color-surface-elevated)] p-5"><p className="text-sm font-semibold">{t.common.challenge}</p><p className="mt-3 text-sm leading-7 text-[var(--color-text-muted)]">{item.problem}</p></div>
              <div className="rounded-2xl bg-[var(--color-surface-elevated)] p-5"><p className="text-sm font-semibold">{t.common.solution}</p><p className="mt-3 text-sm leading-7 text-[var(--color-text-muted)]">{item.solution}</p></div>
              <div className="rounded-2xl bg-[var(--color-surface-elevated)] p-5"><p className="text-sm font-semibold">{t.common.results}</p><p className="mt-3 text-sm leading-7 text-[var(--color-text-muted)]">{item.result}</p></div>
            </div>
          </Reveal>
        ))}
      </Section>
      <CTASection title={t.home.finalCta.title} description={t.home.finalCta.description} cta={t.common.bookMeeting} />
    </>
  );
}
