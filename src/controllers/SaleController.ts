import { getRepository } from "typeorm";
import { Request, Response } from "express";
import AppError from "../errors/AppError";
import Purchase from "../models/Purchase";
import Sale from "../models/Sale";

class SaleController {
  async index(request: Request, response: Response): Promise<Response> {
    const saleRepository = getRepository(Sale);

    const sales = await saleRepository.find();

    return response.json(sales);
  }
  async store(request: Request, response: Response): Promise<Response> {
    const saleRepository = getRepository(Sale);
    const purchaseRepository = getRepository(Purchase);

    const { purchaseId } = request.params;

    const purchase = await purchaseRepository.findOne({
      where: { id: purchaseId },
      relations: ["ad", "ad.author", "ad.sale"],
    });

    if (!purchase) {
      throw new AppError("Purchase not found", 400);
    }

    if (purchase.ad.author.id !== request.userId) {
      throw new AppError("You cannot sell an ad that is not yours", 401);
    }

    if (purchase.ad.sale) {
      throw new AppError("Ad has already been sold", 400);
    }

    const sale = await saleRepository.save({ ad: purchase.ad, purchase });

    return response.json(sale);
  }
}

export default new SaleController();
