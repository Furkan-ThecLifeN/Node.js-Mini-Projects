import Post from "../models/post.model.js";

export const getPosts = async (req, res) => {
  const posts = await Post.find().populate("author", "email");
  res.json(posts);
};

export const createPost = async (req, res) => {
  const post = await Post.create({
    ...req.body,
    author: req.user.id,
  });
  res.status(201).json(post);
};
