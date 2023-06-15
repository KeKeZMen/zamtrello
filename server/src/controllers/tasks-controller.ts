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
      const { boardId, userId } = req.body
      const { id: creatorId } = req.body.user
      await TasksService.inviteBoard(parseInt(boardId), parseInt(userId), parseInt(creatorId));
      return res.json({ message: "Вы пригласили пользователя в доску!" })
    } catch (error) {
      next(error)
    }
  }
}
