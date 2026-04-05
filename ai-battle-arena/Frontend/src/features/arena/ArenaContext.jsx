import { createContext, useState } from "react";

export const ArenaContext = createContext({});

const ArenaProvider = ({ children }) => {
  const [messages, setMessages] = useState(null);
  const [loading, setLoading] = useState(false);

  return (
    <ArenaContext.Provider
      value={{ messages, setMessages, loading, setLoading }}
    >
      {children}
    </ArenaContext.Provider>
  );
};

export default ArenaProvider;
