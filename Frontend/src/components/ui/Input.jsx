import React from 'react';

export function Input({ className = '', ...props }) {
  return (
    <input
      className={[
        'w-full h-8 px-3',
        'bg-card border border-border rounded-md',
        'text-fg text-sm placeholder:text-muted',
        'outline-none focus:border-subtle',
        'transition-colors duration-150',
        className,
      ].join(' ')}
      {...props}
    />
  );
}

export function Textarea({ className = '', ...props }) {
  return (
    <textarea
      className={[
        'w-full px-3 py-2.5',
        'bg-card border border-border rounded-md',
        'text-fg text-sm placeholder:text-muted',
        'outline-none focus:border-subtle',
        'transition-colors duration-150 resize-none',
        className,
      ].join(' ')}
      {...props}
    />
  );
}
