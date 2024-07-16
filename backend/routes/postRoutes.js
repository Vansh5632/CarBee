const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

router.get('/',async(req,res)=>{
    try{
        const posts = await Post.find().sort({timestamp:-1});
        res.json(posts);
    }catch(err){
        res.status(500).json({message:err.message});
    }
});

router.post("/", async (req, res) => {
    const { author, content } = req.body;
    const post = new Post({ author, content });
    try {
      const newPost = await post.save();
      res.status(201).json(newPost);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  router.post("/:id/like", async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      post.likes += 1;
      await post.save();
      res.json(post);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

  router.post("/:id/comments", async (req, res) => {
    const { author, content } = req.body;
    try {
      const post = await Post.findById(req.params.id);
      post.comments.push({ author, content });
      await post.save();
      res.status(201).json(post);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

  module.exports = router;
  