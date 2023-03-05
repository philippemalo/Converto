import { Router } from "express";
import passport from "passport";
import bcrypt from "bcrypt";
import prisma from "../prisma/client";

const authRouter = Router();

// Local Sign up endpoint
authRouter.post("/signup", async (req, res, next) => {
  const { email, password, name } = req.body;
  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ message: "Email already in use." });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    });
    return res.status(201).json({ user: newUser });
  } catch (err) {
    return next(err);
  }
});

// Sign in endpoint
authRouter.post("/signin", (req, res, next) => {
  passport.authenticate("local", (err: any, user: any, info: any) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({ message: info.message });
    }
    res.json({ user });
  })(req, res, next);
});

// authRouter.get("/signout", (req, res, next) => {
//   if (!req.isAuthenticated()) {
//     return res.status(401).json({ message: "Not authenticated" });
//   }
//   req.logout((err) => {
//     if (err) {
//       return next(err);
//     }
//     res.status(204).end();
//   });
//   res.status(204).end();
// });

export default authRouter;
