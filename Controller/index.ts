import express from "express";
import { PrismaClient } from "./prisma/generated/prisma-client-js";

const app = express();

const prisma = new PrismaClient();

async function main() {}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

app.get("/", (req, res) => {
  res.send("PRISMA ORM!");
});

app.listen(4466, () => {
  console.log("Server is running");
});
