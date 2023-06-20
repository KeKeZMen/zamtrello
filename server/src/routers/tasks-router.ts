import { Router } from "express";
import TasksController from "../controllers/tasks-controller.js";
import authMiddleware from "../middlewares/auth-middleware.js";

const tasksRouter = Router()

tasksRouter.get("/boards", authMiddleware, TasksController.getBoards)
tasksRouter.post("/createboard", authMiddleware, TasksController.createBoard)
tasksRouter.put("/inviteboard", authMiddleware, TasksController.inviteBoard)
tasksRouter.delete("/deleteboard", authMiddleware, TasksController.deleteBoard)
tasksRouter.delete("/leaveboard", authMiddleware, TasksController.leaveBoard)

tasksRouter.post("/createtask", authMiddleware, TasksController.createTask)
tasksRouter.patch("/successtask", authMiddleware, TasksController.changeTaskStatus)
tasksRouter.delete("/deletetask", authMiddleware, TasksController.deleteTask)
tasksRouter.get("/board/:id", authMiddleware, TasksController.getTasks)

export default tasksRouter