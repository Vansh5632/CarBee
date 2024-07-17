const express = require('express');
const Post = require('../models/Post');
const auth = require('../middleware/auth');

const router = express.Router();

// Create a new post
router.post('/', auth, async (req, res) => {
  const { content } = req.body;
  try {
    const newPost = new Post({
      author: req.user.id,
      content,
    });
    const post = await newPost.save();
    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get all posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().populate('author', 'username').populate('comments.author', 'username').sort({ timestamp: -1 });
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Like a post
router.post('/:postId/like', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    post.likes += 1;
    await post.save();
    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Add a comment to a post
router.post('/:postId/comments', auth, async (req, res) => {
  const { content } = req.body;
  try {
    const post = await Post.findById(req.params.postId);
    const newComment = {
      author: req.user.id,
      content,
    };
    post.comments.push(newComment);
    await post.save();
    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
