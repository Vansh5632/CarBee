import React, { useState } from "react";

const Discuss = () => {
  const [discussionPosts, setDiscussionPosts] = useState([]);
  const [newPost, setNewPost] = useState("");

  const handlePostSubmit = (e) => {
    e.preventDefault();
    if (newPost.trim()) {
      setDiscussionPosts([...discussionPosts, newPost]);
      setNewPost("");
    }
  };

  return (
    <div className="flex flex-col items-center py-20 text-white">
      {/* Discussion Section */}
      <div
        id="Discussion"
        className="flex flex-col border-4 bg-[#131313] border-gray-800 rounded-2xl mx-10 mt-10 p-5 space-y-4"
      >
        <h2 className="text-[50px] text-center">Car Enthusiast Discussions</h2>
        <form onSubmit={handlePostSubmit} className="flex flex-col space-y-4">
          <textarea
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            placeholder="Share your thoughts about cars..."
            className="p-4 rounded-lg bg-[#1f1f1f] border-2 border-gray-600 text-[20px]"
          />
          <button
            type="submit"
            className="self-end px-6 py-2 bg-blue-500 rounded-lg text-white hover:bg-blue-600"
          >
            Post
          </button>
        </form>
        <div className="space-y-4">
          {discussionPosts.map((post, index) => (
            <div
              key={index}
              className="p-4 rounded-lg bg-[#1f1f1f] border-2 border-gray-600 text-[20px]"
            >
              {post}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Discuss;
