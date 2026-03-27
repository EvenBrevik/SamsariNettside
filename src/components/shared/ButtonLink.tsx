import { Link } from 'react-router-dom';

type ButtonLinkProps = { to: string; children: string; variant?: 'primary' | 'secondary' | 'ghost'; className?: string };

const variantClasses: Record<NonNullable<ButtonLinkProps['variant']>, string> = {
  primary: 'bg-[var(--color-button-primary)] text-[var(--color-white)] shadow-glow hover:-translate-y-0.5 hover:bg-[var(--color-button-primary-hover)] focus-visible:bg-[var(--color-button-primary-hover)]',
  secondary: 'border border-[var(--color-border-strong)] bg-[var(--color-surface-elevated)] text-[var(--color-text)] hover:-translate-y-0.5 hover:border-[var(--color-accent)] hover:bg-[var(--color-button-secondary-hover)]',
  ghost: 'text-[var(--color-text)] hover:text-[var(--color-link-hover)]',
};

export function ButtonLink({ to, children, variant = 'primary', className = '' }: ButtonLinkProps) {
  return <Link to={to} className={`inline-flex items-center justify-center rounded-2xl px-5 py-3 text-sm font-semibold transition duration-300 ${variantClasses[variant]} ${className}`}>{children}</Link>;
}
