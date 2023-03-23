import { Router } from "express";
import prisma from "../prisma/client";

const userRouter = Router();

userRouter.get("/:username", async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { username: req.params.username },
  });

  if (!user) return res.status(404).json({ message: "User not found" });

  // get user's socials
  const socials = await prisma.social.findMany({
    where: { userId: user.id },
  });

  // get user's publications
  const publications = await prisma.publication.findMany({
    where: { userId: user.id },
  });

  return res.status(200).send({
    username: user.username,
    name: user.name,
    location: user.location,
    profilePicture: user.profilePicture,
    about: user.about,
    skills: user.skills,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
    socials: socials,
    publications: publications,
  });
});

export default userRouter;
