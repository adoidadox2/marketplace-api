import { getRepository, IsNull, Not } from "typeorm";
import { Request, Response } from "express";
import AppError from "../errors/AppError";
import Purchase from "../models/Purchase";
import Ad from "../models/Ad";

class SaleController {
  async index(request: Request, response: Response): Promise<Response> {
    const adRepository = getRepository(Ad);

    const soldAds = await adRepository.find({
      where: { purchasedBy: Not(IsNull()) },
      relations: ["purchases"],
    });

    return response.json(soldAds);
  }
  async store(request: Request, response: Response): Promise<Response> {
    const purchaseRepository = getRepository(Purchase);
    const adRepository = getRepository(Ad);

    const { purchaseId } = request.params;

    const purchase = await purchaseRepository.findOne({
      where: { id: purchaseId },
      relations: ["ad", "ad.author"],
    });

    if (!purchase) {
      throw new AppError("Purchase not found", 400);
    }

    if (purchase.ad.author.id !== request.userId) {
      throw new AppError("You cannot sell an ad that is not yours", 401);
    }

    if (purchase.ad.purchasedBy) {
      throw new AppError("Ad has already been sold", 400);
    }

    purchase.ad.purchasedBy = purchaseId;

    const updatedAd = await adRepository.save(purchase.ad);

    return response.json(updatedAd);
  }
}

export default new SaleController();
