import { CTASection } from '../components/shared/CTASection';
import { PageHero } from '../components/shared/PageHero';
import { Reveal } from '../components/shared/Reveal';
import { Section } from '../components/shared/Section';
import { useAppSettings } from '../providers/AppSettingsProvider';

export function AboutPage() {
  const { t } = useAppSettings();
  return (
    <>
      <PageHero title={t.aboutPage.title} subtitle={t.aboutPage.subtitle} intro={t.aboutPage.intro} />
      <Section contentClassName="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <Reveal className="rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-soft sm:p-8">
          <h2 className="text-3xl font-semibold tracking-tight">Samsari</h2>
          <p className="mt-4 text-base leading-8 text-[var(--color-text-muted)]">{t.aboutPage.intro}</p>
          <p className="mt-4 text-base leading-8 text-[var(--color-text-muted)]">{t.home.finalCta.description}</p>
        </Reveal>
        <div className="space-y-6">
          {t.aboutPage.principles.map((principle, index) => (
            <Reveal key={principle.title} delay={index * 80} className="rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-soft">
              <h3 className="text-xl font-semibold">{principle.title}</h3>
              <p className="mt-3 text-sm leading-7 text-[var(--color-text-muted)]">{principle.description}</p>
            </Reveal>
          ))}
        </div>
      </Section>
      <CTASection title={t.home.finalCta.title} description={t.home.finalCta.description} cta={t.common.bookMeeting} />
    </>
  );
}
