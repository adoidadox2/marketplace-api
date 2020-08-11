import { getRepository } from "typeorm";
import { Request, Response } from "express";
import AppError from "../errors/AppError";
import Purchase from "../models/Purchase";
import Ad from "../models/Ad";
import User from "../models/User";

class PurchaseController {
  async index(request: Request, response: Response): Promise<Response> {
    const purchaseRepository = getRepository(Purchase);

    const purchases = await purchaseRepository.find();

    return response.json(purchases);
  }
  async store(request: Request, response: Response): Promise<Response> {
    const adRepository = getRepository(Ad);
    const userRepository = getRepository(User);
    const purchaseRepository = getRepository(Purchase);

    const { ad, content } = request.body;

    const purchaseAd = await adRepository.findOne({
      where: { id: ad },
      relations: ["author"],
    });

    if (!purchaseAd) {
      throw new AppError("Ad not found", 400);
    }

    if (ad.purchasedBy) {
      throw new AppError("Ad has already been purchased", 400);
    }

    const user = await userRepository.findOne({
      where: { id: request.userId },
    });

    if (!user) {
      throw new AppError("User not found", 400);
    }

    const purchase = await purchaseRepository.save({
      user,
      ad: purchaseAd,
      content,
    });

    return response.json(purchase);
  }
}

export default new PurchaseController();
