import { Router } from "express";

const router = Router();

const users = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
];

router.get("/", (req, res) => {
  res.json(users);
});

router.get("/:id", (req, res, next) => {
  const user = users.find((u) => u.id === parseInt(req.params.id));
  if (!user) {
    const err = new Error("Kullanıcı bulunamadı");
    err.statusCode = 404;
    return next(err);
  }
  res.json(user);
});

router.post("/", (req, res, next) => {
  try {
    const { name } = req.body;
    if (!name) {
      const err = new Error("İsim gerekli");
      err.statusCode = 400;
      throw err;
    }
    const newUser = { id: users.length + 1, name };
    users.push(newUser);
    res.status(201).json(newUser);
  } catch (err) {
    next(err);
  }
});

export default router;
