import express from "express";
import bcrypt from "bcrypt";
import bodyParser from "body-parser";
import jwt from "jsonwebtoken";

import prisma from "./prisma/client";
import passport from "./passport";

const app = express();

app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.send("PRISMA ORM!");
});

// Local Sign up endpoint
app.post("/auth/local/signup", async (req, res, next) => {
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

// Google Sign up endpoint
app.get("/auth/google", passport.authenticate("google"));

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/auth/google" }),
  async (req, res) => {
    console.log(req, res);
  }
);

// Log out endpoint
// app.post('/auth/logout', (req, res) => {
//   req.logout();
//   res.status(204).end();
// });

// // Sign in endpoint
// app.post("/auth/signin", (req, res, next) => {
//   passport.authenticate("local", { session: false }, (err, user, info) => {
//     if (err) {
//       return next(err);
//     }
//     if (!user) {
//       return res.status(401).json({ message: info.message });
//     }
//     const token = jwt.sign(
//       { userId: user.id },
//       process.env.JWT_SECRET as string
//     );
//     return res.json({ user, token });
//   })(req, res, next);
// });

app.listen(4466, () => {
  console.log("Server is running");
});
