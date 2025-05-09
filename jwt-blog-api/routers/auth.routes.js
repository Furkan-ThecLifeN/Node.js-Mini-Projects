import { Router } from "express";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

const router = Router();

router.post("/register", async (req, res) => {
  const user = await User.create(req.body);
  res.status(201).json({ message: "Kayıt başarılı" });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({ message: "Geçersiz bilgiler" });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  res.json({ token });
});

export default router;
