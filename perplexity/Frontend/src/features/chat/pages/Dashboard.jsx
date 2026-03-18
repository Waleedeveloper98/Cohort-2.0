import React from "react";
import { useSelector } from "react-redux";
import { useChat } from "../hooks/useChat";
import { useState, useEffect, useRef } from "react";
import Sidebar from "../components/Sidebar";

const Dashboard = () => {
  const [input, setInput] = useState("");
  const textareaRef = useRef(null);
  const { user } = useSelector((state) => state.auth);
  const { initializeSocketConnection } = useChat();
  console.log(user);

  useEffect(() => {
    initializeSocketConnection();
  }, []);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [input]);

  return (
    <div className="bg-[#171615] text-gray-200 font-sans h-screen overflow-hidden flex">
      <Sidebar />

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col relative h-full max-w-full overflow-hidden">
        {/* Chat Header */}
        <header className="h-14 border-b border-white/5 flex items-center justify-between px-8 shrink-0 bg-[#171615]/80 backdrop-blur-md sticky top-0 z-10">
        </header>

        {/* Chat Messages Container */}
        <section className="flex-1 overflow-y-auto px-4 py-8 custom-scrollbar">
          <div className="max-w-3xl mx-auto space-y-12">
            {/* User Message */}
            <div className="flex flex-col items-end gap-2">
              <div className="bg-[#2A2928] text-gray-200 px-5 py-3 rounded-2xl rounded-tr-none max-w-[85%] shadow-sm border border-white/5">
                <p className="text-[15px] leading-relaxed">
                  Can you help me outline a 6-month design strategy for a new
                  SaaS platform focused on collaborative document editing? I
                  need to focus on user retention and viral loops.
                </p>
              </div>
            </div>

            {/* AI Message */}
            <div className="flex gap-4 group">
              <div className="w-8 h-8 rounded-lg bg-[#207C89]/20 flex-shrink-0 flex items-center justify-center text-[#207C89]">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  />
                </svg>
              </div>
              <div className="flex-1 space-y-4 pt-1">
                <div className="text-[15px] text-gray-300 leading-relaxed">
                  <p>
                    Certainly! Building a strategy for a collaborative SaaS
                    platform requires balancing functional utility with social
                    proof. Here's a structured approach for your first 6 months:
                  </p>
                  <div className="mt-6 space-y-6">
                    <div className="border-l-2 border-[#207C89]/30 pl-4">
                      <h4 className="text-white font-semibold mb-2">
                        Month 1-2: Core Loop & Frictionless Onboarding
                      </h4>
                      <p className="text-sm text-gray-400">
                        Focus on the "Time to Value". Ensure users can start a
                        document and invite a collaborator within 30 seconds.
                      </p>
                    </div>
                    <div className="border-l-2 border-[#207C89]/30 pl-4">
                      <h4 className="text-white font-semibold mb-2">
                        Month 3-4: Viral Hooks & Social Proof
                      </h4>
                      <p className="text-sm text-gray-400">
                        Implement public share pages and template galleries
                        where users can showcase their work, naturally bringing
                        in new traffic.
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* Chat Input Section */}
        <footer className="p-6 shrink-0 bg-gradient-to-t from-[#171615] via-[#171615] to-transparent">
          <div className="max-w-3xl mx-auto">
            <div className="relative flex items-center group bg-[#1D1C1B] border border-white/10 rounded-2xl shadow-2xl transition-all duration-300 focus-within:border-[#207C89]/50 focus-within:shadow-[#207C89]/5 p-2">

              <textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 pl-8 bg-transparent border-none focus:ring-0 text-gray-200 placeholder-gray-500 py-3 resize-none max-h-48 border-none outline-none"
                placeholder="Ask anything..."
                rows="1"
              />

              <div className="flex items-center gap-1 pr-1">
                <button className="cursor-pointer bg-[#207C89] p-2.5 rounded-xl text-white shadow-lg shadow-[#207C89]/20 hover:brightness-110 active:scale-95 transition-all">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <p className="text-center text-[10px] text-gray-600 mt-3 font-medium uppercase tracking-widest">
              AI can make mistakes. Verify important info.
            </p>
          </div>
        </footer>
      </main>

      {/* Internal CSS for Scrollbar logic */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #333231; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #444342; }
      `}</style>
    </div>
  );
};

export default Dashboard;
