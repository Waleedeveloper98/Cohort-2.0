import React, { useState } from "react";
import { TopNav } from "../components/TopNav";
import { Sidebar } from "../components/Sidebar";
import { UserPrompt } from "../components/UserPrompt";
import { SolutionCard } from "../components/SolutionCard";
import { VerdictCard } from "../components/VerdictCard";
import { EmptyState } from "../components/EmptyState";
import { CheckIcon, AlertIcon } from "../components/Icons";

export default function ArenaPage() {
  const [prompt, setPrompt] = useState("");
  const [isAnalyzed, setIsAnalyzed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    setIsAnalyzed(true);
  };

  return (
    <div 
      className="flex flex-col overflow-hidden"
      style={{
        height: '100vh',
        backgroundColor: 'var(--color-bg-base)',
        color: 'var(--color-text-slate-200)',
        fontFamily: 'var(--font-family-base)'
      }}
    >
      <TopNav />

      {/* Main Layout Area */}
      <div 
        className="flex flex-1 overflow-hidden w-full"
        style={{ paddingTop: 'var(--nav-height)' }}
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
            height: '100%',
            padding: 'var(--space-10)',
            backgroundColor: 'var(--color-bg-base)'
          }}
        >
          <div 
            className="flex flex-col mx-auto h-full"
            style={{ 
              maxWidth: 'var(--max-content-width)',
              marginBottom: 'var(--space-20)'
            }}
          >
            {!isAnalyzed ? (
              <EmptyState />
            ) : (
              <>
                <UserPrompt />

                {/* AI Solutions wrapper */}
                <div 
                  className="grid grid-cols-2"
                  style={{ gap: 'var(--space-6)', marginTop: 'var(--space-8)' }}
                >
                  <SolutionCard 
                    title="Solution 1: Distributed Mesh"
                    subtitle="Edge-optimized stream processing"
                    score="8/10"
                    scoreIcon="★"
                    metricText="High Efficiency"
                    metricIcon={CheckIcon}
                    description="Utilizes a combination of Apache Kafka for ingestion and Flink for real-time processing. By deploying processing nodes closer to the data source (Edge), we reduce latency by 40%."
                    type="success"
                  />

                  <SolutionCard 
                    title="Solution 2: Centralized Hub"
                    subtitle="Traditional monolithic architecture"
                    score="5/10"
                    scoreIcon="▲"
                    metricText="Scaling Bottleneck"
                    metricIcon={AlertIcon}
                    description="A centralized CloudWatch and Kinesis integration. While simpler to manage, this approach introduces significant serialization overhead and increased costs per message."
                    type="error"
                  />
                </div>

                <VerdictCard />
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
