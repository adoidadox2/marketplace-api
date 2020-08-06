import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import authConfig from "../config/authConfig";
import AppError from "../errors/AppError";

import TokenPayloadDTO from "../dtos/TokenPayloadDTO";

export default (request: Request, response: Response, next: NextFunction) => {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError("Token not provided", 400);
  }

  const [, token] = authHeader.split(" ");

  try {
    const decoded = verify(token, authConfig.secret);

    const { id } = decoded as TokenPayloadDTO;

    request.userId = id;

    return next();
  } catch (err) {
    throw new AppError("Token invalid", 401);
  }
};
