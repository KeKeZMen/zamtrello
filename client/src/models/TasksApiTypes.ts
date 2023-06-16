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
