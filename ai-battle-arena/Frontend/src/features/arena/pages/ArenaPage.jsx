import React, { useState } from 'react';

const INITIAL_MESSAGES = [
  {
    problem: "Write a Python function to calculate the Fibonacci sequence up to n.",
    solution_1: "def fibonacci(n):\n    if n <= 0:\n        return []\n    elif n == 1:\n        return [0]\n    seq = [0, 1]\n    while len(seq) < n:\n        seq.append(seq[-1] + seq[-2])\n    return seq",
    solution_2: "def fib(n):\n    a, b = 0, 1\n    result = []\n    for _ in range(n):\n        result.append(a)\n        a, b = b, a + b\n    return result",
    judge_recommendation: {
      solution_1_score: 7,
      solution_2_score: 9,
      solution_1_reasoning: "Correct but uses unnecessary list operations and memory overhead within the while loop conditions.",
      solution_2_reasoning: "Highly optimized, pythonic approach using tuple unpacking. Easier to read and more memory efficient."
    }
  }
];

const MessageBlock = ({ data }) => {
  const score1 = data.judge_recommendation.solution_1_score;
  const score2 = data.judge_recommendation.solution_2_score;

  const getSolutionStyle = (score, otherScore) => {
    if (score > otherScore) {
      return "border-green-500/30 shadow-[0_0_20px_rgba(34,197,94,0.1)] hover:shadow-[0_0_30px_rgba(34,197,94,0.25)] hover:border-green-500/60";
    }
    if (score < otherScore) {
      return "border-red-500/30 shadow-[0_0_20px_rgba(239,68,68,0.1)] hover:shadow-[0_0_30px_rgba(239,68,68,0.25)] hover:border-red-500/60";
    }
    return "border-slate-700/50 hover:border-slate-600/80 shadow-[0_0_15px_rgba(0,0,0,0.2)]";
  };

  return (
    <div className="mb-16 animate-in slide-in-from-bottom-4 duration-700 ease-out fill-mode-both">
      {/* User Problem */}
      <div className="mb-10 p-6 bg-slate-800/60 backdrop-blur-lg rounded-2xl border border-slate-700/50 shadow-lg max-w-3xl ml-auto hover:shadow-xl hover:bg-slate-800/80 hover:-translate-y-0.5 transition-all duration-300">
        <div className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3 flex items-center justify-end">
          <span className="mr-2">User Prompt</span>
          <div className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-pulse"></div>
        </div>
        <div className="text-slate-100 text-lg leading-relaxed font-medium">{data.problem}</div>
      </div>

      {/* Solutions Container */}
      <div className="grid grid-cols-2 gap-8 mb-10">
        {/* Solution 1 */}
        <div className={`p-8 bg-slate-900/80 backdrop-blur-md rounded-3xl border relative group transition-all duration-500 hover:-translate-y-1 ${getSolutionStyle(score1, score2)}`}>
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-sm font-bold text-slate-200 tracking-wider uppercase drop-shadow-sm group-hover:text-white transition-colors duration-300">Model A</h3>
              <span className="px-4 py-1.5 bg-slate-800/80 shadow-inner text-slate-300 rounded-full text-xs font-semibold uppercase tracking-wider backdrop-blur-sm border border-slate-700/50">Draft 1</span>
            </div>
            <pre className="text-sm text-slate-300 bg-slate-950/80 p-6 rounded-2xl overflow-x-auto font-mono whitespace-pre-wrap border border-slate-800/50 shadow-inner group-hover:border-slate-700/50 transition-colors duration-300">
              {data.solution_1}
            </pre>
          </div>
        </div>

        {/* Solution 2 */}
        <div className={`p-8 bg-slate-900/80 backdrop-blur-md rounded-3xl border relative group transition-all duration-500 hover:-translate-y-1 ${getSolutionStyle(score2, score1)}`}>
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-sm font-bold text-slate-200 tracking-wider uppercase drop-shadow-sm group-hover:text-white transition-colors duration-300">Model B</h3>
              <span className="px-4 py-1.5 bg-slate-800/80 shadow-inner text-slate-300 rounded-full text-xs font-semibold uppercase tracking-wider backdrop-blur-sm border border-slate-700/50">Draft 2</span>
            </div>
            <pre className="text-sm text-slate-300 bg-slate-950/80 p-6 rounded-2xl overflow-x-auto font-mono whitespace-pre-wrap border border-slate-800/50 shadow-inner group-hover:border-slate-700/50 transition-colors duration-300">
              {data.solution_2}
            </pre>
          </div>
        </div>
      </div>

      {/* Judge Recommendation */}
      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-orange-600/20 to-yellow-500/20 rounded-3xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
        <div className="relative bg-slate-900/90 backdrop-blur-xl rounded-3xl border border-orange-500/30 p-10 shadow-2xl transition-all duration-500 group-hover:border-orange-500/60">
          <div className="flex items-center mb-8">
            <div className="w-10 h-10 rounded-full bg-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.5)] flex items-center justify-center text-white mr-4 transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
              </svg>
            </div>
            <h3 className="text-xl font-black text-orange-400 tracking-tight drop-shadow-md">Judge Recommendation</h3>
          </div>
          
          <div className="grid grid-cols-2 gap-10">
            <div className="space-y-4 bg-slate-950/40 p-6 rounded-2xl border border-slate-800/50 hover:bg-slate-950/60 transition-colors duration-300">
              <div className="flex justify-between items-center">
                <span className="text-sm font-bold text-slate-300 tracking-wide uppercase">Model A Evaluation</span>
                <span className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-slate-800/80 text-orange-400 font-black tracking-wider border border-slate-700/50 shadow-[0_0_10px_rgba(249,115,22,0.1)] group-hover:shadow-[0_0_15px_rgba(249,115,22,0.2)] transition-shadow duration-300">
                  {score1}/10
                </span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">
                {data.judge_recommendation.solution_1_reasoning}
              </p>
            </div>

            <div className="space-y-4 bg-slate-950/40 p-6 rounded-2xl border border-slate-800/50 hover:bg-slate-950/60 transition-colors duration-300">
              <div className="flex justify-between items-center">
                <span className="text-sm font-bold text-slate-300 tracking-wide uppercase">Model B Evaluation</span>
                <span className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-slate-800/80 text-orange-400 font-black tracking-wider border border-slate-700/50 shadow-[0_0_10px_rgba(249,115,22,0.1)] group-hover:shadow-[0_0_15px_rgba(249,115,22,0.2)] transition-shadow duration-300">
                  {score2}/10
                </span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">
                {data.judge_recommendation.solution_2_reasoning}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ArenaPage = () => {
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [inputValue, setInputValue] = useState("");

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    
    const newMsg = {
      problem: inputValue,
      solution_1: "Computing optimal response approach...",
      solution_2: "Analyzing context via neural array...",
      judge_recommendation: {
        solution_1_score: "—",
        solution_2_score: "—",
        solution_1_reasoning: "Waiting to render initial analysis...",
        solution_2_reasoning: "Waiting to render initial analysis..."
      }
    };
    
    setMessages([...messages, newMsg]);
    setInputValue("");
  };

  return (
    <div className="flex h-screen bg-[#030712] bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.15),rgba(255,255,255,0))] font-sans antialiased text-slate-200">
      
      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 bg-transparent z-10 overflow-hidden">
        
        {/* Header */}
        <header className="h-24 px-10 flex items-center justify-between bg-slate-950/60 backdrop-blur-xl sticky top-0 z-20 border-b border-white/5 shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 flex items-center justify-center shadow-[0_0_15px_rgba(99,102,241,0.2)]">
              <svg className="w-6 h-6 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-tighter text-white drop-shadow-md">Arena <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Chamber</span></h1>
              <p className="text-xs font-semibold text-slate-400 tracking-wide mt-1">AI MODEL COMPARISON MATRIX</p>
            </div>
          </div>
          <div className="flex items-center space-x-6">
            <button className="px-5 py-2 text-sm font-bold text-slate-400 hover:text-white rounded-full hover:bg-white/5 transition-all duration-300">History</button>
            <div className="w-12 h-12 rounded-full cursor-pointer bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center font-black text-slate-300 border border-slate-700/50 hover:border-slate-500 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
              ME
            </div>
          </div>
        </header>

        {/* Chat Feed */}
        <div className="flex-1 overflow-y-auto p-12 custom-scrollbar scroll-smooth">
          <div className="max-w-6xl mx-auto pt-6 pb-20">
            {messages.map((msg, idx) => (
              <MessageBlock key={idx} data={msg} />
            ))}
          </div>
        </div>

        {/* Sticky Input Area */}
        <div className="p-8 bg-slate-950/80 backdrop-blur-2xl border-t border-white/5 shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
          <div className="max-w-4xl mx-auto group">
            <form onSubmit={handleSend} className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-orange-500/20 via-indigo-500/20 to-purple-500/20 rounded-full blur opacity-40 group-focus-within:opacity-100 transition duration-700"></div>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Initialize challenge sequence..."
                className="relative w-full bg-slate-900/90 border border-slate-700/50 rounded-full py-5 pl-10 pr-20 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all duration-300 font-medium tracking-wide shadow-inner"
              />
              <button 
                type="submit"
                className="absolute right-3 top-3 bottom-3 aspect-square bg-white text-slate-900 hover:bg-slate-200 hover:scale-105 rounded-full flex items-center justify-center transition-all duration-300 shadow-[0_0_15px_rgba(255,255,255,0.3)] z-10"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 ml-0.5">
                  <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
                </svg>
              </button>
            </form>
            <div className="text-center mt-5">
              <span className="text-xs text-slate-500 font-medium tracking-widest uppercase">Neural evaluation matrices active & unbiased</span>
            </div>
          </div>
        </div>
      </main>

    </div>
  );
};

export default ArenaPage;
