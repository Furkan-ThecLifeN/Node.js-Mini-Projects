import express from "express";
import postsRouter from "./routes/posts.routes.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/api/posts", postsRouter);

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
