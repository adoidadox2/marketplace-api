import { getRepository } from "typeorm";
import Ad from "../models/Ad";
import { Request, Response } from "express";
import CreateAdService from "../services/CreateAdService";
import AppError from "../errors/AppError";

class AdController {
  async index(request: Request, response: Response): Promise<Response> {
    const adRepository = getRepository(Ad);

    const ads = await adRepository.find();

    return response.json(ads);
  }
  async store(request: Request, response: Response): Promise<Response> {
    const createdAd = await CreateAdService.execute({
      userId: request.userId,
      body: request.body,
    });

    return response.json(createdAd);
  }
  async show(request: Request, response: Response): Promise<Response> {
    const adRepository = getRepository(Ad);

    const { id } = request.params;

    const ad = await adRepository.findOne({
      where: { id },
      relations: ["author"],
    });

    if (!ad) {
      throw new AppError("Ad not found", 400);
    }

    return response.json(ad);
  }
}

export default new AdController();
