import { getRepository } from "typeorm";
import { Request, Response } from "express";
import Purchase from "../models/Purchase";
import CreatePurchaseService from "../services/CreatePurchaseService";

class PurchaseController {
  async index(request: Request, response: Response): Promise<Response> {
    const purchaseRepository = getRepository(Purchase);

    const purchases = await purchaseRepository.find();

    return response.json(purchases);
  }
  async store(request: Request, response: Response): Promise<Response> {
    const { userId, body } = request;

    const createdPurchase = await CreatePurchaseService.execute({
      userId,
      body,
    });

    return response.json(createdPurchase);
  }
}

export default new PurchaseController();
