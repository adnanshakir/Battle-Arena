import React from 'react';

const variants = {
  default:   'bg-fg text-surface hover:opacity-90 border border-transparent',
  ghost:     'hover:bg-muted-bg text-subtle hover:text-fg border border-transparent',
  outline:   'border border-border hover:bg-muted-bg text-fg',
  secondary: 'bg-muted-bg text-fg hover:bg-border border border-transparent',
};

const sizes = {
  sm:   'h-8 px-3 text-xs gap-1.5',
  md:   'h-9 px-4 text-sm gap-2',
  lg:   'h-10 px-5 text-sm gap-2',
  icon: 'h-8 w-8 p-0',
};

export function Button({
  variant = 'default',
  size = 'md',
  className = '',
  children,
  ...props
}) {
  return (
    <button
      className={[
        'inline-flex items-center justify-center rounded-md font-medium',
        'transition-colors duration-150 cursor-pointer',
        'disabled:opacity-40 disabled:cursor-not-allowed',
        variants[variant],
        sizes[size],
        className,
      ].join(' ')}
      {...props}
    >
      {children}
    </button>
  );
}
