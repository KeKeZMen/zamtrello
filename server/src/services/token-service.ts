import jwt, { Secret } from "jsonwebtoken";

import IUser from "../models/IUser.js";
import prisma from "./db-service.js";

export default class TokenService {
  static generateTokens(userData: IUser) {
    let secretAccess: Secret = "secret";
    if (process.env.ACCESS) secretAccess = process.env.ACCESS;

    let secretRefresh: Secret = "secret";
    if (process.env.REFRESH) secretRefresh = process.env.REFRESH;

    const accessToken = jwt.sign(userData, secretAccess, { expiresIn: "15m" });
    const refreshToken = jwt.sign(userData, secretRefresh, { expiresIn: "30d" });

    return {
      accessToken,
      refreshToken,
    };
  }

  static verifyAccessToken(accessToken: string) {
    if (!process.env.ACCESS) return null
    let secretAccess: Secret = process.env.ACCESS;
    
    try {
      return jwt.verify(accessToken, secretAccess);
    } catch (error) {
      return null;
    }
  }

  static verifyRefreshToken(refreshToken: string) {
    if (!process.env.REFRESH) return null
    let secretRefresh: Secret = process.env.REFRESH;

    try {
      return jwt.verify(refreshToken, secretRefresh);
    } catch (error) {
      return null;
    }
  }

  static async saveRefreshToken(refreshToken: string, userId: number) {
    return await prisma.token.create({
      data: {
        refresh_token: refreshToken,
        user: {
          connect: {
            id: userId
          }
        }
      },
    });
  }

  static async removeRefreshToken(refreshToken: string) {
    return await prisma.token.delete({
      where: {
        refresh_token: refreshToken
      }
    })
  }
}
