import React from 'react';
import { UserIcon } from './Icons';

export const UserPrompt = () => {
  return (
    <div 
      className="flex border relative"
      style={{ 
        gap: 'var(--space-4)', 
        padding: 'var(--space-6)', 
        backgroundColor: 'var(--color-bg-surface-2)',
        borderRadius: 'var(--radius-xl)',
        borderColor: 'var(--color-border-subtle)',
      }}
    >
      <div className="shrink-0" style={{ marginTop: 'var(--space-0-5)' }}>
        <div 
          className="flex items-center justify-center border-2 rounded-full"
          style={{ 
            width: 'var(--space-8)', 
            height: 'var(--space-8)', 
            backgroundColor: 'var(--color-bg-surface-2)',
            borderColor: 'var(--color-border-medium)',
            color: 'var(--color-primary)'
          }}
        >
          <UserIcon />
        </div>
      </div>
      <div className="flex flex-col items-start" style={{ gap: 'var(--space-4)' }}>
        <p 
          className="leading-relaxed"
          style={{ 
            fontSize: '15px', 
            color: 'var(--color-text-slate-200)',
            fontWeight: 'var(--font-weight-medium)',
            maxWidth: '896px'
          }}
        >
          Architect a scalable cloud infrastructure for a real-time data
          streaming platform that handles 1M+ events per second. The
          solution must prioritize low latency and cost-efficiency.
        </p>
        <div 
          className="flex flex-wrap"
          style={{ gap: 'var(--space-2)', marginTop: 'var(--space-1)' }}
        >
          <span 
            className="uppercase border"
            style={{ 
              backgroundColor: 'var(--color-bg-surface-2)',
              color: 'var(--color-text-slate-400)',
              borderColor: 'var(--color-border-subtle)',
              fontSize: 'var(--font-size-tiny)',
              fontWeight: 'var(--font-weight-bold)',
              letterSpacing: '0.08em',
              paddingLeft: 'var(--space-3)',
              paddingRight: 'var(--space-3)',
              paddingTop: 'var(--space-1)',
              paddingBottom: 'var(--space-1)',
              borderRadius: '10px'
            }}
          >
            Cloud Architecture
          </span>
          <span 
            className="uppercase border"
            style={{ 
              backgroundColor: 'var(--color-bg-surface-2)',
              color: 'var(--color-text-slate-400)',
              borderColor: 'var(--color-border-subtle)',
              fontSize: 'var(--font-size-tiny)',
              fontWeight: 'var(--font-weight-bold)',
              letterSpacing: '0.08em',
              paddingLeft: 'var(--space-3)',
              paddingRight: 'var(--space-3)',
              paddingTop: 'var(--space-1)',
              paddingBottom: 'var(--space-1)',
              borderRadius: '10px'
            }}
          >
            Optimization
          </span>
        </div>
      </div>
    </div>
  );
};
