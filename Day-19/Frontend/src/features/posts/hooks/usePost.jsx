import React, { useContext } from "react";
import { PostContext } from "../Post.context";
import { getFeed } from "../services/post.api";

const usePost = () => {
  const context = useContext(PostContext);
  const { loading, setLoading, feed, setFeed } = context;

  const handleGetFeed = async () => {
    setLoading(true);
    try {
      const response = await getFeed();
      setFeed(response.posts);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { loading, handleGetFeed, feed };
};

export default usePost;
