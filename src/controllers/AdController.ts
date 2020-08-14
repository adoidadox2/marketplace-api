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
    const { userId, body } = request;

    const createdAd = await CreateAdService.execute({
      userId,
      body,
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
  async update(request: Request, response: Response): Promise<Response> {
    const adRepository = getRepository(Ad);

    const { id } = request.params;
    const { title, description, price } = request.body;

    const ad = await adRepository.findOne({
      where: { id },
      relations: ["author"],
    });

    if (!ad) {
      throw new AppError("Ad not found", 400);
    }

    if (ad.author.id != request.userId) {
      throw new AppError("This ad isn't yours", 401);
    }

    ad.title = title;
    ad.description = description;
    ad.price = price;

    const updatedAd = await adRepository.save(ad);

    return response.json(updatedAd);
  }
  async delete(request: Request, response: Response): Promise<Response> {
    const adRepository = getRepository(Ad);

    const id = request.params.id;

    const ad = await adRepository.findOne({
      where: { id },
      relations: ["author"],
    });

    if (!ad) {
      throw new AppError("Ad not found", 400);
    }

    if (ad.author.id != request.userId) {
      throw new AppError("This ad isn't yours", 401);
    }

    await adRepository.softRemove(ad);

    return response.json();
  }
}

export default new AdController();
