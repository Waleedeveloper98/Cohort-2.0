import React from 'react';

export const SolutionCard = ({ title, subtitle, score, scoreIcon, metricText, metricIcon: MetricIcon, description, type }) => {
  const isSuccess = type === 'success';
  const bgColor = isSuccess ? 'var(--color-bg-solution-1)' : 'var(--color-bg-solution-2)';
  const borderColor = isSuccess ? 'var(--color-success-border)' : 'var(--color-error-border)';
  const metricColor = isSuccess ? 'var(--color-success-text)' : 'var(--color-error-text)';
  const metricBg = isSuccess ? 'var(--color-success-bg-subtle)' : 'var(--color-error-bg-subtle)';
  const badgeBg = isSuccess ? 'var(--color-success-bg)' : 'var(--color-error-bg)';

  return (
    <div 
      className="border relative flex flex-col transition-colors cursor-pointer"
      style={{ 
        backgroundColor: bgColor,
        borderColor: borderColor,
        borderRadius: 'var(--radius-xl)',
        padding: 'var(--space-7)',
      }}
    >
      <div style={{ paddingRight: 'var(--space-16)' }}>
        <h2 
          className="tracking-tight"
          style={{ 
            fontSize: 'var(--font-size-lg)',
            fontWeight: 'var(--font-weight-bold)',
            color: 'var(--color-text-slate-100)',
            marginBottom: 'var(--space-1)'
          }}
        >
          {title}
        </h2>
        <p 
          style={{ 
            fontSize: '13px',
            color: 'var(--color-text-slate-500)',
            fontWeight: 'var(--font-weight-medium)'
          }}
        >
          {subtitle}
        </p>
      </div>

      <div className="absolute" style={{ top: 'var(--space-7)', right: 'var(--space-7)' }}>
        <div 
          className="flex items-center justify-center font-bold"
          style={{ 
            backgroundColor: badgeBg,
            color: 'var(--color-text-white)',
            fontSize: 'var(--font-size-xs)',
            paddingLeft: 'var(--space-3)',
            paddingRight: 'var(--space-3)',
            paddingTop: 'var(--space-1-5)',
            paddingBottom: 'var(--space-1-5)',
            borderRadius: 'var(--radius-lg)',
            gap: 'var(--space-1)'
          }}
        >
          {score} <span style={{ fontSize: 'var(--font-size-tiny)' }}>{scoreIcon}</span>
        </div>
      </div>

      <div style={{ marginTop: 'var(--space-8)', marginBottom: 'var(--space-4)' }}>
        <div 
          className="flex items-center uppercase border w-fit"
          style={{ 
            gap: 'var(--space-2)',
            color: metricColor,
            fontWeight: 'var(--font-weight-bold)',
            letterSpacing: '0.1em',
            fontSize: 'var(--font-size-tiny)',
            backgroundColor: metricBg,
            borderColor: borderColor,
            paddingLeft: 'var(--space-2-5)',
            paddingRight: 'var(--space-2-5)',
            paddingTop: 'var(--space-1-5)',
            paddingBottom: 'var(--space-1-5)',
            borderRadius: 'var(--radius-md)'
          }}
        >
          <MetricIcon /> {metricText}
        </div>
      </div>

      <p 
        className="leading-relaxed"
        style={{ 
          fontSize: '14px',
          color: 'var(--color-text-slate-300)'
        }}
      >
        {description}
      </p>
    </div>
  );
};
