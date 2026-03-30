import { Link } from 'react-router-dom';
import { CTASection } from '../components/shared/CTASection';
import { ButtonLink } from '../components/shared/ButtonLink';
import { Reveal } from '../components/shared/Reveal';
import { Section } from '../components/shared/Section';
import { useAppSettings } from '../providers/AppSettingsProvider';

export function HomePage() {
  const { t, language } = useAppSettings();
  const featuredPosts = t.blogPosts.slice(0, 3);
  const trustLogos = [
    { src: '/Ecoxy_web.png', alt: 'Ecoxy' },
    { src: '/Flematec navn logo.png', alt: 'Flematec' },
    { src: '/Logo_150dpi.png', alt: 'Logo 150dpi' },
    { src: '/MM_bank_nyt_logo_160.png', alt: 'MM Bank' },
  ];

  const serviceOverview =
    language === 'no'
      ? [
          {
            title: 'Automatisering av arbeidsprosesser',
            description:
              'Vi forenkler manuelle rutiner, godkjenninger og oppfølging med Power Automate og moderne arbeidsflyter.',
          },
          {
            title: 'Ferdige løsninger som kan tas raskt i bruk',
            description:
              'Vi bygger produktiserte løsninger som prosjektportaler, arbeidsflater og prosessmoduler som gir rask verdi.',
          },
          {
            title: 'Skreddersydde applikasjoner',
            description:
              'Vi utvikler tilpassede applikasjoner med React og moderne teknologi når standardløsninger ikke er nok.',
          },
          {
            title: 'Mer verdi fra Microsoft 365',
            description:
              'Vi hjelper virksomheter å utnytte Microsoft 365 og Power Platform bedre på tvers av prosess, data og samarbeid.',
          },
        ]
      : [
          {
            title: 'Business process automation',
            description:
              'We simplify manual routines, approvals and follow-up with Power Automate and modern workflow design.',
          },
          {
            title: 'Ready-made solutions with fast time to value',
            description:
              'We build productized solutions such as project portals, workspaces and process modules that launch quickly.',
          },
          {
            title: 'Custom applications',
            description:
              'We develop tailored applications with React and modern technology when standard solutions are not enough.',
          },
          {
            title: 'More value from Microsoft 365',
            description:
              'We help companies get more from Microsoft 365 and Power Platform across process, data and collaboration.',
          },
        ];

  const resultsOverview =
    language === 'no'
      ? {
          title: 'Resultater og forretningsverdi',
          subtitle:
            'Når løsninger er godt forankret i drift, merkes effekten i kapasitet, kvalitet og tempo.',
          items: [
            { value: '40%', label: 'mindre manuelt arbeid i typiske prosesser' },
            { value: '4 uker', label: 'fra innsikt til første løsning' },
            { value: '100%', label: 'bygget rundt verktøy virksomheten allerede bruker' },
          ],
        }
      : {
          title: 'Results and business value',
          subtitle:
            'When solutions are grounded in real operations, the impact is visible in capacity, quality and speed.',
          items: [
            { value: '40%', label: 'less manual work in common processes' },
            { value: '4 weeks', label: 'from insight to first solution' },
            { value: '100%', label: 'built around tools the business already uses' },
          ],
        };

  const whySamsari =
    language === 'no'
      ? {
          title: 'Hvorfor Samsari',
          subtitle:
            'Vi kombinerer teknisk gjennomføring med forretningsforståelse, slik at løsningene faktisk skaper effekt.',
          items: [
            {
              title: 'Både produkt og utviklingspartner',
              description:
                'Vi kan levere både ferdige moduler og skreddersøm, avhengig av hva som gir best effekt.',
            },
            {
              title: 'Pragmatisk teknologivalg',
              description:
                'Vi bruker Microsoft 365 der det gir fart, og moderne webteknologi der det gir mer fleksibilitet.',
            },
            {
              title: 'Fokus på faktisk bruk',
              description:
                'Vi bygger løsninger som er enkle å forstå, enkle å ta i bruk og enkle å videreutvikle.',
            },
          ],
        }
      : {
          title: 'Why Samsari',
          subtitle:
            'We combine technical execution with business understanding so the solutions create real operational impact.',
          items: [
            {
              title: 'Both product and development partner',
              description:
                'We deliver both ready-made modules and tailored solutions depending on what creates the best outcome.',
            },
            {
              title: 'Pragmatic technology choices',
              description:
                'We use Microsoft 365 where it creates speed, and modern web technology where it creates flexibility.',
            },
            {
              title: 'Focused on real adoption',
              description:
                'We build solutions that are easy to understand, easy to adopt and easy to keep improving.',
            },
          ],
        };

  return (
    <>
      <section className="px-4 pb-16 pt-32 sm:px-6 lg:px-8 lg:pb-24 lg:pt-36">
        <div className="mx-auto max-w-7xl">
          <Reveal className="relative overflow-hidden rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-surface)] px-8 py-12 shadow-premium sm:px-10 lg:px-14 lg:py-16">
            <div className="pointer-events-none absolute inset-0 bg-hero-grid opacity-60" />
            <div className="relative max-w-4xl">
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.24em] text-[var(--color-primary)]">
                {t.home.hero.eyebrow}
              </p>
              <h1 className="max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                {t.home.hero.title}
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--color-text-muted)]">
                {t.home.hero.description}
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <ButtonLink to="/contact">{t.home.hero.primaryCta}</ButtonLink>
                <ButtonLink to="/services" variant="secondary">
                  {t.home.hero.secondaryCta}
                </ButtonLink>
              </div>
              <div className="mt-10 grid gap-3 lg:max-w-3xl sm:grid-cols-2 lg:grid-cols-3">
                {t.home.hero.points.map((point) => (
                  <div
                    key={point}
                    className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)] px-4 py-4"
                  >
                    <p className="text-sm font-medium leading-6 text-[var(--color-text-muted)]">{point}</p>
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
            className="flex min-h-[96px] items-center justify-center rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] px-6 py-5"
          >
            <img src={logo.src} alt={logo.alt} className="max-h-12 w-full object-contain opacity-90 transition hover:opacity-100" />
          </Reveal>
        ))}
      </Section>

      <Section
        eyebrow={language === 'no' ? 'Hva vi gjør' : 'What we do'}
        title={language === 'no' ? 'Teknologi og løsninger som gjør arbeid enklere' : 'Technology and solutions that make work simpler'}
        subtitle={
          language === 'no'
            ? 'Samsari hjelper virksomheter å automatisere, standardisere og bygge løsninger som gir mer flyt i hverdagen.'
            : 'Samsari helps businesses automate, standardize and build solutions that create more flow in day-to-day work.'
        }
        contentClassName="grid gap-6 md:grid-cols-2 xl:grid-cols-4"
      >
        {serviceOverview.map((item, index) => (
          <Reveal key={item.title} delay={index * 70} className="rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
            <h3 className="text-lg font-semibold leading-7">{item.title}</h3>
            <p className="mt-3 text-sm leading-7 text-[var(--color-text-muted)]">{item.description}</p>
          </Reveal>
        ))}
      </Section>

      <Section
        eyebrow={language === 'no' ? 'Produkter og løsninger' : 'Products and solutions'}
        title={t.home.productsPreview.title}
        subtitle={t.home.productsPreview.subtitle}
        contentClassName="grid gap-6 lg:grid-cols-3"
      >
        {t.products.map((product, index) => (
          <Reveal key={product.title} delay={index * 80} className="rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--color-primary)]">{product.title}</p>
            <p className="mt-4 text-sm leading-7 text-[var(--color-text-muted)]">{product.description}</p>
            <ul className="mt-6 space-y-3">
              {product.highlights.map((highlight) => (
                <li key={highlight} className="border-t border-[var(--color-border)] pt-3 text-sm text-[var(--color-text-subtle)]">
                  {highlight}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </Section>

      <Section
        eyebrow={language === 'no' ? 'Hvordan vi jobber' : 'How we work'}
        title={t.home.process.title}
        subtitle={t.home.process.subtitle}
        contentClassName="grid gap-6 md:grid-cols-2 xl:grid-cols-4"
      >
        {t.home.process.steps.map((step, index) => (
          <Reveal key={step.step} delay={index * 80} className="rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
            <span className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--color-primary)]">{step.step}</span>
            <h3 className="mt-4 text-xl font-semibold">{step.title}</h3>
            <p className="mt-3 text-sm leading-7 text-[var(--color-text-muted)]">{step.description}</p>
          </Reveal>
        ))}
      </Section>

      <Section
        eyebrow={language === 'no' ? 'Resultater' : 'Results'}
        title={resultsOverview.title}
        subtitle={resultsOverview.subtitle}
        contentClassName="grid gap-6 md:grid-cols-3"
      >
        {resultsOverview.items.map((item, index) => (
          <Reveal key={item.label} delay={index * 80} className="rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 text-center">
            <p className="text-3xl font-semibold tracking-tight text-[var(--color-primary)]">{item.value}</p>
            <p className="mt-3 text-sm leading-7 text-[var(--color-text-muted)]">{item.label}</p>
          </Reveal>
        ))}
      </Section>

      <Section
        eyebrow={language === 'no' ? 'Hvorfor Samsari' : 'Why Samsari'}
        title={whySamsari.title}
        subtitle={whySamsari.subtitle}
        contentClassName="grid gap-6 lg:grid-cols-3"
      >
        {whySamsari.items.map((item, index) => (
          <Reveal key={item.title} delay={index * 80} className="rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
            <h3 className="text-xl font-semibold">{item.title}</h3>
            <p className="mt-3 text-sm leading-7 text-[var(--color-text-muted)]">{item.description}</p>
          </Reveal>
        ))}
      </Section>

      <Section
        eyebrow={language === 'no' ? 'Case' : 'Cases'}
        title={t.home.casesPreview.title}
        subtitle={t.home.casesPreview.subtitle}
        contentClassName="grid gap-6 lg:grid-cols-3"
      >
        {t.cases.map((item, index) => (
          <Reveal key={item.company} delay={index * 90} className="rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--color-primary)]">{item.sector}</p>
            <h3 className="mt-3 text-2xl font-semibold">{item.company}</h3>
            <p className="mt-4 text-sm leading-7 text-[var(--color-text-muted)]">{item.result}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {item.metrics.map((metric) => (
                <span key={metric} className="rounded-full bg-[var(--color-tag)] px-3 py-1 text-xs font-medium text-[var(--color-primary)]">
                  {metric}
                </span>
              ))}
            </div>
          </Reveal>
        ))}
      </Section>

      <Section
        eyebrow={language === 'no' ? 'Blogg' : 'Blog'}
        title={t.home.blogPreview.title}
        subtitle={t.home.blogPreview.subtitle}
        contentClassName="grid gap-6 lg:grid-cols-3"
      >
        {featuredPosts.map((post, index) => (
          <Reveal key={post.slug} delay={index * 80} className="rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 transition hover:-translate-y-1">
            <div className="flex items-center justify-between text-sm text-[var(--color-text-subtle)]">
              <span>{post.category}</span>
              <span>{post.readingTime}</span>
            </div>
            <h3 className="mt-4 text-2xl font-semibold">{post.title}</h3>
            <p className="mt-3 text-sm leading-7 text-[var(--color-text-muted)]">{post.excerpt}</p>
            <p className="mt-6 text-sm text-[var(--color-text-subtle)]">{post.date}</p>
            <Link to={`/blog/${post.slug}`} className="mt-6 inline-flex text-sm font-semibold text-[var(--color-primary)] transition hover:text-[var(--color-accent)]">
              {t.common.readArticle}
            </Link>
          </Reveal>
        ))}
      </Section>

      <CTASection title={t.home.finalCta.title} description={t.home.finalCta.description} cta={t.home.finalCta.primaryCta} />
    </>
  );
}
