import { type ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  variant?: 'primary' | 'secondary' | 'danger';
}

export function Button({
  children,
  isLoading,
  variant = 'primary',
  className = '',
  ...props
}: ButtonProps) {
  const baseClass = 'auth-button'; // Reusing your existing CSS class for now
  const variantClass = variant === 'secondary' ? 'btn-secondary' : '';
  const loadingClass = isLoading ? 'btn-loading' : '';

  return (
    <button
      className={`${baseClass} ${variantClass} ${loadingClass} ${className}`}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? 'Loading...' : children}
    </button>
  );
}
