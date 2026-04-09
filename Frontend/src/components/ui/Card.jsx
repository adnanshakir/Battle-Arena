import React from 'react';

export function Card({ className = '', children, ...props }) {
  return (
    <div
      className={`bg-card border border-border rounded-lg ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ className = '', children, ...props }) {
  return (
    <div
      className={`px-4 py-3 border-b border-border flex items-center justify-between flex-shrink-0 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardContent({ className = '', children, ...props }) {
  return (
    <div className={`px-4 py-4 ${className}`} {...props}>
      {children}
    </div>
  );
}
