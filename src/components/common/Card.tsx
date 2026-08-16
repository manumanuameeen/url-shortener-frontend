import type { HTMLAttributes } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  subtitle?: string;
}

export function Card({ title, subtitle, children, className = '', ...props }: CardProps) {
  return (
    <div className={`auth-card ${className}`} {...props}>
      {(title || subtitle) && (
        <div className="auth-header">
          {title && <h1>{title}</h1>}
          {subtitle && <p>{subtitle}</p>}
        </div>
      )}
      {children}
    </div>
  );
}
