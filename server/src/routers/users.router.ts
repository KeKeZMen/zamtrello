import { Router } from "express"
import { check } from "express-validator"

import UserController from "../controllers/users.controller.js"
import authMiddleware from "../middlewares/auth.middleware.js"

const userRouter = Router()

userRouter.post("/login", UserController.login)
userRouter.post("/logout", UserController.logout)
userRouter.post("/registration", [
    check("login", "Имя пользователя не может быть пустым!").notEmpty(),
    check("password", "Пароль должен быть больше 4 и меньше 20 символов!").isLength({ min: 4, max: 20 })
], UserController.registration)
userRouter.post("/changepass", authMiddleware, UserController.changePassword)
userRouter.get("/refresh", UserController.refresh)
userRouter.get("/activate/:link", UserController.activateAccount)

export default userRouter