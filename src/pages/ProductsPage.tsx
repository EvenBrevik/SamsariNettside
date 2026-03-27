import { CTASection } from '../components/shared/CTASection';
import { PageHero } from '../components/shared/PageHero';
import { Reveal } from '../components/shared/Reveal';
import { Section } from '../components/shared/Section';
import { useAppSettings } from '../providers/AppSettingsProvider';

export function ProductsPage() {
  const { t } = useAppSettings();
  return (
    <>
      <PageHero title={t.productsPage.title} subtitle={t.productsPage.subtitle} intro={t.productsPage.intro} />
      <Section contentClassName="grid gap-6 lg:grid-cols-3">
        {t.products.map((product, index) => (
          <Reveal key={product.title} delay={index * 80} className="rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-soft">
            <div className="mb-5 h-12 w-12 rounded-2xl bg-[linear-gradient(135deg,rgba(17,132,205,0.18),rgba(137,88,254,0.18))]" />
            <h2 className="text-2xl font-semibold">{product.title}</h2>
            <p className="mt-4 text-sm leading-7 text-[var(--color-text-muted)]">{product.description}</p>
            <ul className="mt-6 space-y-3">{product.highlights.map((highlight) => <li key={highlight} className="rounded-2xl bg-[var(--color-surface-elevated)] px-4 py-3 text-sm text-[var(--color-text-subtle)]">{highlight}</li>)}</ul>
          </Reveal>
        ))}
      </Section>
      <CTASection title={t.home.finalCta.title} description={t.home.finalCta.description} cta={t.common.bookMeeting} />
    </>
  );
}
