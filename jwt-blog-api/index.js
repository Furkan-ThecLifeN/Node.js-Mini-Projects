import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import postRoutes from "./routes/posts.routes.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () =>
      console.log(`🚀 Server: http://localhost:${process.env.PORT}`)
    );
  })
  .catch((err) => console.error(err));
