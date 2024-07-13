import React, { useState, useEffect } from "react";
import { FaHeart, FaComment, FaUser } from "react-icons/fa";

const Discuss = () => {
  const [posts, setPosts] = useState([]); // State to store the posts
  const [newPost, setNewPost] = useState(""); // State to store the new post input
  const [commentInput, setCommentInput] = useState({}); // State to store the comment input for each post

  // Simulating fetching posts from an API
  useEffect(() => {
    const fetchedPosts = [
      {
        id: 1,
        author: "CarLover123",
        content: "Just got my hands on the new Tesla Model S Plaid. It's insanely fast!",
        likes: 15,
        comments: [
          { id: 101, author: "EVEnthusiast", content: "Lucky you! How's the interior?" },
          { id: 102, author: "SpeedDemon", content: "0-60 time?" }
        ],
        timestamp: "2023-07-13 14:30:00",
      },
      {
        id: 2,
        author: "ClassicCarGuy",
        content: "Restored a 1969 Mustang this weekend. Nothing beats the classics!",
        likes: 23,
        comments: [
          { id: 201, author: "MuscleCar4Life", content: "Pictures or it didn't happen!" },
        ],
        timestamp: "2023-07-12 10:15:00",
      },
    ];
    setPosts(fetchedPosts);
  }, []);

  const handlePostSubmit = (e) => {
    e.preventDefault();
    if (newPost.trim()) {
      const newPostObj = {
        id: Date.now(),
        author: "You", // In a real app, this would be the logged-in user
        content: newPost,
        likes: 0,
        comments: [],
        timestamp: new Date().toLocaleString(),
      };
      setPosts([newPostObj, ...posts]);
      setNewPost("");
    }
  };

  const handleLike = (postId) => {
    setPosts(
      posts.map((post) =>
        post.id === postId ? { ...post, likes: post.likes + 1 } : post
      )
    );
  };

  const handleCommentSubmit = (postId) => {
    if (commentInput[postId]?.trim()) {
      setPosts(
        posts.map((post) =>
          post.id === postId
            ? {
                ...post,
                comments: [
                  ...post.comments,
                  { id: Date.now(), author: "You", content: commentInput[postId] },
                ],
              }
            : post
        )
      );
      setCommentInput({ ...commentInput, [postId]: "" });
    }
  };

  return (
    <div className="flex flex-col items-center py-[100px] text-white bg-gray-900 min-h-screen">
      <div className="w-full max-w-2xl px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
          Car Enthusiast Discussions
        </h2>
        
        {/* New Post Form */}
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

        {/* Posts Feed */}
        <div className="space-y-6">
          {posts.map((post) => (
            <div
              key={post.id}
              className="p-4 rounded-lg bg-gray-800 border border-gray-700"
            >
              <div className="flex items-center mb-2">
                <FaUser className="text-gray-400 mr-2" />
                <span className="font-semibold">{post.author}</span>
              </div>
              <p className="text-lg mb-2">{post.content}</p>
              <div className="text-sm text-gray-400 mb-4">{post.timestamp}</div>
              
              {/* Like and Comment buttons */}
              <div className="flex items-center space-x-4 mb-4">
                <button
                  onClick={() => handleLike(post.id)}
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

              {/* Comments */}
              <div className="space-y-2 mb-4">
                {post.comments.map((comment) => (
                  <div
                    key={comment.id}
                    className="p-2 bg-gray-700 rounded text-sm"
                  >
                    <span className="font-semibold mr-2">{comment.author}:</span>
                    {comment.content}
                  </div>
                ))}
              </div>

              {/* New Comment Form */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleCommentSubmit(post.id);
                }}
                className="mt-4 flex"
              >
                <input
                  type="text"
                  value={commentInput[post.id] || ""}
                  onChange={(e) =>
                    setCommentInput({
                      ...commentInput,
                      [post.id]: e.target.value,
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