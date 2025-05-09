import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import usersRouter from "./routes/users.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/api/users", usersRouter);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => console.log(`🚀 Server http://localhost:${PORT}`));
  })
  .catch((err) => console.error("MongoDB bağlantı hatası:", err));
