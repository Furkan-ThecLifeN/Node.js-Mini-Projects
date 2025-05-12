import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Token oluşturma fonksiyonu
const generateToken = (userId) =>
  jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "1d" });

// Kullanıcı kayıt işlemi
export const register = async (req, res) => {
  const { email, password } = req.body;
  const exists = await User.findOne({ email });
  if (exists) return res.status(400).json({ message: "Kullanıcı zaten var." });

  const user = await User.create({ email, password });
  const token = generateToken(user._id);
  res.status(201).json({ token });
};

// Kullanıcı giriş işlemi
export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await user.comparePassword(password)))
    return res.status(401).json({ message: "Hatalı giriş." });

  const token = generateToken(user._id);
  res.json({ token });
};
