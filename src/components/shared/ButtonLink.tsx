import { Link } from 'react-router-dom';

type ButtonLinkProps = { to: string; children: string; variant?: 'primary' | 'secondary' | 'ghost'; className?: string };

const variantClasses: Record<NonNullable<ButtonLinkProps['variant']>, string> = {
  primary:
    'bg-[linear-gradient(135deg,var(--color-button-primary),var(--color-button-accent))] text-[var(--color-white)] shadow-glow hover:-translate-y-0.5 hover:shadow-premium focus-visible:shadow-premium',
  secondary:
    'border border-[var(--color-border-strong)] bg-[var(--color-surface-elevated)] text-[var(--color-text)] hover:-translate-y-0.5 hover:border-[var(--color-accent)] hover:bg-[var(--color-button-secondary-hover)] hover:shadow-soft',
  ghost: 'text-[var(--color-text)] hover:text-[var(--color-link-hover)]',
};

export function ButtonLink({ to, children, variant = 'primary', className = '' }: ButtonLinkProps) {
  const base = `inline-flex min-h-11 items-center justify-center rounded-2xl px-5 py-3 text-center text-sm font-semibold transition duration-300 ${variantClasses[variant]} ${className}`;
  if (to.startsWith('http')) {
    return <a href={to} target="_blank" rel="noreferrer" className={base}>{children}</a>;
  }
  return <Link to={to} className={base}>{children}</Link>;
}
