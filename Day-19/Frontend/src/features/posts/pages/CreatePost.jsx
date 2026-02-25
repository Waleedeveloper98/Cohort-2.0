import React, { useRef, useState } from "react";
import "../../posts/style/createpost.scss";
import usePost from "../hooks/usePost";
import { useNavigate } from "react-router";

const CreatePost = () => {
  const [caption, setCaption] = useState("");
  const postImageRef = useRef();
  const navigate = useNavigate();
  const { loading, handleCreatePost } = usePost();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const file = postImageRef.current.files[0];
    await handleCreatePost(file, caption);
    navigate("/feed");
  };

  if (loading) {
    return (
      <main>
        <h1>creating post...</h1>
      </main>
    );
  }

  return (
    <main className="create-post-page">
      <div className="form-container">
        <h1>Create Post</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="postImage">Select File</label>
          <input
            ref={postImageRef}
            type="file"
            name="postImage"
            id="postImage"
          />
          <input
            type="text"
            placeholder="Write caption"
            name="caption"
            id="caption"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
          />
          <button className="button">Create</button>
        </form>
      </div>
    </main>
  );
};

export default CreatePost;
