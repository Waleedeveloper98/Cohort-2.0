import React from 'react';
import { PlayIcon, HelpIcon } from './Icons';

export const Sidebar = ({ prompt, setPrompt, handleSubmit }) => {
  const handleKeyDown = (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
      handleSubmit(e);
    }
  };

  return (
    <aside 
      className="flex flex-col shrink-0 border-r overflow-y-auto custom-scrollbar"
      style={{ 
        width: 'var(--sidebar-width)',
        height: '100%',
        borderColor: 'var(--color-border-subtle)',
        padding: 'var(--space-5)',
        backgroundColor: 'var(--color-bg-base)'
      }}
    >
      <form 
        onSubmit={handleSubmit}
        className="flex flex-col border"
        style={{ 
          backgroundColor: 'var(--color-bg-surface-1)',
          borderRadius: 'var(--radius-xl)',
          padding: 'var(--space-4)',
          borderColor: 'var(--color-border-subtle)'
        }}
      >
        <textarea
          className="bg-transparent outline-none resize-none"
          style={{ 
            height: '120px', 
            fontSize: 'var(--font-size-sm)',
            color: 'var(--color-text-slate-200)',
          }}
          placeholder="Refine your architecture..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={handleKeyDown}
        ></textarea>
        <button 
          type="submit"
          className="w-full flex items-center justify-center transition-colors hover:text-white"
          style={{ 
            marginTop: 'var(--space-4)',
            backgroundColor: 'var(--color-primary)',
            color: 'var(--color-text-white)',
            paddingTop: 'var(--space-2-5)',
            paddingBottom: 'var(--space-2-5)',
            borderRadius: 'var(--radius-lg)',
            fontWeight: 'var(--font-weight-semibold)',
            fontSize: 'var(--font-size-sm)',
            gap: 'var(--space-2)',
          }}
        >
          <PlayIcon /> Analyze
        </button>
      </form>

      <div style={{ marginTop: 'var(--space-8)' }}>
        <h3 
          className="uppercase"
          style={{ 
            fontSize: 'var(--font-size-tiny)', 
            color: 'var(--color-text-slate-500)',
            fontWeight: 'var(--font-weight-bold)',
            letterSpacing: '0.15em',
            marginBottom: 'var(--space-4)',
            paddingLeft: 'var(--space-2)',
            paddingRight: 'var(--space-2)'
          }}
        >
          Suggestions
        </h3>
        <div className="flex flex-col" style={{ gap: 'var(--space-2)' }}>
          {["Compare cloud security models", "Analyze data streaming costs", "Evaluate multi-region failover"].map((sug, i) => (
            <button 
              key={i}
              className="text-left bg-transparent border transition-colors hover:text-white"
              style={{ 
                fontSize: 'var(--font-size-xs)',
                borderColor: 'var(--color-border-subtle)',
                borderRadius: 'var(--radius-lg)',
                paddingLeft: 'var(--space-4)',
                paddingRight: 'var(--space-4)',
                paddingTop: 'var(--space-3-5)',
                paddingBottom: 'var(--space-3-5)',
                color: 'var(--color-text-slate-400)',
              }}
              type="button"
              onClick={() => setPrompt(sug)}
            >
              {sug}
            </button>
          ))}
        </div>
      </div>

      <div 
        className="flex flex-col items-center"
        style={{ 
          marginTop: 'auto', 
          paddingLeft: 'var(--space-1)', 
          paddingRight: 'var(--space-1)' 
        }}
      >
        <div 
          className="text-center flex flex-col justify-center"
          style={{ 
            marginBottom: 'var(--space-6)', 
            gap: 'var(--space-1-5)', 
            color: 'var(--color-text-slate-500)' 
          }}
        >
          <p 
            className="uppercase flex items-center justify-center"
            style={{ 
              fontSize: 'var(--font-size-tiny)', 
              fontWeight: 'var(--font-weight-bold)', 
              letterSpacing: '0.1em',
              gap: 'var(--space-1-5)'
            }}
          >
            Press{" "}
            <span 
              className="border"
              style={{ 
                backgroundColor: 'var(--color-bg-cmd)', 
                color: 'var(--color-text-slate-300)', 
                paddingLeft: 'var(--space-1-5)', 
                paddingRight: 'var(--space-1-5)',
                paddingTop: 'var(--space-0-5)',
                paddingBottom: 'var(--space-0-5)',
                borderRadius: 'var(--radius-sm)',
                borderColor: 'var(--color-border-subtle)'
              }}
            >
              CMD + ENTER
            </span>{" "}
            to send
          </p>
          <p 
            className="uppercase"
            style={{ 
              fontSize: 'var(--font-size-tiny)', 
              fontWeight: 'var(--font-weight-bold)', 
              letterSpacing: '0.1em' 
            }}
          >
            AI models can make mistakes
          </p>
        </div>
        <button 
          className="flex items-center justify-start w-full transition-colors hover:text-white"
          style={{ 
            gap: 'var(--space-2)', 
            fontSize: 'var(--font-size-sm)', 
            color: 'var(--color-text-slate-400)',
            paddingTop: 'var(--space-2)',
            paddingBottom: 'var(--space-2)'
          }}
        >
          <HelpIcon /> Help Center
        </button>
      </div>
    </aside>
  );
};
