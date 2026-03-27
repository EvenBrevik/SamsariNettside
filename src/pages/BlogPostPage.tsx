import { Link, Navigate, useParams } from 'react-router-dom';
import { useAppSettings } from '../providers/AppSettingsProvider';

export function BlogPostPage() {
  const { slug } = useParams();
  const { t } = useAppSettings();
  const post = t.blogPosts.find((entry) => entry.slug === slug);

  if (!post) return <Navigate to="/blog" replace />;

  return (
    <article className="px-4 pb-16 pt-28 sm:px-6 lg:px-8 lg:pb-24">
      <div className="mx-auto max-w-4xl">
        <div className="rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-surface)] p-8 shadow-premium sm:p-10 lg:p-14">
          <Link to="/blog" className="inline-flex text-sm font-semibold text-[var(--color-primary)] transition hover:text-[var(--color-accent)]">← {t.nav.blog}</Link>
          <div className="mt-8 flex flex-wrap items-center gap-3 text-sm text-[var(--color-text-subtle)]">
            <span className="rounded-full bg-[var(--color-tag)] px-3 py-1 text-[var(--color-primary)]">{post.category}</span>
            <span>{post.date}</span>
            <span>{post.readingTime}</span>
          </div>
          <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl">{post.title}</h1>
          <p className="mt-6 text-lg leading-8 text-[var(--color-text-muted)]">{post.excerpt}</p>
          <div className="mt-10 space-y-6">
            {post.body.map((paragraph) => (
              <p key={paragraph} className="text-lg leading-8 text-[var(--color-text-muted)]">{paragraph}</p>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
