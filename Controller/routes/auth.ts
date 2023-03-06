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
authRouter.post(
  "/signin",
  passport.authenticate("local", {
    failureRedirect: "/login",
    successRedirect: "/",
  })
);

authRouter.get("/signout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

export default authRouter;
