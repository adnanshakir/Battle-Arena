import React from 'react';

export function Card({ className = '', children, ...props }) {
  return (
    <div
      className={`bg-card border border-[#27272a] rounded-lg hover:shadow-sm ${className}`}
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
    <div className={`relative flex-1 ${className}`} {...props}>

      {/* Scroll layer */}
      <div className="h-full overflow-y-auto px-4 py-4">
        {children}
      </div>

      {/* Fade overlay (true edge) */}
      <div className="pointer-events-none absolute bottom-0 left-0 w-full h-10 bg-gradient-to-t from-surface to-transparent" />
    </div>
  );
}