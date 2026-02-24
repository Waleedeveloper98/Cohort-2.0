import { createContext, useState } from "react";

export const PostContext = createContext();

const PostProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [feed, setFeed] = useState(null);

  return (
    <PostContext.Provider value={{ loading, setLoading, feed, setFeed }}>
      {children}
    </PostContext.Provider>
  );
};

export default PostProvider