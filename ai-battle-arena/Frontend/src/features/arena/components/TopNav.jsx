import React from 'react';
import { LogoIcon, HistoryIcon, SettingsIcon } from './Icons';

export const TopNav = () => {
  return (
    <nav 
      className="flex items-center justify-between fixed top-0 w-full z-50 shrink-0 border-b"
      style={{
        height: 'var(--nav-height)',
        paddingLeft: 'var(--space-6)',
        paddingRight: 'var(--space-6)',
        borderColor: 'var(--color-border-subtle)',
        backgroundColor: 'var(--color-bg-base)',
      }}
    >
      <div className="flex items-center" style={{ gap: 'var(--space-3)' }}>
        <div style={{ color: 'var(--color-primary)' }}>
          <LogoIcon />
        </div>
        <span 
          className="tracking-wide"
          style={{ 
            fontWeight: 'var(--font-weight-bold)', 
            fontSize: 'var(--font-size-lg)',
            color: 'var(--color-text-slate-100)'
          }}
        >
          Ai Battle Arena
        </span>
      </div>
      <div className="flex items-center" style={{ gap: 'var(--space-6)' }}>
        <button 
          className="transition-colors hover:text-white"
          style={{ color: 'var(--color-text-slate-400)' }}
        >
          <HistoryIcon />
        </button>
        <button 
          className="transition-colors hover:text-white"
          style={{ color: 'var(--color-text-slate-400)' }}
        >
          <SettingsIcon />
        </button>
        <button 
          className="flex items-center justify-center overflow-hidden border-2 outline outline-1"
          style={{ 
            width: 'var(--space-8)', 
            height: 'var(--space-8)', 
            borderRadius: 'var(--radius-full)',
            backgroundColor: 'var(--color-text-slate-200)',
            borderColor: 'var(--color-bg-base)',
            outlineColor: 'var(--color-text-slate-500)'
          }}
        >
          <img
            src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
            alt="User avatar"
            className="w-full h-full object-cover"
          />
        </button>
      </div>
    </nav>
  );
};
