import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import snakes from "./routes/snakes";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;
export const prisma = new PrismaClient();

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.use("/snakes", snakes);

app.listen(port, async () => {
  try {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
    await prisma.$disconnect();
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
});
