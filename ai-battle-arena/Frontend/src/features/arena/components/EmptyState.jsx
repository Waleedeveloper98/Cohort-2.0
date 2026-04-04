import React from 'react';

const LargeLogoIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 14l8-9 8 9" />
    <path d="M4 10l8 9 8-9" />
  </svg>
);

export const EmptyState = () => {
  return (
    <div 
      className="flex flex-col items-center justify-center h-full w-full text-center"
      style={{ padding: 'var(--space-10)', marginTop: '15vh' }}
    >
      <div 
        className="flex items-center justify-center border-2 rounded-full"
        style={{
          width: '5rem',
          height: '5rem',
          backgroundColor: 'var(--color-bg-surface-2)',
          borderColor: 'var(--color-border-subtle)',
          color: 'var(--color-primary)',
          marginBottom: 'var(--space-6)'
        }}
      >
        <LargeLogoIcon />
      </div>

      <h2 
        className="tracking-tight"
        style={{ 
          fontSize: 'var(--font-size-2xl)',
          fontWeight: 'var(--font-weight-bold)',
          color: 'var(--color-text-slate-100)',
          marginBottom: 'var(--space-3)'
        }}
      >
        Welcome to the AI Battle Arena
      </h2>
      
      <p 
        className="leading-relaxed"
        style={{ 
          fontSize: 'var(--font-size-base)',
          color: 'var(--color-text-slate-400)',
          maxWidth: '500px',
          margin: '0 auto'
        }}
      >
        Enter a complex architectural question or engineering problem in the sidebar. 
        Compare multiple models side-by-side with an impartial judge verdict.
      </p>
    </div>
  );
};
