import { CTASection } from '../components/shared/CTASection';
import { PageHero } from '../components/shared/PageHero';
import { Reveal } from '../components/shared/Reveal';
import { Section } from '../components/shared/Section';
import { useAppSettings } from '../providers/AppSettingsProvider';

export function ServicesPage() {
  const { t } = useAppSettings();
  return (
    <>
      <PageHero title={t.servicesPage.title} subtitle={t.servicesPage.subtitle} intro={t.servicesPage.intro} />
      <Section contentClassName="space-y-6">
        {t.services.map((service, index) => (
          <Reveal key={service.title} delay={index * 80} className="grid gap-6 rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-soft lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--color-primary)]">{service.title}</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight">{service.summary}</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl bg-[var(--color-surface-elevated)] p-5"><p className="text-sm font-semibold text-[var(--color-text)]">{t.common.challenge}</p><p className="mt-3 text-sm leading-7 text-[var(--color-text-muted)]">{service.problem}</p></div>
              <div className="rounded-2xl bg-[var(--color-surface-elevated)] p-5"><p className="text-sm font-semibold text-[var(--color-text)]">{t.common.value}</p><p className="mt-3 text-sm leading-7 text-[var(--color-text-muted)]">{service.value}</p></div>
            </div>
          </Reveal>
        ))}
      </Section>
      <CTASection title={t.home.finalCta.title} description={t.home.finalCta.description} cta={t.common.bookMeeting} />
    </>
  );
}
