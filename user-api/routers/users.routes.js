import { Router } from "express";
import User from "../models/user.model.js";

const router = Router();

// Tüm kullanıcıları getir
router.get("/", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// Yeni kullanıcı oluştur
router.post("/", async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Kullanıcı güncelle
router.put("/:id", async (req, res) => {
  try {
    const updated = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updated)
      return res.status(404).json({ error: "Kullanıcı bulunamadı" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Kullanıcı sil
router.delete("/:id", async (req, res) => {
  const deleted = await User.findByIdAndDelete(req.params.id);
  if (!deleted) return res.status(404).json({ error: "Kullanıcı bulunamadı" });
  res.json({ message: "Silindi" });
});

export default router;
