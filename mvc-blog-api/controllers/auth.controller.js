import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

export const register = async (req, res) => {
  const user = await User.create(req.body);
  res.status(201).json({ message: "Kayıt başarılı" });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({ message: "Geçersiz bilgiler" });
  }
  const token = generateToken(user._id);
  res.json({ token });
};
