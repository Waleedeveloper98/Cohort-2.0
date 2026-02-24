import React from "react";
import { Heart, MessageCircle, Send, Bookmark } from "lucide-react";
import "../style/post.scss";

const Post = () => {
  return (
    <div className="post">
      {/* Header */}
      <div className="post-header">
        <div className="profile-image">
            <img
          src="https://images.unsplash.com/photo-1771199918850-b66326cbccf5?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="user profile"
          className="post-avatar"
        />
        </div>
        <span className="post-username">username</span>
      </div>

      {/* Image */}
      <div className="post-image">
        <img src="https://images.unsplash.com/photo-1700749243371-d9fabecda10c?q=80&w=627&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="post" />
      </div>

      {/* Actions */}
      <div className="post-actions">
        <div className="post-actions-left">
          <Heart />
          <MessageCircle />
          <Send />
        </div>

        <div className="post-actions-right">
          <Bookmark />
        </div>
      </div>

      {/* Caption */}
      <div className="post-caption">
        <p>This is the caption of the post.</p>
      </div>
    </div>
  );
};

export default Post;
