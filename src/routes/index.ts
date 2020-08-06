import { Router, Request, Response } from "express";

const routes = Router();

routes.get("/", (req: Request, res: Response) => {
  return res.json({
    Author: "Augusto Vinicius",
    Github: "https://github.com/adoidadox2",
    Project: "Marketplace API",
    Version: "1.0.0",
    Status: "Online",
  });
});

export default routes;
