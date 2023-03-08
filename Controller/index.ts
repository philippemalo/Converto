import express from "express";
import session from "express-session";
import uid from "uid-safe";
import MongoStore from "connect-mongo";
import cors from "cors";

import router from "./routes";
import passport from "./passport";

const app = express();

const sessionConfig = {
  genid: (req: express.Request) => {
    return uid.sync(18);
  },
  secret: process.env.SESSION_SECRET as string,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
  resave: true,
  saveUninitialized: true,
  store: MongoStore.create({
    mongoUrl: process.env.DATABASE_URL as string,
    collectionName: "Sessions",
  }),
};

app.use(
  cors({
    origin: "http://localhost:8000",
    credentials: true,
  })
);

app.use(express.json());
app.use(session(sessionConfig));
app.use(passport.initialize());
app.use(passport.session());

app.use(router);

app.listen(4466, () => {
  console.log("Server is running");
});
