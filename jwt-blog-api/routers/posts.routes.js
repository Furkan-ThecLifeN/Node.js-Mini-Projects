import { Router } from "express";
import Post from "../models/post.model.js";
import { protect } from "../middleware/auth.middleware.js";

const router = Router();

// Public – tüm postları getir
router.get("/", async (req, res) => {
  const posts = await Post.find().populate("author", "email");
  res.json(posts);
});

// Private – sadece giriş yapmış kullanıcı post oluşturabilir
router.post("/", protect, async (req, res) => {
  const post = await Post.create({
    ...req.body,
    author: req.user.id,
  });
  res.status(201).json(post);
});

export default router;
