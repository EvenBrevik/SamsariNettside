import { Link } from 'react-router-dom';
import { CTASection } from '../components/shared/CTASection';
import { ButtonLink } from '../components/shared/ButtonLink';
import { Reveal } from '../components/shared/Reveal';
import { Section } from '../components/shared/Section';
import { useAppSettings } from '../providers/AppSettingsProvider';

export function HomePage() {
  const { t } = useAppSettings();
  const featuredPosts = t.blogPosts.slice(0, 3);
  const trustLogos = [
    { src: '/Ecoxy_web.png', alt: 'Ecoxy' },
    { src: '/Flematec navn logo.png', alt: 'Flematec' },
    { src: '/Logo_150dpi.png', alt: 'Logo 150dpi' },
    { src: '/MM_bank_nyt_logo_160.png', alt: 'MM Bank' },
  ];

  return (
    <>
      <section className="px-4 pb-16 pt-28 sm:px-6 lg:px-8 lg:pb-24">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <Reveal className="relative overflow-hidden rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-surface)] p-8 shadow-premium sm:p-10 lg:p-14">
            <div className="pointer-events-none absolute inset-0 bg-hero-grid opacity-90" />
            <div className="pointer-events-none absolute -left-16 top-0 h-40 w-40 rounded-full bg-[var(--color-primary-soft)] blur-3xl" />
            <div className="pointer-events-none absolute bottom-0 right-0 h-48 w-48 rounded-full bg-[var(--color-accent-soft)] blur-3xl" />
            <div className="relative">
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.24em] text-[var(--color-primary)]">{t.home.hero.eyebrow}</p>
              <h1 className="max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">{t.home.hero.title}</h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--color-text-muted)]">{t.home.hero.description}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <ButtonLink to="/contact">{t.home.hero.primaryCta}</ButtonLink>
                <ButtonLink to="/services" variant="secondary">{t.home.hero.secondaryCta}</ButtonLink>
              </div>
              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                {t.home.hero.stats.map((stat) => (
                  <div key={stat.label} className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)] p-4">
                    <p className="text-2xl font-semibold">{stat.value}</p>
                    <p className="mt-2 text-sm text-[var(--color-text-muted)]">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
          <Reveal delay={120} className="relative overflow-hidden rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-soft sm:p-8">
            <div className="absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,#1184CD,#8958FE)]" />
            <div className="pointer-events-none absolute right-8 top-8 h-20 w-20 rounded-full bg-[var(--color-secondary-soft)] blur-2xl animate-pulse-soft" />
            <div className="relative">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--color-primary)]">{t.home.hero.card.eyebrow}</p>
              <h2 className="mt-4 text-2xl font-semibold tracking-tight">{t.home.hero.card.title}</h2>
              <p className="mt-4 text-base leading-7 text-[var(--color-text-muted)]">{t.home.hero.card.body}</p>
              <div className="mt-8 space-y-3">
                {t.home.hero.card.bullets.map((bullet, index) => (
                  <div key={bullet} className={`rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)] p-4 ${index === 1 ? 'translate-x-3' : ''} ${index === 2 ? 'translate-x-6' : ''} transition`}>
                    <p className="font-medium">{bullet}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>
      <Section eyebrow={t.common.trustedBy} className="pt-0" contentClassName="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {trustLogos.map((logo, index) => (
          <Reveal
            key={logo.src}
            delay={index * 80}
            className="flex min-h-[104px] items-center justify-center rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] px-6 py-5 shadow-soft"
          >
            <img
              src={logo.src}
              alt={logo.alt}
              className="max-h-12 w-full object-contain opacity-90 transition hover:opacity-100"
            />
          </Reveal>
        ))}
      </Section>
      <Section title={t.home.valueProps.title} subtitle={t.home.valueProps.subtitle} contentClassName="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {t.home.valueProps.items.map((item, index) => (
          <Reveal key={item.title} delay={index * 70} className="rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-soft transition hover:-translate-y-1">
            <div className="mb-5 h-12 w-12 rounded-2xl bg-[linear-gradient(135deg,rgba(17,132,205,0.18),rgba(137,88,254,0.16))]" />
            <h3 className="text-xl font-semibold">{item.title}</h3>
            <p className="mt-3 text-sm leading-7 text-[var(--color-text-muted)]">{item.description}</p>
          </Reveal>
        ))}
      </Section>
      <Section title={t.home.servicesPreview.title} subtitle={t.home.servicesPreview.subtitle} contentClassName="grid gap-6 lg:grid-cols-2">
        {t.services.map((service, index) => (
          <Reveal key={service.title} delay={index * 80} className="rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-soft transition hover:-translate-y-1">
            <div className="mb-4 inline-flex rounded-full bg-[var(--color-tag)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-primary)]">{service.title}</div>
            <p className="text-base leading-7 text-[var(--color-text-muted)]">{service.summary}</p>
          </Reveal>
        ))}
      </Section>
      <Section title={t.home.productsPreview.title} subtitle={t.home.productsPreview.subtitle} contentClassName="grid gap-6 lg:grid-cols-3">
        {t.products.map((product, index) => (
          <Reveal key={product.title} delay={index * 80} className="rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-soft">
            <h3 className="text-2xl font-semibold">{product.title}</h3>
            <p className="mt-4 text-sm leading-7 text-[var(--color-text-muted)]">{product.description}</p>
            <ul className="mt-6 space-y-3 text-sm text-[var(--color-text-subtle)]">
              {product.highlights.map((highlight) => <li key={highlight} className="rounded-2xl bg-[var(--color-surface-elevated)] px-4 py-3">{highlight}</li>)}
            </ul>
          </Reveal>
        ))}
      </Section>
      <Section title={t.home.process.title} subtitle={t.home.process.subtitle} contentClassName="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {t.home.process.steps.map((step, index) => (
          <Reveal key={step.step} delay={index * 80} className="rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-soft">
            <span className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--color-primary)]">{step.step}</span>
            <h3 className="mt-4 text-2xl font-semibold">{step.title}</h3>
            <p className="mt-3 text-sm leading-7 text-[var(--color-text-muted)]">{step.description}</p>
          </Reveal>
        ))}
      </Section>
      <Section title={t.home.casesPreview.title} subtitle={t.home.casesPreview.subtitle} contentClassName="grid gap-6 lg:grid-cols-3">
        {t.cases.map((item, index) => (
          <Reveal key={item.company} delay={index * 90} className="rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-soft">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--color-primary)]">{item.sector}</p>
            <h3 className="mt-3 text-2xl font-semibold">{item.company}</h3>
            <p className="mt-4 text-sm leading-7 text-[var(--color-text-muted)]">{item.result}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {item.metrics.map((metric) => <span key={metric} className="rounded-full bg-[var(--color-tag)] px-3 py-1 text-xs font-medium text-[var(--color-primary)]">{metric}</span>)}
            </div>
          </Reveal>
        ))}
      </Section>
      <Section title={t.home.blogPreview.title} subtitle={t.home.blogPreview.subtitle} contentClassName="grid gap-6 lg:grid-cols-3">
        {featuredPosts.map((post, index) => (
          <Reveal key={post.slug} delay={index * 80} className="rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-soft transition hover:-translate-y-1">
            <div className="flex items-center justify-between text-sm text-[var(--color-text-subtle)]"><span>{post.category}</span><span>{post.readingTime}</span></div>
            <h3 className="mt-4 text-2xl font-semibold">{post.title}</h3>
            <p className="mt-3 text-sm leading-7 text-[var(--color-text-muted)]">{post.excerpt}</p>
            <p className="mt-6 text-sm text-[var(--color-text-subtle)]">{post.date}</p>
            <Link to={`/blog/${post.slug}`} className="mt-6 inline-flex text-sm font-semibold text-[var(--color-primary)] transition hover:text-[var(--color-accent)]">{t.common.readArticle}</Link>
          </Reveal>
        ))}
      </Section>
      <CTASection title={t.home.finalCta.title} description={t.home.finalCta.description} cta={t.home.finalCta.primaryCta} />
    </>
  );
}
