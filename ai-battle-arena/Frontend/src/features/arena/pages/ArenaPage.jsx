import React, { useState } from "react";
import { TopNav } from "../components/TopNav";
import { Sidebar } from "../components/Sidebar";
import { UserPrompt } from "../components/UserPrompt";
import { SolutionCard } from "../components/SolutionCard";
import { VerdictCard } from "../components/VerdictCard";
import { EmptyState } from "../components/EmptyState";
import { useArena } from "../hooks/useArena";

export default function ArenaPage() {
  const [prompt, setPrompt] = useState("");
  const [isAnalyzed, setIsAnalyzed] = useState(false);

  const { handleAiService, messages, setMessages, loading } = useArena();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    setIsAnalyzed(true);
    setMessages(null);
    await handleAiService({ input: prompt });
  };

  return (
    <div
      className="flex flex-col overflow-hidden"
      style={{
        height: "100vh",
        backgroundColor: "var(--color-bg-base)",
        color: "var(--color-text-slate-200)",
        fontFamily: "var(--font-family-base)",
      }}
    >
      <TopNav />

      {/* Main Layout Area */}
      <div
        className="flex flex-1 overflow-hidden w-full"
        style={{ paddingTop: "var(--nav-height)" }}
      >
        <Sidebar
          prompt={prompt}
          setPrompt={setPrompt}
          handleSubmit={handleSubmit}
        />

        {/* Main Content Area */}
        <main
          className="flex-1 overflow-y-auto custom-scrollbar"
          style={{
            height: "100%",
            padding: "var(--space-10)",
            backgroundColor: "var(--color-bg-base)",
          }}
        >
          <div
            className="flex flex-col mx-auto h-full"
            style={{
              maxWidth: "var(--max-content-width)",
              marginBottom: "var(--space-20)",
            }}
          >
            {!isAnalyzed ? (
              <EmptyState />
            ) : (
              <>
                <UserPrompt message={messages?.problem} prompt={prompt} />

                {/* Calculate winner states */}
                {(() => {
                  const score1 =
                    messages?.judge_recommendation?.solution_1_score;
                  const score2 =
                    messages?.judge_recommendation?.solution_2_score;

                  let s1Type = "neutral";
                  let s2Type = "neutral";

                  if (score1 !== undefined && score2 !== undefined) {
                    if (score1 > score2) {
                      s1Type = "success";
                      s2Type = "error";
                    } else if (score2 > score1) {
                      s1Type = "error";
                      s2Type = "success";
                    }
                  }

                  return (
                    <div
                      className="grid grid-cols-2"
                      style={{
                        gap: "var(--space-6)",
                        marginTop: "var(--space-8)",
                      }}
                    >
                      <SolutionCard
                        title="Solution 1"
                        description={messages?.solution_1}
                        type={s1Type}
                        isLoading={loading}
                      />

                      <SolutionCard
                        title="Solution 2"
                        description={messages?.solution_2}
                        type={s2Type}
                        isLoading={loading}
                      />
                    </div>
                  );
                })()}

                <VerdictCard
                  message={messages?.judge_recommendation}
                  isLoading={loading}
                />
              </>
            )}
          </div>
        </main>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background-color: var(--color-border-medium); border-radius: 20px; }
      `}</style>
    </div>
  );
}
