import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { PageHero } from '../components/shared/PageHero';
import { Reveal } from '../components/shared/Reveal';
import { Section } from '../components/shared/Section';
import { blogCategories } from '../content/siteContent';
import { useAppSettings } from '../providers/AppSettingsProvider';

export function BlogPage() {
  const { t } = useAppSettings();
  const [activeCategory, setActiveCategory] = useState<string>(t.common.categoryAll);

  const filteredPosts = useMemo(
    () => (activeCategory === t.common.categoryAll ? t.blogPosts : t.blogPosts.filter((post) => post.category === activeCategory)),
    [activeCategory, t],
  );

  return (
    <>
      <PageHero title={t.blogPage.title} subtitle={t.blogPage.subtitle} intro={t.blogPage.intro} />
      <Section contentClassName="space-y-8">
        <div className="flex flex-wrap gap-3">
          {[t.common.categoryAll, ...blogCategories].map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                activeCategory === category ? 'bg-[var(--color-primary)] text-white' : 'border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-subtle)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          {filteredPosts.map((post, index) => (
            <Reveal key={post.slug} delay={index * 60} className="rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-soft transition hover:-translate-y-1">
              <div className="flex flex-wrap items-center gap-3 text-sm text-[var(--color-text-subtle)]">
                <span className="rounded-full bg-[var(--color-tag)] px-3 py-1 text-[var(--color-primary)]">{post.category}</span>
                <span>{post.date}</span>
                <span>{post.readingTime}</span>
              </div>
              <h2 className="mt-5 text-2xl font-semibold">{post.title}</h2>
              <p className="mt-4 text-sm leading-7 text-[var(--color-text-muted)]">{post.excerpt}</p>
              <Link to={`/blog/${post.slug}`} className="mt-6 inline-flex text-sm font-semibold text-[var(--color-primary)] transition hover:text-[var(--color-accent)]">{t.common.readArticle}</Link>
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  );
}
