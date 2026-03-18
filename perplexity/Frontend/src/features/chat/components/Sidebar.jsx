import React from "react";

const Sidebar = () => {
  const chatHistory = [
    { id: 1, title: "Design Strategy 2024", active: true },
    { id: 2, title: "Frontend Optimization", active: false },
    { id: 3, title: "Python Script Debug", active: false },
    { id: 4, title: "Market Research AI", active: false },
  ];

  return (
    <aside className="w-64 bg-[#1D1C1B] border-r border-white/5 flex flex-col h-full z-20 shrink-0">
      {/* Logo Section */}
      <div className="p-6">
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="w-8 h-8 bg-[#207C89] rounded-lg flex items-center justify-center shadow-lg shadow-[#207C89]/20">
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M13 10V3L4 14h7v7l9-11h-7z"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
            </svg>
          </div>
          <span className="text-xl font-bold tracking-tight text-white">
            Lumina AI
          </span>
        </div>
      </div>

      {/* Navigation Section */}
      <div className="flex-1 overflow-y-auto px-3 py-2 space-y-6 custom-scrollbar">
        <div>
          <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
            Your Chats
          </h3>
          <nav className="space-y-1">
            {chatHistory.map((chat) => (
              <a
                key={chat.id}
                href="#"
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                  chat.active
                    ? "bg-[#207C89] text-white font-medium shadow-lg shadow-[#207C89]/10"
                    : "text-gray-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                <svg
                  className={`w-4 h-4 ${!chat.active && "opacity-50"}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  />
                </svg>
                <span className="truncate">{chat.title}</span>
              </a>
            ))}
          </nav>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
