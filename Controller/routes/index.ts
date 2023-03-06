import { Router } from "express";
import authRouter from "./auth";

const router = Router();

router.get("/", (req, res) => {
  res.send("PRISMA ORM!");
});

router.get("/protected", (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: "Not authenticated" });
  }
  res.send("Protected route");
});

router.use("/auth", authRouter);

export default router;
