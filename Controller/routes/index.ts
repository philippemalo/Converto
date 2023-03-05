import { Router } from "express";
import authRouter from "./auth";

const router = Router();

router.get("/", (req, res) => {
  res.send("PRISMA ORM!");
});

router.use("/auth", authRouter);

export default router;
