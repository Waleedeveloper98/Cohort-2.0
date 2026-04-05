import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
export const VerdictCard = ({ message, isLoading }) => {
  if (isLoading) {
    return (
      <div
        className="border relative"
        style={{
          marginTop: "var(--space-14)",
          backgroundColor: "var(--color-bg-verdict)",
          borderColor: "var(--color-border-subtle)",
          borderRadius: "var(--radius-2xl)",
          padding: "var(--space-10)",
        }}
      >
        <div className="flex items-center justify-around mb-12">
            <div className="flex flex-col items-center">
                <div className="shimmer mb-4" style={{ width: "120px", height: "100px" }}></div>
                <div className="shimmer" style={{ width: "100px", height: "14px" }}></div>
            </div>
            <div className="shimmer" style={{ width: "1px", height: "120px" }}></div>
            <div className="flex flex-col items-center">
                <div className="shimmer mb-4" style={{ width: "120px", height: "100px" }}></div>
                <div className="shimmer" style={{ width: "100px", height: "14px" }}></div>
            </div>
        </div>
        <div className="grid grid-cols-2 gap-8">
            <div className="shimmerBox p-6 border rounded-2xl" style={{ borderColor: "var(--color-border-subtle)" }}>
                <div className="shimmer mb-4" style={{ width: "150px", height: "20px" }}></div>
                <div className="shimmer mb-2" style={{ width: "100%", height: "14px" }}></div>
                <div className="shimmer mb-2" style={{ width: "95%", height: "14px" }}></div>
                <div className="shimmer" style={{ width: "40%", height: "14px" }}></div>
            </div>
            <div className="shimmerBox p-6 border rounded-2xl" style={{ borderColor: "var(--color-border-subtle)" }}>
                <div className="shimmer mb-4" style={{ width: "150px", height: "20px" }}></div>
                <div className="shimmer mb-2" style={{ width: "100%", height: "14px" }}></div>
                <div className="shimmer mb-2" style={{ width: "95%", height: "14px" }}></div>
                <div className="shimmer" style={{ width: "40%", height: "14px" }}></div>
            </div>
        </div>
      </div>
    );
  }

  const score1 = message?.solution_1_score;
  const score2 = message?.solution_2_score;

  // Default to white/neutral
  let s1Color = "var(--color-text-white)";
  let s1BadgeBg = "var(--color-bg-cmd)";
  let s1Shadow = "none";
  let s1Border = "var(--color-border-subtle)";

  let s2Color = "var(--color-text-white)";
  let s2BadgeBg = "var(--color-bg-cmd)";
  let s2Shadow = "none";
  let s2Border = "var(--color-border-subtle)";

  if (score1 !== undefined && score2 !== undefined) {
    if (score1 > score2) {
      s1Color = "var(--color-success-text)";
      s1BadgeBg = "var(--color-success-bg)";
      s1Shadow = "var(--shadow-glow-emerald)";
      s1Border = "var(--color-success-border)";

      s2Color = "var(--color-error-text)";
      s2BadgeBg = "var(--color-error-bg)";
      s2Shadow = "var(--shadow-glow-red)";
      s2Border = "var(--color-error-border)";
    } else if (score2 > score1) {
      s1Color = "var(--color-error-text)";
      s1BadgeBg = "var(--color-error-bg)";
      s1Shadow = "var(--shadow-glow-red)";
      s1Border = "var(--color-error-border)";

      s2Color = "var(--color-success-text)";
      s2BadgeBg = "var(--color-success-bg)";
      s2Shadow = "var(--shadow-glow-emerald)";
      s2Border = "var(--color-success-border)";
    }
  }

  return (
    <div
      className="border relative"
      style={{
        marginTop: "var(--space-14)",
        backgroundColor: "var(--color-bg-verdict)",
        borderColor: "var(--color-warning-border)",
        borderRadius: "var(--radius-2xl)",
        padding: "var(--space-10)",
      }}
    >
      <div
        className="absolute"
        style={{ top: "-14px", left: "var(--space-10)" }}
      >
        <div
          className="uppercase border"
          style={{
            backgroundColor: "var(--color-warning-bg)",
            color: "var(--color-text-white)",
            fontSize: "var(--font-size-tiny)",
            fontWeight: "var(--font-weight-bold)",
            paddingLeft: "var(--space-4)",
            paddingRight: "var(--space-4)",
            paddingTop: "var(--space-1-5)",
            paddingBottom: "var(--space-1-5)",
            borderRadius: "var(--radius-full)",
            letterSpacing: "0.15em",
            borderColor: "var(--color-warning-border)",
            boxShadow: "var(--shadow-glow-warning)",
          }}
        >
          The Judge Verdict
        </div>
      </div>

      {/* Top area inside Verdict */}
      <div
        className="flex items-center relative"
        style={{
          paddingBottom: "var(--space-10)",
          paddingTop: "var(--space-4)",
        }}
      >
        {/* Solution 1 Score */}
        <div className="flex-1 flex flex-col items-center justify-center">
          <div
            className="tracking-tighter leading-none transition-colors duration-500"
            style={{
              fontSize: "var(--font-size-huge)",
              fontWeight: "var(--font-weight-black)",
              color: s1Color,
              textShadow: s1Shadow,
            }}
          >
            {score1 || 0}/10
          </div>
          <div
            className="uppercase transition-colors duration-500"
            style={{
              color: s1Color,
              fontWeight: "var(--font-weight-bold)",
              fontSize: "var(--font-size-tiny)",
              letterSpacing: "0.25em",
              marginTop: "var(--space-3)",
            }}
          >
            Solution 1 Score
          </div>
        </div>

        <div
          style={{
            width: "1px",
            height: "8rem",
            backgroundColor: "var(--color-border-subtle)",
          }}
        ></div>

        {/* Solution 2 Score */}
        <div className="flex-1 flex flex-col items-center justify-center">
          <div
            className="tracking-tighter leading-none transition-colors duration-500"
            style={{
              fontSize: "var(--font-size-huge)",
              fontWeight: "var(--font-weight-black)",
              color: s2Color,
              textShadow: s2Shadow,
            }}
          >
            {score2 || 0}/10
          </div>
          <div
            className="uppercase transition-colors duration-500"
            style={{
              color: s2Color,
              fontWeight: "var(--font-weight-bold)",
              fontSize: "var(--font-size-tiny)",
              letterSpacing: "0.25em",
              marginTop: "var(--space-3)",
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
            color: "var(--color-warning-bg)",
          }}
        >
          <svg width="140" height="140" viewBox="0 0 24 24" fill="currentColor">
            <path d="M14 6l4 4-2 2-4-4 2-2zm-3.5 3.5l4 4L4 24l-4-4 10.5-10.5z" />
          </svg>
        </div>
      </div>

      {/* Bottom Reasonings area */}
      <div
        className="grid grid-cols-2"
        style={{ gap: "var(--space-6)", marginTop: "var(--space-2)" }}
      >
        <div
          className="border relative overflow-hidden transition-all duration-500"
          style={{
            backgroundColor: "var(--color-bg-solution-1-reasoning)",
            borderColor: s1Border,
            borderRadius: "var(--radius-xl)",
            padding: "var(--space-5)",
          }}
        >
          <div
            className="flex items-center"
            style={{
              gap: "var(--space-2-5)",
              marginBottom: "var(--space-3-5)",
            }}
          >
            <span
              className="transition-colors duration-500"
              style={{
                backgroundColor: s1BadgeBg,
                color: "var(--color-text-white)",
                fontSize: "var(--font-size-tiny)",
                fontWeight: "var(--font-weight-bold)",
                paddingLeft: "var(--space-2)",
                paddingRight: "var(--space-2)",
                paddingTop: "var(--space-0-5)",
                paddingBottom: "var(--space-0-5)",
                borderRadius: "var(--radius-sm)",
              }}
            >
              {score1 || 0}/10
            </span>
            <span
              className="uppercase transition-colors duration-500"
              style={{
                color: s1Color,
                fontWeight: "var(--font-weight-bold)",
                fontSize: "var(--font-size-tiny)",
                letterSpacing: "0.1em",
              }}
            >
              Solution 1 Reasoning
            </span>
          </div>
          <div
            className="italic leading-relaxed font-serif tracking-wide markdown-reasoning"
            style={{
              fontSize: "13px",
              color: "var(--color-text-slate-300)",
            }}
          >
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {message?.solution_1_reasoning || ""}
            </ReactMarkdown>
          </div>
        </div>

        <div
          className="border relative overflow-hidden transition-all duration-500"
          style={{
            backgroundColor: "var(--color-bg-solution-2-reasoning)",
            borderColor: s2Border,
            borderRadius: "var(--radius-xl)",
            padding: "var(--space-5)",
          }}
        >
          <div
            className="flex items-center"
            style={{
              gap: "var(--space-2-5)",
              marginBottom: "var(--space-3-5)",
            }}
          >
            <span
              className="transition-colors duration-500"
              style={{
                backgroundColor: s2BadgeBg,
                color: "var(--color-text-white)",
                fontSize: "var(--font-size-tiny)",
                fontWeight: "var(--font-weight-bold)",
                paddingLeft: "var(--space-2)",
                paddingRight: "var(--space-2)",
                paddingTop: "var(--space-0-5)",
                paddingBottom: "var(--space-0-5)",
                borderRadius: "var(--radius-sm)",
              }}
            >
              {score2 || 0}/10
            </span>
            <span
              className="uppercase transition-colors duration-500"
              style={{
                color: s2Color,
                fontWeight: "var(--font-weight-bold)",
                fontSize: "var(--font-size-tiny)",
                letterSpacing: "0.1em",
              }}
            >
              Solution 2 Reasoning
            </span>
          </div>
          <div
            className="italic leading-relaxed font-serif tracking-wide markdown-reasoning"
            style={{
              fontSize: "13px",
              color: "var(--color-text-slate-300)",
            }}
          >
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {message?.solution_2_reasoning || ""}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
};
