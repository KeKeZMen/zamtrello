import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator"

import UserService from "../services/users.service.js";

export default class UserController {
  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { password, login } = req.body;
      const userData = await UserService.login(login, password);
      res.cookie("refreshToken", userData.refreshToken, { maxAge: 15 * 24 * 60 * 60 * 1000, httpOnly: true });
      return res.json(userData);
    } catch (error) {
      next(error)
    }
  }

  static async logout(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.cookies
      const token = await UserService.logout(refreshToken)
      res.clearCookie("refreshToken")
      return res.json(token)
    } catch (error) {
      next(error)
    }
  }

  static async refresh(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.cookies      
      const userData = await UserService.refresh(refreshToken)
      res.cookie("refreshToken", userData.refreshToken, { maxAge: 15 * 24 * 60 * 60 * 1000, httpOnly: true })
      return res.json(userData)
    } catch (error) {
      next(error)
    }
  }

  static async registration(req: Request, res: Response, next: NextFunction){
    try {
      const errors = validationResult(req)
      if(!errors.isEmpty()) return res.status(400).json({ message: "Ошибка при регистрации", errors })

      const { login, password, email } = req.body
      await UserService.registration(login, password, email)
      return res.json({ message: "Вы успешно зарегистрировались!" })
    } catch (error) {
      next(error)
    }
  }

  static async changePassword(req: Request, res: Response, next: NextFunction){
    try {
      const { login, oldPassword, newPassword } = req.body
      await UserService.changePassword(login, oldPassword, newPassword)
      return res.json({ message: `Пароль был сменен успешно!` })
    } catch (error) {
      next(error)
    }
  }

  static async activateAccount(req: Request, res: Response, next: NextFunction){
    try {
      const userUuid = req.params.link
      await UserService.activateAccount(userUuid)
      return res.redirect(process.env.CLIENT_URL || "http://localhsot:5173")
    } catch (error) {
      next(error)
    }
  }
}
