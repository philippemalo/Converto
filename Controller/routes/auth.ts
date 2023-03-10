import { Router } from "express";
import passport from "passport";
import bcrypt from "bcrypt";
import prisma from "../prisma/client";
import utils from "../utils";

const authRouter = Router();

// Local Sign up endpoint
authRouter.post("/signup", async (req, res, next) => {
  const { email, password, name, username } = req.body;
  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      return res.status(409).json({ message: "Email already in use." });
    }

    if (!utils.isValidEmail(email)) {
      return res.status(409).json({ message: "Email is not valid." });
    }

    if (!utils.isValidPassword(password)) {
      return res.status(409).json({
        message:
          "Password is not valid. Password must be at least 8 characters long and contain at least 1 uppercase letter, 1 lowercase letter and 1 number.",
      });
    }

    if (!utils.isValidName(name)) {
      return res.status(409).json({ message: "Name is not valid." });
    }

    if (!utils.isValidUsername(username)) {
      return res.status(409).json({ message: "Username is not valid." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        username,
      },
    });

    return res.status(201).json({ user: newUser });
  } catch (err) {
    return next(err);
  }
});

// Sign in endpoint
authRouter.post("/signin", passport.authenticate("local"), (req, res) => {
  return res.status(200).json("Sign in successful");
});

// Sign out endpoint
authRouter.get("/signout", (req, res, next) => {
  req.logout((err) => {
    next(err);
  });
  return res.status(200).json("Sign out successful");
});

export default authRouter;
