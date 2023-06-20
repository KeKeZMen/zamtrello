import { NextFunction, Request, Response } from "express";
import TasksService from "../services/tasks-service.js";

export default class TasksController {
  static async createBoard(req: Request, res: Response, next: NextFunction) {
    try {
      const { boardTitle } = req.body;
      const { id: userId } = req.body.user;
      await TasksService.createBoard(boardTitle, parseInt(userId));
      return res.json({ message: "Доска была создана!" });
    } catch (error) {
      next(error);
    }
  }

  static async deleteBoard(req: Request, res: Response, next: NextFunction) {
    try {
      const { boardId } = req.body;
      const { id: userId } = req.body.user;
      await TasksService.deleteBoard(parseInt(boardId), parseInt(userId));
      return res.json({ message: "Доска была удалена!" });
    } catch (error) {
      next(error);
    }
  }

  static async getBoards(req: Request, res: Response, next: NextFunction) {
    try {
      const { id: userId } = req.body.user;
      const boards = await TasksService.getBoards(parseInt(userId));      
      return res.json(boards);
    } catch (error) {
      next(error);
    }
  }

  static async leaveBoard(req: Request, res: Response, next: NextFunction) {
    try {
      const { boardId } = req.body;
      const { id: userId } = req.body.user;
      await TasksService.leaveBoard(parseInt(boardId), parseInt(userId));
      return res.json({ message: "Вы покинули доску!" });
    } catch (error) {
      next(error);
    }
  }

  static async inviteBoard(req: Request, res: Response, next: NextFunction){
    try {
      const { boardId, login: userLogin } = req.body
      const { id: creatorId } = req.body.user
      await TasksService.inviteBoard(parseInt(boardId), userLogin, parseInt(creatorId));
      return res.json({ message: "Вы пригласили пользователя в доску!" })
    } catch (error) {
      next(error)
    }
  }

  static async createTask(req: Request, res: Response, next: NextFunction) {
    try {
      const { taskDescription, taskFinalData, taskTitle, boardId, taskStatus } = req.body
      const { id: userId } = req.body.user
      await TasksService.createTask(taskDescription, new Date(taskFinalData), taskTitle, parseInt(userId), parseInt(boardId), taskStatus)
      return res.json({ message: "Задача успешно создана!" });
    } catch (error) {
      next(error)
    }
  }

  static async deleteTask(req: Request, res: Response, next: NextFunction) {
    try {
      const { taskId } = req.body
      const { id: userId } = req.body.user
      await TasksService.deleteTask(parseInt(taskId), parseInt(userId));
      return res.json({ message: "Задача успешно удалена!" })
    } catch (error) {
      next(error)
    }
  }

  static async successTask(req: Request, res: Response, next: NextFunction) {
    try {
      const { taskId } = req.body
      const { id: userId } = req.body.user
      await TasksService.successTask(parseInt(taskId), parseInt(userId))
      return res.json({ message: "Задача выполнена!" })
    } catch (error) {
      next(error)
    }
  }

  static async getTasks(req: Request, res: Response, next: NextFunction) {
    try {
      const { id: boardId } = req.params
      const { id: userId } = req.body.user;
      const tasks = await TasksService.getTasks(parseInt(boardId), parseInt(userId));
      return res.json(tasks)
    } catch (error) {
      next(error)
    }
  }
}
