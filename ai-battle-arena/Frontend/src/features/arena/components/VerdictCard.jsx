import React from 'react';

export const VerdictCard = () => {
  return (
    <div 
      className="border relative"
      style={{ 
        marginTop: 'var(--space-14)',
        backgroundColor: 'var(--color-bg-verdict)',
        borderColor: 'var(--color-warning-border)',
        borderRadius: 'var(--radius-2xl)',
        padding: 'var(--space-10)'
      }}
    >
      <div className="absolute" style={{ top: '-14px', left: 'var(--space-10)' }}>
        <div 
          className="uppercase border"
          style={{ 
            backgroundColor: 'var(--color-warning-bg)',
            color: 'var(--color-text-white)',
            fontSize: 'var(--font-size-tiny)',
            fontWeight: 'var(--font-weight-bold)',
            paddingLeft: 'var(--space-4)',
            paddingRight: 'var(--space-4)',
            paddingTop: 'var(--space-1-5)',
            paddingBottom: 'var(--space-1-5)',
            borderRadius: 'var(--radius-full)',
            letterSpacing: '0.15em',
            borderColor: 'var(--color-warning-border)',
            boxShadow: 'var(--shadow-glow-warning)'
          }}
        >
          The Judge Verdict
        </div>
      </div>

      {/* Top area inside Verdict */}
      <div 
        className="flex items-center relative"
        style={{ 
          paddingBottom: 'var(--space-10)', 
          paddingTop: 'var(--space-4)' 
        }}
      >
        {/* Solution 1 Score */}
        <div className="flex-1 flex flex-col items-center justify-center">
          <div 
            className="tracking-tighter leading-none"
            style={{ 
              fontSize: 'var(--font-size-huge)',
              fontWeight: 'var(--font-weight-black)',
              color: 'var(--color-success-text)',
              textShadow: 'var(--shadow-glow-emerald)'
            }}
          >
            8/10
          </div>
          <div 
            className="uppercase"
            style={{ 
              color: 'var(--color-success-text)',
              fontWeight: 'var(--font-weight-bold)',
              fontSize: 'var(--font-size-tiny)',
              letterSpacing: '0.25em',
              marginTop: 'var(--space-3)'
            }}
          >
            Solution 1 Score
          </div>
        </div>

        <div 
          style={{ 
            width: '1px', 
            height: '8rem', 
            backgroundColor: 'var(--color-border-subtle)' 
          }}
        ></div>

        {/* Solution 2 Score */}
        <div className="flex-1 flex flex-col items-center justify-center">
          <div 
            className="tracking-tighter leading-none"
            style={{ 
              fontSize: 'var(--font-size-huge)',
              fontWeight: 'var(--font-weight-black)',
              color: 'var(--color-error-text)',
              textShadow: 'var(--shadow-glow-red)'
            }}
          >
            5/10
          </div>
          <div 
            className="uppercase"
            style={{ 
              color: 'var(--color-error-text)',
              fontWeight: 'var(--font-weight-bold)',
              fontSize: 'var(--font-size-tiny)',
              letterSpacing: '0.25em',
              marginTop: 'var(--space-3)'
            }}
          >
            Solution 2 Score
          </div>
        </div>

        {/* Gavel icon faintly in the background right */}
        <div 
          className="absolute right-0 top-0 pointer-events-none"
          style={{ 
            opacity: 0.03,
            color: 'var(--color-warning-bg)'
          }}
        >
          <svg
            width="140"
            height="140"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M14 6l4 4-2 2-4-4 2-2zm-3.5 3.5l4 4L4 24l-4-4 10.5-10.5z" />
          </svg>
        </div>
      </div>

      {/* Bottom Reasonings area */}
      <div className="grid grid-cols-2" style={{ gap: 'var(--space-6)', marginTop: 'var(--space-2)' }}>
        <div 
          className="border relative overflow-hidden transition-colors"
          style={{ 
            backgroundColor: 'var(--color-bg-solution-1-reasoning)',
            borderColor: 'var(--color-success-bg-subtle)',
            borderRadius: 'var(--radius-xl)',
            padding: 'var(--space-5)'
          }}
        >
          <div className="flex items-center" style={{ gap: 'var(--space-2-5)', marginBottom: 'var(--space-3-5)' }}>
            <span 
              style={{ 
                backgroundColor: 'var(--color-success-bg)',
                color: 'var(--color-text-white)',
                fontSize: 'var(--font-size-tiny)',
                fontWeight: 'var(--font-weight-bold)',
                paddingLeft: 'var(--space-2)',
                paddingRight: 'var(--space-2)',
                paddingTop: 'var(--space-0-5)',
                paddingBottom: 'var(--space-0-5)',
                borderRadius: 'var(--radius-sm)'
              }}
            >
              8/10
            </span>
            <span 
              className="uppercase"
              style={{ 
                color: 'var(--color-success-text)',
                fontWeight: 'var(--font-weight-bold)',
                fontSize: 'var(--font-size-tiny)',
                letterSpacing: '0.1em'
              }}
            >
              Solution 1 Reasoning
            </span>
          </div>
          <p 
            className="italic leading-relaxed font-serif tracking-wide"
            style={{ 
              fontSize: '13px',
              color: 'var(--color-text-slate-300)'
            }}
          >
            "Detailed, well-structured, and highly efficient. The
            cost-to-performance ratio is optimized for massive scale."
          </p>
        </div>

        <div 
          className="border relative overflow-hidden transition-colors"
          style={{ 
            backgroundColor: 'var(--color-bg-solution-2-reasoning)',
            borderColor: 'var(--color-error-bg-subtle)',
            borderRadius: 'var(--radius-xl)',
            padding: 'var(--space-5)'
          }}
        >
          <div className="flex items-center" style={{ gap: 'var(--space-2-5)', marginBottom: 'var(--space-3-5)' }}>
            <span 
              style={{ 
                backgroundColor: 'var(--color-error-bg)',
                color: 'var(--color-text-white)',
                fontSize: 'var(--font-size-tiny)',
                fontWeight: 'var(--font-weight-bold)',
                paddingLeft: 'var(--space-2)',
                paddingRight: 'var(--space-2)',
                paddingTop: 'var(--space-0-5)',
                paddingBottom: 'var(--space-0-5)',
                borderRadius: 'var(--radius-sm)'
              }}
            >
              5/10
            </span>
            <span 
              className="uppercase"
              style={{ 
                color: 'var(--color-error-text)',
                fontWeight: 'var(--font-weight-bold)',
                fontSize: 'var(--font-size-tiny)',
                letterSpacing: '0.1em'
              }}
            >
              Solution 2 Reasoning
            </span>
          </div>
          <p 
            className="italic leading-relaxed font-serif tracking-wide"
            style={{ 
              fontSize: '13px',
              color: 'var(--color-text-slate-300)'
            }}
          >
            "Lacks detail regarding regional failovers, slightly
            inefficient for multi-region setups, and missing key
            security features."
          </p>
        </div>
      </div>
    </div>
  );
};
