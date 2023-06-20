import ApiError from "../exceptions/api-error.js";
import prisma from "./db-service.js";

export default class TasksService {
  static async createBoard(boardTitle: string, userId: number) {
    const boardId = await prisma.board.create({ data: { title: boardTitle, creator_id: userId } });
    return await prisma.userboards.create({ data: { user_id: userId, board_id: boardId.id } })
  }

  static async deleteBoard(boardId: number, userId: number) {
    const userBoard = await prisma.userboards.findFirst({ where: { AND: { board_id: boardId, user_id: userId } }})
    if(!userBoard) throw ApiError.badRequest("Вы пытаетесь удалить несуществующую доску!")

    const boardCreator = await prisma.board.findFirst({ where: { creator_id: userId } })
    if(!boardCreator) throw ApiError.badRequest("Вы не являетесь создателем доски!")

    return await prisma.$transaction([
      prisma.task.deleteMany({ where: { board_id: boardId } }),
      prisma.userboards.deleteMany({ where: { board_id: boardId } }),
      prisma.board.delete({ where: { id: boardId } })
    ])
  }

  static async leaveBoard(boardId: number, userId: number){
    const userBoard = await prisma.userboards.findFirst({ where: { AND: { board_id: boardId, user_id: userId } }, select: { id: true } })
    if(!userBoard) throw ApiError.badRequest("Вы пытаетесь покинуть несуществующую доску!")

    return await prisma.userboards.delete({ where: { id: userBoard.id } });
  }

  static async getBoards(userId: number){    
    return await prisma.board.findMany({ where: { userboards: { some: { user_id: userId } } } })
  }

  static async inviteBoard(boardId: number, login: string, creatorId: number){
    const creatorData = await prisma.board.findFirst({ where: { AND: { id: boardId, creator_id: creatorId } } })
    if(!creatorData) throw ApiError.badRequest("Вы не являетесь создателем доски!")

    const user = await prisma.user.findFirst({ where: { login } })
    if(!user) throw ApiError.badRequest("Такого пользователя не существует!")

    const userInBoard = await prisma.userboards.findFirst({ where: { AND: { user_id: user.id, board_id: boardId } } })
    if(userInBoard) throw ApiError.badRequest("Указанный пользователь уже является участником доски!")

    return await prisma.userboards.create({ data: { user_id: user.id, board_id: boardId } })
  }

  static async createTask(taskDescription: string, taskFinalData: Date, taskTitle: string, userId: number, boardId: number, status: string){
    const userBoards = await prisma.userboards.findFirst({ where: { AND: { board_id: boardId, user_id: userId } } })
    if(!userBoards) throw ApiError.badRequest("Данной доски не существует!")

    return await prisma.task.create({
      data: { description: taskDescription, final_date: taskFinalData, title: taskTitle, creator_id: userId, board_id: boardId, status },
    });
  }

  static async deleteTask(taskId: number, userId: number){
    const board = await prisma.board.findFirst({ where: { tasks: { some: { id: taskId } } } })
    const userBoards = await prisma.userboards.findFirst({ where: { AND: { board_id: board?.id, user_id: userId } } })
    if(!userBoards) throw ApiError.badRequest("Данной доски не существует!")

    return await prisma.task.delete({ where: { id: taskId } })
  }

  static async changeTaskStatus(taskId: number, newStatus: string, userId: number){
    const board = await prisma.board.findFirst({ where: { tasks: { some: { id: taskId } } } })
    const userBoards = await prisma.userboards.findFirst({ where: { AND: { board_id: board?.id, user_id: userId } } })
    if(!userBoards) throw ApiError.badRequest("Данной доски не существует!")

    return await prisma.task.update({ where: { id: taskId }, data: { status: newStatus } })
  }

  static async getTasks(boardId: number, userId: number){
    const userBoards = await prisma.userboards.findFirst({ where: { AND: { board_id: boardId, user_id: userId } } })
    if(!userBoards) throw ApiError.badRequest("Данной доски не существует!")

    const tasks = await prisma.task.findMany({ where: { board_id: boardId } })
    const taskStatuses = Array.from(new Set(tasks.map(task => task.status)))
    return taskStatuses.map((status) => ({ status, tasks: tasks.filter(task => task.status === status)}))
  }
}
