import React from "react";
import { UserIcon } from "./Icons";

export const UserPrompt = ({ message, prompt }) => {
  return (
    <div
      className="flex border relative"
      style={{
        gap: "var(--space-4)",
        padding: "var(--space-6)",
        backgroundColor: "var(--color-bg-surface-2)",
        borderRadius: "var(--radius-xl)",
        borderColor: "var(--color-border-subtle)",
      }}
    >
      <div className="shrink-0" style={{ marginTop: "var(--space-0-5)" }}>
        <div
          className="flex items-center justify-center border-2 rounded-full"
          style={{
            width: "var(--space-8)",
            height: "var(--space-8)",
            backgroundColor: "var(--color-bg-surface-2)",
            borderColor: "var(--color-border-medium)",
            color: "var(--color-primary)",
          }}
        >
          <UserIcon />
        </div>
      </div>
      <div
        className="flex flex-col items-start"
        style={{ gap: "var(--space-4)" }}
      >
        <p
          className="leading-relaxed"
          style={{
            fontSize: "15px",
            color: "var(--color-text-slate-200)",
            fontWeight: "var(--font-weight-medium)",
            maxWidth: "896px",
          }}
        >
          {prompt || message}
        </p>
      </div>
    </div>
  );
};
