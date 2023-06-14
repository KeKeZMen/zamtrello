import { NextFunction, Request, Response } from "express";

import ApiError from "../exceptions/api-error.js";
import IUser from "../models/IUser.js";
import TokenService from "../services/token-service.js";

export default function (req: Request, res: Response, next: NextFunction) {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) return next(ApiError.unauthorizedError());

    const accessToken = authorizationHeader.split(" ")[1];
    if (!accessToken) return next(ApiError.unauthorizedError());

    const tokenData = TokenService.verifyAccessToken(accessToken) as IUser;
    if (!tokenData) return next(ApiError.unauthorizedError());

    req.body.user = tokenData;
    next();
  } catch (error) {
    return next(ApiError.unauthorizedError());
  }
}
