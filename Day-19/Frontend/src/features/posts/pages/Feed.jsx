import React, { useEffect } from "react";
import Post from "../components/Post";
import "../../posts/style/feed.scss";
import usePost from "../hooks/usePost";
import Nav from "../../shared/components/Nav";

const Feed = () => {
  const { loading, handleGetFeed, feed } = usePost();

  useEffect(() => {
    handleGetFeed();
  }, []);

  useEffect(() => {
    console.log("Updated feed:", feed);
  }, [feed]);

  if (loading) {
    return <h1>Loading...</h1>;
  }
  return (
    <div className="feed-page">
      <Nav />
      <div className="feed">
        {feed?.map((post) => (
          <Post key={post._id} user={post.user} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Feed;
