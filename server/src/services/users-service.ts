import { createHash } from "crypto";

import ApiError from "../exceptions/api-error.js";
import IUser from "../models/IUser.js";
import prisma from "./db-service.js";
import TokenService from "./token-service.js";

export default class UserService {
  static async login(login: string, password: string) {
    const user = await prisma.user.findFirst({ where: { login } });
    if (!user) throw ApiError.badRequest("Пользователь с таким login не найден!");
    if (user.password !== createHash("sha256").update(password).digest("hex")) throw ApiError.badRequest("Неверный пароль");

    const tokens = TokenService.generateTokens({id: user.id, login: user.login });
    await TokenService.saveRefreshToken(tokens.refreshToken, user.id);

    return {...tokens, user: { id: user.id, login: user.login }};
  }

  static async logout(refreshToken: string) {
    return await TokenService.removeRefreshToken(refreshToken);
  }

  static async refresh(refreshToken: string) {    
    if (!refreshToken) throw ApiError.unauthorizedError();

    const tokenData = TokenService.verifyRefreshToken(refreshToken) as IUser;
    const tokeFromDb = await prisma.token.findUnique({ where: {refresh_token: refreshToken} })    
    if (!tokeFromDb || !tokenData) throw ApiError.unauthorizedError();

    await TokenService.removeRefreshToken(refreshToken)

    const user = await prisma.user.findFirst({ where: { id: tokenData.id } });
    if (!user) throw ApiError.badRequest("Такого пользователя не существует!");

    const tokens = TokenService.generateTokens({ id: user.id, login: user.login });
    await TokenService.saveRefreshToken(tokens.refreshToken, user.id);

    return {...tokens, user: { id: user.id, login: user.login }};
  }

  static async registration(login: string, password: string){
    const user = await prisma.user.findFirst({ where: { login } })
    if(user) throw ApiError.badRequest("Пользователь с таким login уже существует!")

    const hashPassword = createHash("sha256").update(password).digest("hex")

    const userData = await prisma.user.create({ data: { login, password: hashPassword } });

    // return await this.login(login, password)
    return {id: userData.id, login: userData.login}
  }

  static async changePassword(login: string, oldPassword: string, newPassword: string){
    const user = await prisma.user.findFirst({ where: { login } })
    if(!user) throw ApiError.badRequest("Такого пользователя не существует!");
    if (user.password !== createHash("sha256").update(oldPassword).digest("hex")) throw ApiError.badRequest("Неверный пароль");

    const hashNewPassword = createHash("sha256").update(newPassword).digest("hex")
    
    return await prisma.user.update({ data: { password: hashNewPassword }, where: { login } })
  }
}
