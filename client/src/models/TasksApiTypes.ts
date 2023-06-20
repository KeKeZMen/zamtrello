import ITask from "./ITask";

export type CreateBoardType = {
  boardTitle: string;
};

export type DeleteBoardType = {
  boardId: number;
};

export type TasksApiMessageType = {
  message: string;
};

export type InviteToBoardType = {
  boardId: number;
  login: string;
};

export type LeaveFromBoardType = {
  boardId: number;
};

export type CreateTaskType = {
  taskDescription: string;
  taskFinalData: Date;
  taskTitle: string;
  boardId: number;
  taskStatus: string;
};

export type SuccessTaskType = {
  taskId: number;
};

export type DeleteTaskType = {
  taskId: number;
};

export type GetTasksType = {
  boardId: number;
};

export type GetTasksAnswerType = {
  status: string
  tasks: Array<ITask>
}
