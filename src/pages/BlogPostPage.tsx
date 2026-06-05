import { PortableText, type PortableTextComponents } from '@portabletext/react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { useSEO } from '../hooks/useSEO';
import { useSanityPost } from '../hooks/useSanityPost';
import { formatPostDate, getBody, getExcerpt, getTitle } from '../lib/blogUtils';
import { urlFor } from '../lib/sanityImage';
import { useAppSettings } from '../providers/AppSettingsProvider';

const portableTextComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="text-lg leading-8 text-[var(--color-text-muted)]">{children}</p>
    ),
    h2: ({ children }) => (
      <h2 className="mt-8 text-2xl font-semibold tracking-tight">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-6 text-xl font-semibold">{children}</h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-[var(--color-primary)] pl-4 italic text-[var(--color-text-muted)]">
        {children}
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-[var(--color-text)]">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
    link: ({ value, children }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noreferrer"
        className="text-[var(--color-primary)] underline hover:text-[var(--color-link-hover)]"
      >
        {children}
      </a>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc space-y-2 pl-6 text-[var(--color-text-muted)]">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal space-y-2 pl-6 text-[var(--color-text-muted)]">{children}</ol>
    ),
  },
};

function BlogPostContent({ slug }: { slug: string }) {
  const { t, language } = useAppSettings();
  const { post, loading } = useSanityPost(slug);
  useSEO({
    title: post ? getTitle(post, language) : '',
    description: post ? getExcerpt(post, language) : '',
    path: post ? `/blog/${slug}` : '/blog',
    type: 'article',
  });

  if (loading) return <BlogPostSkeleton />;
  if (!post) return <Navigate to="/blog" replace />;

  const body = getBody(post, language);

  return (
    <article className="px-4 pb-16 pt-28 sm:px-6 lg:px-8 lg:pb-24">
      <div className="mx-auto max-w-4xl">
        <div className="rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-surface)] p-8 shadow-premium sm:p-10 lg:p-14">
          <Link
            to="/blog"
            className="inline-flex items-center text-sm font-semibold text-[var(--color-primary)] transition hover:text-[var(--color-link-hover)]"
          >
            <span aria-hidden="true">&larr;</span>
            <span className="ml-2">{t.nav.blog}</span>
          </Link>
          <div className="mt-8 flex flex-wrap items-center gap-3 text-sm text-[var(--color-text-subtle)]">
            <span className="rounded-full bg-[var(--color-tag)] px-3 py-1 text-[var(--color-primary)]">
              {t.common.categoryLabels[post.category]}
            </span>
            <span>{formatPostDate(post.date, language)}</span>
            <span>{post.readingTime}</span>
          </div>
          <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl">
            {getTitle(post, language)}
          </h1>
          <p className="mt-6 text-lg leading-8 text-[var(--color-text-muted)]">
            {getExcerpt(post, language)}
          </p>
          {post.mainImage && (
            <div className="mt-8 overflow-hidden rounded-[2rem]">
              <img
                src={urlFor(post.mainImage).width(1200).height(560).fit('crop').url()}
                alt={post.mainImage.alt ?? getTitle(post, language)}
                className="w-full object-cover"
              />
            </div>
          )}
          <div className="mt-10 space-y-6">
            {body.length > 0 ? (
              <PortableText
                value={body as unknown as Parameters<typeof PortableText>[0]['value']}
                components={portableTextComponents}
              />
            ) : (
              <p className="text-lg leading-8 text-[var(--color-text-muted)]">
                {getExcerpt(post, language)}
              </p>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

function BlogPostSkeleton() {
  return (
    <div className="px-4 pb-16 pt-28 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl animate-pulse rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-surface)] p-8 sm:p-10 lg:p-14">
        <div className="h-4 w-16 rounded bg-[var(--color-surface-elevated)]" />
        <div className="mt-8 flex gap-3">
          <div className="h-6 w-28 rounded-full bg-[var(--color-surface-elevated)]" />
          <div className="h-6 w-20 rounded-full bg-[var(--color-surface-elevated)]" />
        </div>
        <div className="mt-6 h-10 w-3/4 rounded bg-[var(--color-surface-elevated)]" />
        <div className="mt-6 h-6 w-full rounded bg-[var(--color-surface-elevated)]" />
        <div className="mt-10 space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-5 rounded bg-[var(--color-surface-elevated)]" style={{ width: `${90 - i * 5}%` }} />
          ))}
        </div>
      </div>
    </div>
  );
}

export function BlogPostPage() {
  const { slug } = useParams();
  if (!slug) return <Navigate to="/blog" replace />;
  return <BlogPostContent slug={slug} />;
}
