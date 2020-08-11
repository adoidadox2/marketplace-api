import { getRepository } from "typeorm";
import { Request, Response } from "express";
import AppError from "../errors/AppError";
import User from "../models/User";

class SessionController {
  async store(request: Request, response: Response): Promise<Response> {
    const userRepository = getRepository(User);

    const { email, password } = request.body;

    const user = await userRepository.findOne({ where: { email } });

    if (!user) {
      throw new AppError("User not found", 400);
    }

    if (!(await user.checkPassword(password))) {
      throw new AppError("Invalid password", 401);
    }

    return response.json({ user, token: user.generateToken() });
  }
}

export default new SessionController();
