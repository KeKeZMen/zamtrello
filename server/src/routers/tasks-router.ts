import { Router } from "express";
import TasksController from "../controllers/tasks-controller.js";
import authMiddleware from "../middlewares/auth-middleware.js";

const tasksRouter = Router()

tasksRouter.get("/boards", authMiddleware, TasksController.getBoards)
tasksRouter.put("/createboard", authMiddleware, TasksController.createBoard)
tasksRouter.put("/inviteboard", authMiddleware, TasksController.inviteBoard)
tasksRouter.delete("/deleteboard", authMiddleware, TasksController.deleteBoard)
tasksRouter.delete("/leaveboard", authMiddleware, TasksController.leaveBoard)

export default tasksRouter