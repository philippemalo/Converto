import prisma from "./prisma/client";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import bcrypt from "bcrypt";

// Registering a strategy for later use when authenticating requests. The name with which the strategy is registered is passed to authenticate().
passport.use(
  "local",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const user = await prisma.user.findUnique({ where: { email } });

        // If user exists but password is null, then the user has signed up using Google
        if (!user || !user.password) {
          return done(null, false, { message: "Incorrect email or password." });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
          return done(null, false, { message: "Incorrect email or password." });
        }

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

passport.use(
  "google",
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      callbackURL: "http://localhost:4466/auth/google/callback",
      scope: ["profile"],
      state: true,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        console.log("REEEEEEEE", accessToken, refreshToken, profile);
        if (!profile.emails?.length) {
          return done(null, false, { message: "Email not found" });
        }
        const email = profile.emails[0].value;
        let user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
          user = await prisma.user.create({
            data: {
              email,
              name: profile.displayName,
            },
          });
        }
        const authDetails = await prisma.authDetails.findUnique({
          where: { userId: user.id },
        });
        if (!authDetails) {
          await prisma.authDetails.create({
            data: {
              accessToken,
              refreshToken,
              userId: user.id,
            },
          });
        } else {
          await prisma.authDetails.update({
            where: { id: authDetails.id },
            data: {
              accessToken,
              refreshToken,
            },
          });
        }
        return done(null, user);
      } catch (err) {
        if (err instanceof Error) {
          return done(err);
        }
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await prisma.user.findUnique({ where: { id } });
    done(null, user);
  } catch (err) {
    done(err);
  }
});

export default passport;
