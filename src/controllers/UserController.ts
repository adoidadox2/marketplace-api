import { getRepository, getCustomRepository } from "typeorm";
import User from "../models/User";
import { Request, Response } from "express";
import UserRepository from "../repositories/UserRepository";
import AppError from "../errors/AppError";
import encryptPassword from "../services/encryptPasswordService";

class UserController {
  async index(request: Request, response: Response): Promise<Response> {
    const userRepository = getRepository(User);

    const users = await userRepository.find();

    return response.json(users);
  }
  async store(request: Request, response: Response): Promise<Response> {
    const userRepository = getCustomRepository(UserRepository);

    const { name, email, password } = request.body;

    if (await userRepository.findOne({ where: { email } })) {
      throw new AppError("Email already registered", 400);
    }

    const user = userRepository.createUser(name, email, password);

    await userRepository.save(user);

    delete user.password;

    return response.json(user);
  }

  async show(request: Request, response: Response): Promise<Response> {
    const userRepository = getRepository(User);

    const { id } = request.params;

    const user = await userRepository.findOne({
      where: { id },
      relations: ["ads"],
    });

    if (!user) {
      throw new AppError("User not found", 400);
    }

    const filteredAds = user.ads.filter((ad) => ad.deleted_at === null);

    user.ads = filteredAds;

    return response.json(user);
  }
  async update(request: Request, response: Response): Promise<Response> {
    const userRepository = getRepository(User);

    const { id } = request.params;
    const { name, email, password } = request.body;

    const user = await userRepository.findOne({ where: { id } });

    if (!user) {
      throw new AppError("User not found", 400);
    }

    if (user.id != request.userId) {
      throw new AppError("This account isn't yours", 401);
    }

    if (user.email !== email) {
      if (await userRepository.findOne({ where: { email } })) {
        throw new AppError("Email already exists", 400);
      }
    }

    user.name = name;
    user.email = email;
    if (password) {
      user.password_hash = await encryptPassword(password);
    }

    const insertedUser = await userRepository.save(user);

    return response.json(insertedUser);
  }
  async delete(request: Request, response: Response): Promise<Response> {
    const userRepo = getRepository(User);

    const { id } = request.params;

    const user = await userRepo.findOne({
      where: { id },
      relations: ["ads"],
    });

    if (!user) {
      throw new AppError("User not found", 400);
    }

    if (user.id != request.userId) {
      throw new AppError("This account isn't yours", 401);
    }

    await userRepo.softRemove(user);

    return response.json();
  }
}

export default new UserController();
