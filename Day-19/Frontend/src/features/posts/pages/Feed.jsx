import React from "react";
import Post from "../components/Post";
import "../../posts/style/feed.scss";

const Feed = () => {
  return (
    <div className="feed-page">
      <div className="feed">
        <Post />
        <Post />
      </div>
    </div>
  );
};

export default Feed;
