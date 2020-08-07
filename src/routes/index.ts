import { Router, Request, Response } from "express";
import userRouter from "./user.routes";

const routes = Router();

routes.get("/", (request: Request, response: Response) => {
  return response.json({
    Author: "Augusto Vinicius",
    Github: "https://github.com/adoidadox2",
    Project: "Marketplace API",
    Version: "1.0.0",
    Status: "Online",
  });
});

routes.use("/users", userRouter);

export default routes;
