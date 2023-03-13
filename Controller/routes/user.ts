import { Router } from "express";
import prisma from "../prisma/client";

const userRouter = Router();

userRouter.get("/:username", async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { username: req.params.username },
  });

  if (!user) return res.status(404).json({ message: "User not found" });

  return res.status(200).send({ username: user.username, name: user.name });
});

export default userRouter;
