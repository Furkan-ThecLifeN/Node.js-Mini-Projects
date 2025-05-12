import express from "express";
import morgan from "morgan";
import userRoutes from "./routes/user.routes.js";
import { errorHandler } from "./middlewares/error.middleware.js";

const app = express();
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/users", userRoutes);

// Global error handler
app.use(errorHandler);

app.listen(3000, () => {
  console.log("🚀 Server running on http://localhost:3000");
});
