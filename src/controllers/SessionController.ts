import { getRepository } from "typeorm";
import { Request, Response } from "express";
import AppError from "../errors/AppError";
import User from "../models/User";

class SessionController {
  async store(req: Request, res: Response): Promise<Response> {
    const repo = getRepository(User);

    const { email, password } = req.body;

    const user = await repo.findOne({ where: { email } });

    if (!user) {
      throw new AppError("User not found", 400);
    }

    if (!(await user.checkPassword(password))) {
      throw new AppError("Invalid password", 401);
    }

    return res.json({ user, token: user.generateToken() });
  }
}

export default new SessionController();
