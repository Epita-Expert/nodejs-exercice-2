import express, { Express, Request, Response } from "express";
import { prisma } from "..";
const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  const snakes = await prisma.snake.findMany();
  res.json(snakes);
});

router.get("/:id", async (req: Request, res: Response) => {
  const snake = await prisma.snake.findUnique({
    where: {
      id: Number(req.params.id),
    },
  });
  res.json(snake);
});

router.post("/", async (req: Request, res: Response) => {
  const { name, species, isVenomous, age } = req.body;
  const result = await prisma.snake.create({
    data: {
      name,
      species,
      isVenomous,
      age,
    },
  });
  res.send(result);
});

router.put("/:id", async (req: Request, res: Response) => {
  const { id, name, species, isVenomous, age } = req.body;
  const result = await prisma.snake.update({
    where: {
      id: Number(req.params.id),
    },
    data: {
      name,
      species,
      isVenomous,
      age,
    },
  });
  res.send(result);
});

router.delete("/:id", async (req: Request, res: Response) => {
  const result = await prisma.snake.delete({
    where: {
      id: Number(req.params.id),
    },
  });
  res.send(result);
});

export default router;