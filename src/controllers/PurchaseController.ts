import { getRepository } from "typeorm";
import { Request, Response } from "express";
import Purchase from "../models/Purchase";
import CreatePurchaseService from "../services/CreatePurchaseService";
import mailService from "../services/mailService";

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

    await mailService.sendMail({
      from: '"Gerenciamento de Vendas" <contato@marketplace-api.com>',
      to: createdPurchase.ad.author.email,
      replyTo: createdPurchase.user.email,
      subject: `Solicitação de compra: ${createdPurchase.ad.title}`,
      template: "purchase",
      context: {
        user: createdPurchase.user,
        content: createdPurchase.content,
        ad: createdPurchase.ad,
      },
    });

    return response.json(createdPurchase);
  }
}

export default new PurchaseController();
