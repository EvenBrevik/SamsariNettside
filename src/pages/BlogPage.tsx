import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Reveal } from '../components/shared/Reveal';
import { blogCategories } from '../content/siteContent';
import { useSEO } from '../hooks/useSEO';
import { useSanityPosts } from '../hooks/useSanityPosts';
import { formatPostDate, getExcerpt, getTitle } from '../lib/blogUtils';
import type { SanityPost } from '../lib/blogUtils';
import { urlFor } from '../lib/sanityImage';
import { useAppSettings } from '../providers/AppSettingsProvider';

/* ── Category pill ── */
function CategoryPill({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full px-4 py-2 text-sm font-medium transition ${
        active
          ? 'bg-[var(--color-primary)] text-white'
          : 'border border-[var(--color-border)] text-[var(--color-text-subtle)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]'
      }`}
    >
      {label}
    </button>
  );
}

/* ── Featured post card ── */
function FeaturedPost({ post, language, readLabel }: { post: SanityPost; language: string; readLabel: string }) {
  const title = getTitle(post, language as 'no' | 'en');
  const excerpt = getExcerpt(post, language as 'no' | 'en');

  return (
    <Link to={`/blog/${post.slug}`} className="group block">
      <article className="relative overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-soft transition hover:shadow-premium lg:grid lg:h-[480px] lg:grid-cols-[55%_45%]">
        {/* Gradient top accent */}
        <div className="absolute inset-x-0 top-0 z-10 h-px bg-[linear-gradient(90deg,transparent,var(--color-primary),var(--color-accent),transparent)] opacity-80" />

        {/* Image / fallback */}
        <div className="relative h-52 lg:h-full">
          {post.mainImage ? (
            <>
              <img
                src={urlFor(post.mainImage).width(900).height(600).fit('crop').url()}
                alt={post.mainImage.alt ?? title}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.02]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#020a0a]/50 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-[#020a0a]/10" />
            </>
          ) : (
            <div className="absolute inset-0 bg-[var(--color-dark)]">
              <div className="absolute inset-0 premium-grid opacity-[0.07]" />
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[7rem] font-semibold leading-none text-white/[0.04] select-none">
                {post.category.slice(0, 2).toUpperCase()}
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.2em] text-white/60">
                  {post.category}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-col justify-between p-7 lg:p-9">
          <div>
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="rounded-full bg-[var(--color-tag)] px-3 py-1 text-xs font-semibold text-[var(--color-primary)]">
                {post.category}
              </span>
              <span className="text-xs text-[var(--color-text-subtle)]">{formatPostDate(post.date, language as 'no' | 'en')}</span>
              <span className="text-xs text-[var(--color-text-subtle)]">·</span>
              <span className="text-xs text-[var(--color-text-subtle)]">{post.readingTime}</span>
            </div>
            <h2 className="mt-5 text-2xl font-semibold leading-snug tracking-tight transition group-hover:text-[var(--color-primary)] sm:text-3xl">
              {title}
            </h2>
            <p className="mt-4 text-base leading-7 text-[var(--color-text-muted)]">{excerpt}</p>
          </div>
          <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-[var(--color-primary)]">
            {readLabel}
            <svg viewBox="0 0 16 16" fill="currentColor" className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" aria-hidden="true">
              <path d="M13.78 7.22a.75.75 0 010 1.06l-5.25 5.25a.75.75 0 01-1.06-1.06l3.97-3.97H2.75a.75.75 0 010-1.5h8.69L7.47 2.97a.75.75 0 011.06-1.06l5.25 5.25z" />
            </svg>
          </div>
        </div>
      </article>
    </Link>
  );
}

/* ── Compact post card ── */
function PostCard({ post, language, readLabel }: { post: SanityPost; language: string; readLabel: string }) {
  const title = getTitle(post, language as 'no' | 'en');
  const excerpt = getExcerpt(post, language as 'no' | 'en');

  return (
    <Link to={`/blog/${post.slug}`} className="group block">
      <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-soft transition hover:shadow-premium hover:-translate-y-0.5">
        {/* Image */}
        <div className="relative h-44 shrink-0 overflow-hidden">
          {post.mainImage ? (
            <img
              src={urlFor(post.mainImage).width(600).height(320).fit('crop').url()}
              alt={post.mainImage.alt ?? title}
              className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
            />
          ) : (
            <div className="absolute inset-0 bg-[var(--color-surface-elevated)]">
              <div className="flex h-full items-center justify-center">
                <span className="rounded-full border border-[var(--color-border)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--color-text-subtle)]">
                  {post.category}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col p-5">
          <div className="flex items-center gap-2 text-xs text-[var(--color-text-subtle)]">
            <span className="rounded-full bg-[var(--color-tag)] px-2.5 py-0.5 font-semibold text-[var(--color-primary)]">
              {post.category}
            </span>
            <span>{post.readingTime}</span>
          </div>
          <h3 className="mt-3 flex-1 text-base font-semibold leading-snug transition group-hover:text-[var(--color-primary)]">
            {title}
          </h3>
          <p className="mt-2 line-clamp-2 text-sm leading-6 text-[var(--color-text-muted)]">{excerpt}</p>
          <div className="mt-4 flex items-center justify-between text-xs text-[var(--color-text-subtle)]">
            <span>{formatPostDate(post.date, language as 'no' | 'en')}</span>
            <span className="font-semibold text-[var(--color-primary)] transition group-hover:translate-x-0.5">
              {readLabel} →
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}

/* ── Skeleton ── */
function FeaturedSkeleton() {
  return (
    <div className="animate-pulse overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] lg:grid lg:h-[480px] lg:grid-cols-[55%_45%]">
      <div className="h-52 bg-[var(--color-surface-elevated)] lg:h-full" />
      <div className="p-7 lg:p-9">
        <div className="flex gap-3">
          <div className="h-6 w-24 rounded-full bg-[var(--color-surface-elevated)]" />
          <div className="h-6 w-20 rounded-full bg-[var(--color-surface-elevated)]" />
        </div>
        <div className="mt-5 h-8 w-3/4 rounded bg-[var(--color-surface-elevated)]" />
        <div className="mt-2 h-8 w-1/2 rounded bg-[var(--color-surface-elevated)]" />
        <div className="mt-5 space-y-2">
          <div className="h-4 w-full rounded bg-[var(--color-surface-elevated)]" />
          <div className="h-4 w-5/6 rounded bg-[var(--color-surface-elevated)]" />
          <div className="h-4 w-4/5 rounded bg-[var(--color-surface-elevated)]" />
        </div>
      </div>
    </div>
  );
}

function PostCardSkeleton() {
  return (
    <div className="animate-pulse overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]">
      <div className="h-44 bg-[var(--color-surface-elevated)]" />
      <div className="p-5">
        <div className="h-5 w-28 rounded-full bg-[var(--color-surface-elevated)]" />
        <div className="mt-3 h-5 w-3/4 rounded bg-[var(--color-surface-elevated)]" />
        <div className="mt-1 h-5 w-1/2 rounded bg-[var(--color-surface-elevated)]" />
        <div className="mt-3 h-4 w-full rounded bg-[var(--color-surface-elevated)]" />
      </div>
    </div>
  );
}

/* ── Page ── */
export function BlogPage() {
  const { t, language } = useAppSettings();
  useSEO({ title: language === 'no' ? 'Blogg' : 'Blog', description: language === 'no' ? 'Praktiske artikler om Power Platform, Microsoft 365, AI og automatisering fra Samsari.' : 'Practical articles about Power Platform, Microsoft 365, AI and automation from Samsari.', path: '/blog' });
  const [activeCategory, setActiveCategory] = useState<string>(t.common.categoryAll);
  const { posts, loading } = useSanityPosts();

  useEffect(() => {
    setActiveCategory(t.common.categoryAll);
  }, [t.common.categoryAll]);

  const filteredPosts = useMemo(
    () => activeCategory === t.common.categoryAll
      ? posts
      : posts.filter((p) => p.category === activeCategory),
    [activeCategory, posts, t.common.categoryAll],
  );

  const no = language === 'no';
  const featuredPost = filteredPosts[0];
  const remainingPosts = filteredPosts.slice(1);

  return (
    <>
      {/* ── Page header ── */}
      <section className="relative overflow-hidden px-4 pb-10 pt-28 sm:px-6 sm:pt-32 lg:px-8 lg:pt-36">
        {/* Subtle background accent */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,var(--color-primary),var(--color-accent),transparent)] opacity-40" />
        <div className="pointer-events-none absolute -right-32 top-0 h-80 w-80 rounded-full bg-[var(--color-accent-soft)] blur-[80px]" />

        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              {/* Left: title */}
              <div>
                <div className="mb-3 inline-flex items-center gap-3">
                  <span className="h-px w-8 bg-[linear-gradient(90deg,var(--color-primary),var(--color-accent))]" />
                  <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--color-primary)]">
                    {no ? 'Blogg & innsikt' : 'Blog & insights'}
                  </p>
                </div>
                <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">{t.blogPage.title}</h1>
                <p className="mt-3 max-w-xl text-base leading-7 text-[var(--color-text-muted)]">{t.blogPage.subtitle}</p>
              </div>

              {/* Right: post count */}
              {!loading && posts.length > 0 && (
                <p className="shrink-0 text-sm text-[var(--color-text-subtle)]">
                  {posts.length} {no ? 'artikler' : 'articles'}
                </p>
              )}
            </div>
          </Reveal>

          {/* Category filters */}
          <Reveal delay={80}>
            <div className="mt-8 flex flex-wrap gap-2 border-t border-[var(--color-border)] pt-6">
              <CategoryPill
                label={t.common.categoryAll}
                active={activeCategory === t.common.categoryAll}
                onClick={() => setActiveCategory(t.common.categoryAll)}
              />
              {blogCategories.map((cat) => (
                <CategoryPill
                  key={cat}
                  label={t.common.categoryLabels[cat]}
                  active={activeCategory === cat}
                  onClick={() => setActiveCategory(cat)}
                />
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Posts ── */}
      <section className="px-4 pb-24 pt-8 sm:px-6 lg:px-8 lg:pb-32">
        <div className="mx-auto max-w-7xl">

          {/* Loading */}
          {loading && (
            <div className="space-y-6">
              <FeaturedSkeleton />
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3].map((i) => <PostCardSkeleton key={i} />)}
              </div>
            </div>
          )}

          {/* Empty */}
          {!loading && filteredPosts.length === 0 && (
            <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] px-8 py-20 text-center">
              <p className="text-[var(--color-text-muted)]">
                {no ? 'Ingen artikler i denne kategorien.' : 'No articles in this category.'}
              </p>
              <button
                type="button"
                onClick={() => setActiveCategory(t.common.categoryAll)}
                className="mt-4 text-sm font-semibold text-[var(--color-primary)] hover:text-[var(--color-link-hover)]"
              >
                {no ? 'Vis alle →' : 'Show all →'}
              </button>
            </div>
          )}

          {/* Content */}
          {!loading && filteredPosts.length > 0 && (
            <div className="space-y-6">
              {/* Featured */}
              <Reveal>
                <FeaturedPost
                  post={featuredPost}
                  language={language}
                  readLabel={t.common.readArticle}
                />
              </Reveal>

              {/* Grid */}
              {remainingPosts.length > 0 && (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {remainingPosts.map((post, i) => (
                    <Reveal key={post.slug} delay={i * 60} className="h-full">
                      <PostCard
                        post={post}
                        language={language}
                        readLabel={t.common.readArticle}
                      />
                    </Reveal>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
