import React from "react";
import { useSelector } from "react-redux";
import { useChat } from "../hooks/useChat";

const Sidebar = () => {
  const { chats, currentChatId } = useSelector((state) => state.chat);
  const { handleOpenChat } = useChat();

  const openChat = async (chatId) => {
    await handleOpenChat(chatId);
  };

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
            Chat AI
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
            {Object.values(chats).map((chat) => (
              <button
                key={chat.id}
                onClick={() => openChat(chat.id)}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg w-full cursor-pointer text-sm ${
                  chat.id === currentChatId
                    ? "bg-[#207C89] text-white"
                    : "text-gray-400 hover:bg-white/5"
                }`}
              >
                <span className="truncate">
                  {chat.title?.trim() || "New Chat"}
                </span>
              </button>
            ))}
          </nav>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
