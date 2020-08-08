import { getRepository } from "typeorm";
import Ad from "../models/Ad";
import User from "../models/User";
import AppError from "../errors/AppError";
import CreateAdDTO from "../dtos/CreateAdDTO";

class CreateAdService {
  async execute({
    userId,
    body: { title, description, price },
  }: CreateAdDTO): Promise<Ad> {
    const adRepository = getRepository(Ad);
    const userRepository = getRepository(User);

    const user = await userRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new AppError("User not found", 400);
    }

    const ad = adRepository.create({ title, description, price, author: user });

    const createdAd = await adRepository.save(ad);

    return createdAd;
  }
}

export default new CreateAdService();
