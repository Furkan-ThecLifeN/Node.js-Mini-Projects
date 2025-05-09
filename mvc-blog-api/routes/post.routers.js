import { Router } from "express";
import { getPosts, createPost } from "../controllers/post.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", getPosts);
router.post("/", protect, createPost);

export default router;
