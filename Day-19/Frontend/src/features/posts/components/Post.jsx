import React from "react";
import { Heart, MessageCircle, Send, Bookmark } from "lucide-react";
import "../style/post.scss";

const Post = ({ user, post }) => {
  return (
    <div className="post">
      {/* Header */}
      <div className="post-header">
        <div className="profile-image">
          <img
            src={user.profileImage}
            alt="user profile"
            className="post-avatar"
          />
        </div>
        <span className="post-username">{user.username}</span>
      </div>

      {/* Image */}
      <div className="post-image">
        <img src={post.imgUrl} alt="post" />
      </div>

      {/* Actions */}
      <div className="post-actions">
        <div className="post-actions-left">
          <Heart
            fill={post.isLiked ? "red" : "none"}
            stroke={post.isLiked ? "none" : "black"}
          />
          <MessageCircle />
          <Send />
        </div>

        <div className="post-actions-right">
          <Bookmark />
        </div>
      </div>

      {/* Caption */}
      <div className="post-caption">
        <p>{post.caption}</p>
      </div>
    </div>
  );
};

export default Post;
