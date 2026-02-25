import React, { useContext } from "react";
import { PostContext } from "../Post.context";
import {
  createPost,
  getFeed,
  likePost,
  unlikePost,
} from "../services/post.api";

const usePost = () => {
  const context = useContext(PostContext);
  const { loading, setLoading, feed, setFeed } = context;

  const handleGetFeed = async () => {
    setLoading(true);
    try {
      const response = await getFeed();
      // setFeed(response.posts.reverse());
      setFeed(response.posts);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePost = async (imageFile, caption) => {
    setLoading(true);
    const data = await createPost(imageFile, caption);
    setFeed([data.post, ...feed]);
    setLoading(false);
  };

  const handleLikePost = async (post) => {
    const data = await likePost(post);
    await handleGetFeed();
  };
  const handleUnlikePost = async (post) => {
    const data = await unlikePost(post);
    await handleGetFeed();
  };

  return {
    loading,
    handleGetFeed,
    feed,
    handleCreatePost,
    handleLikePost,
    handleUnlikePost,
  };
};

export default usePost;
