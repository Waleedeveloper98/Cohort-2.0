import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

export const SolutionCard = ({ title, subtitle, description, type, isLoading }) => {
  if (isLoading) {
    return (
      <div
        className="border relative flex flex-col"
        style={{
          backgroundColor: "var(--color-bg-surface-1)",
          borderColor: "var(--color-border-subtle)",
          borderRadius: "var(--radius-xl)",
          padding: "var(--space-7)",
          minHeight: "300px"
        }}
      >
        <div className="shimmer" style={{ width: "40%", height: "24px", marginBottom: "20px" }}></div>
        <div className="shimmer" style={{ width: "100%", height: "16px", marginBottom: "10px" }}></div>
        <div className="shimmer" style={{ width: "95%", height: "16px", marginBottom: "10px" }}></div>
        <div className="shimmer" style={{ width: "85%", height: "16px", marginBottom: "10px" }}></div>
        <div className="shimmer" style={{ width: "90%", height: "16px", marginBottom: "10px" }}></div>
        <div className="shimmer" style={{ width: "40%", height: "16px" }}></div>
      </div>
    );
  }

  const isSuccess = type === "success";
  const isError = type === "error";

  const bgColor = isSuccess
    ? "var(--color-bg-solution-1)"
    : isError
    ? "var(--color-bg-solution-2)"
    : "var(--color-bg-surface-1)";

  const borderColor = isSuccess
    ? "var(--color-success-border)"
    : isError
    ? "var(--color-error-border)"
    : "var(--color-text-white)";

  const titleColor = isSuccess
    ? "var(--color-success-text)"
    : isError
    ? "var(--color-error-text)"
    : "var(--color-text-white)";

  return (
    <div
      className="border relative flex flex-col transition-colors cursor-pointer"
      style={{
        backgroundColor: bgColor,
        borderColor: borderColor,
        borderRadius: "var(--radius-xl)",
        padding: "var(--space-7)",
      }}
    >
      <div style={{ paddingRight: "var(--space-16)" }}>
        <h2
          className="tracking-tight"
          style={{
            fontSize: "var(--font-size-lg)",
            fontWeight: "var(--font-weight-bold)",
            color: titleColor,
            marginBottom: "var(--space-1)",
          }}
        >
          {title}
        </h2>
      </div>

      <div
        style={{ marginTop: "var(--space-2)", marginBottom: "var(--space-4)" }}
      >
      </div>

      <div
        className="leading-relaxed whitespace-pre-wrap"
        style={{
          fontSize: "14px",
          color: "var(--color-text-slate-300)",
        }}
      >
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || "");
              return !inline && match ? (
                <SyntaxHighlighter
                  style={vscDarkPlus}
                  language={match[1]}
                  PreTag="div"
                  customStyle={{ borderRadius: "var(--radius-md)", margin: "var(--space-4) 0", backgroundColor: "var(--color-bg-base)" }}
                  {...props}
                >
                  {String(children).replace(/\n$/, "")}
                </SyntaxHighlighter>
              ) : (
                <code
                  className={className}
                  style={{
                    backgroundColor: "rgba(0,0,0,0.3)",
                    padding: "0.2em 0.4em",
                    borderRadius: "3px",
                    fontFamily: "monospace"
                  }}
                  {...props}
                >
                  {children}
                </code>
              );
            },
            h1: ({node, ...props}) => <h1 style={{ fontSize: "1.5em", fontWeight: "bold", marginTop: "1em", marginBottom: "0.5em" }} {...props} />,
            h2: ({node, ...props}) => <h2 style={{ fontSize: "1.25em", fontWeight: "bold", marginTop: "1em", marginBottom: "0.5em" }} {...props} />,
            h3: ({node, ...props}) => <h3 style={{ fontSize: "1.1em", fontWeight: "bold", marginTop: "1em", marginBottom: "0.5em" }} {...props} />,
            p: ({node, ...props}) => <p style={{ marginBottom: "1em" }} {...props} />,
            ul: ({node, ...props}) => <ul style={{ listStyleType: "disc", paddingLeft: "2em", marginBottom: "1em" }} {...props} />,
            ol: ({node, ...props}) => <ol style={{ listStyleType: "decimal", paddingLeft: "2em", marginBottom: "1em" }} {...props} />,
            li: ({node, ...props}) => <li style={{ marginBottom: "0.25em" }} {...props} />
          }}
        >
          {description || ""}
        </ReactMarkdown>
      </div>
    </div>
  );
};
