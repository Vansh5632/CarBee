import React, { useState, useEffect } from "react";
import { FaHeart, FaComment, FaUser } from "react-icons/fa";
const apiUrl = 'https://carbee-3.onrender.com'

const Discuss = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");
  const [commentInput, setCommentInput] = useState({});

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`${apiUrl}/posts`);
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    if (newPost.trim()) {
      const newPostObj = {
        author: "You",
        content: newPost,
      };
      try {
        const response = await fetch(`${apiUrl}/posts`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newPostObj),
        });
        const savedPost = await response.json();
        setPosts([savedPost, ...posts]);
        setNewPost("");
      } catch (error) {
        console.error("Error submitting post:", error);
      }
    }
  };

  const handleLike = async (postId) => {
    try {
      const response = await fetch(`${apiUrl}/posts/${postId}/like`, {
        method: "POST",
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const updatedPost = await response.json();
      setPosts(
        posts.map((post) => (post._id === postId ? updatedPost : post))
      );
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  const handleCommentSubmit = async (postId) => {
    if (commentInput[postId]?.trim()) {
      const newComment = {
        author: "You",
        content: commentInput[postId],
      };
      try {
        const response = await fetch(`${apiUrl}/posts/${postId}/comments`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newComment),
        });
        const updatedPost = await response.json();
        setPosts(
          posts.map((post) => (post._id === postId ? updatedPost : post))
        );
        setCommentInput({ ...commentInput, [postId]: "" });
      } catch (error) {
        console.error("Error submitting comment:", error);
      }
    }
  };

  return (
    <div className="flex flex-col items-center py-[100px] text-white bg-gray-900 min-h-screen">
      <div className="w-full max-w-2xl px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
          Car Enthusiast Discussions
        </h2>

        <form onSubmit={handlePostSubmit} className="mb-8 bg-gray-800 p-4 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">Create a new post</h3>
          <textarea
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            placeholder="What's on your mind about cars?"
            className="w-full p-4 rounded-lg bg-gray-700 border border-gray-600 text-white resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="3"
          />
          <button
            type="submit"
            className="mt-2 px-6 py-2 bg-blue-500 rounded-lg text-white hover:bg-blue-600 transition duration-300"
          >
            Post
          </button>
        </form>

        <div className="space-y-6">
          {posts.map((post) => (
            <div
              key={post._id}
              className="p-4 rounded-lg bg-gray-800 border border-gray-700"
            >
              <div className="flex items-center mb-2">
                <FaUser className="text-gray-400 mr-2" />
                <span className="font-semibold">{post.author}</span>
              </div>
              <p className="text-lg mb-2">{post.content}</p>
              <div className="text-sm text-gray-400 mb-4">{new Date(post.timestamp).toLocaleString()}</div>
              
              <div className="flex items-center space-x-4 mb-4">
                <button
                  onClick={() => handleLike(post._id)}
                  className="flex items-center space-x-1 text-pink-500 hover:text-pink-600"
                >
                  <FaHeart />
                  <span>{post.likes}</span>
                </button>
                <button className="flex items-center space-x-1 text-blue-500 hover:text-blue-600">
                  <FaComment />
                  <span>{post.comments.length}</span>
                </button>
              </div>

              <div className="space-y-2 mb-4">
                {post.comments.map((comment) => (
                  <div
                    key={comment._id}
                    className="p-2 bg-gray-700 rounded text-sm"
                  >
                    <span className="font-semibold mr-2">{comment.author}:</span>
                    {comment.content}
                  </div>
                ))}
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleCommentSubmit(post._id);
                }}
                className="mt-4 flex"
              >
                <input
                  type="text"
                  value={commentInput[post._id] || ""}
                  onChange={(e) =>
                    setCommentInput({
                      ...commentInput,
                      [post._id]: e.target.value,
                    })
                  }
                  placeholder="Add a comment..."
                  className="flex-grow p-2 rounded-l-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 rounded-r-lg text-white hover:bg-blue-600 transition duration-300"
                >
                  Comment
                </button>
              </form>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Discuss;
