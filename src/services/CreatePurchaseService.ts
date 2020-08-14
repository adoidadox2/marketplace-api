import { getRepository } from "typeorm";
import Purchase from "../models/Purchase";
import AppError from "../errors/AppError";
import Ad from "../models/Ad";
import User from "../models/User";
import CreatePurchaseDTO from "../dtos/CreatePurchaseDTO";

class CreatePurchaseService {
  async execute({
    userId,
    body: { ad, content },
  }: CreatePurchaseDTO): Promise<Purchase> {
    const adRepository = getRepository(Ad);
    const userRepository = getRepository(User);
    const purchaseRepository = getRepository(Purchase);

    const purchaseAd = await adRepository.findOne({
      where: { id: ad },
      relations: ["author", "sale"],
    });

    if (!purchaseAd) {
      throw new AppError("Ad not found", 400);
    }

    if (purchaseAd.sale) {
      throw new AppError("Ad has already been purchased", 400);
    }

    const user = await userRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new AppError("User not found", 400);
    }

    const purchase = await purchaseRepository.save({
      user,
      ad: purchaseAd,
      content,
    });

    return purchase;
  }
}

export default new CreatePurchaseService();
