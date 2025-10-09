import { ReactNode } from 'react';

type BadgeVariant = 'active' | 'inactive' | 'pending' | 'suspended' | 'verified' | 'unverified' | 'success' | 'error' | 'warning' | 'info';

interface BadgeProps {
  variant: BadgeVariant;
  children: ReactNode;
  className?: string;
}

export function Badge({ variant, children, className = '' }: BadgeProps) {
  const variants = {
    active: 'badge-active',
    inactive: 'badge-inactive',
    pending: 'badge-pending',
    suspended: 'badge-suspended',
    verified: 'badge-verified',
    unverified: 'badge-unverified',
    success: 'badge bg-green-100 text-green-800',
    error: 'badge bg-red-100 text-red-800',
    warning: 'badge bg-yellow-100 text-yellow-800',
    info: 'badge bg-blue-100 text-blue-800',
  };

  return (
    <span className={`${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}
