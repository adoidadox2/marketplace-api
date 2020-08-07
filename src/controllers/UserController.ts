import { getRepository, getCustomRepository } from "typeorm";
import User from "../models/User";
import { Request, Response } from "express";
import UserRepository from "../repositories/UserRepository";
import AppError from "../errors/AppError";

class UserController {
  async index(request: Request, response: Response): Promise<Response> {
    const repo = getRepository(User);

    const users = await repo.find();

    return response.json(users);
  }
  async store(request: Request, response: Response): Promise<Response> {
    const repo = getCustomRepository(UserRepository);

    const { name, email, password } = request.body;

    if (await repo.findOne({ where: { email } })) {
      throw new AppError("Email already registered", 400);
    }

    const user = repo.createUser(name, email, password);

    await repo.save(user);

    delete user.password;

    return response.json(user);
  }
}

export default new UserController();
