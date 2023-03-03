import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("PRISMA ORM!");
});

app.listen(4466, () => {
  console.log("Server is running");
});
