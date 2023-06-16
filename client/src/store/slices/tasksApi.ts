import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { axiosBaseQuery } from "../../http/axiosBaseQuery";
import {
  CreateBoardType,
  DeleteBoardType,
  TasksApiMessageType,
  InviteToBoardType,
  LeaveFromBoardType,
  CreateTaskType,
  SuccessTaskType,
  DeleteTaskType,
  GetTasksType,
} from "../../models/TasksApiTypes";
import IBoard from "../../models/IBoard";
import ITask from "../../models/ITask";

export const tasksApi = createApi({
  reducerPath: "tasks",
  baseQuery: axiosBaseQuery({ baseUrl: "/tasks" }),
  tagTypes: ["Board", "Task"],
  endpoints: (build) => ({
    // ---------------------------------------------------- BOARDS --------------------------------------------------------------------//
    createBoard: build.mutation<TasksApiMessageType, CreateBoardType>({
      query: ({ boardTitle }) => ({
        url: "/createboard",
        method: "POST",
        data: { boardTitle },
      }),
      invalidatesTags: ["Board"],
    }),

    deleteBoard: build.mutation<TasksApiMessageType, DeleteBoardType>({
      query: ({ boardId }) => ({
        url: "/deleteboard",
        method: "DELETE",
        data: { boardId },
      }),
      invalidatesTags: ["Board"],
    }),

    inviteToBoard: build.mutation<TasksApiMessageType, InviteToBoardType>({
      query: ({ boardId, userId }) => ({
        url: "/inviteboard",
        method: "PUT",
        data: { boardId, userId },
      }),
    }),

    leaveFromBoard: build.mutation<TasksApiMessageType, LeaveFromBoardType>({
      query: ({ boardId }) => ({
        url: "/leaveboard",
        method: "DELETE",
        data: { boardId },
      }),
      invalidatesTags: ["Board"],
    }),

    getBoards: build.query<Array<IBoard>, null>({
      query: () => ({
        url: `/boards`,
        method: "GET",
      }),
      providesTags: ["Board"],
    }),

    // ---------------------------------------------------- TASKS --------------------------------------------------------------------//
    createTask: build.mutation<TasksApiMessageType, CreateTaskType>({
      query: ({ boardId, taskDescription, taskFinalData, taskTitle }) => ({
        url: "/createtask",
        method: "POST",
        data: { boardId, taskDescription, taskFinalData, taskTitle },
      }),
      invalidatesTags: ["Task"],
    }),

    successTask: build.mutation<TasksApiMessageType, SuccessTaskType>({
      query: ({ taskId }) => ({
        url: "/successtask",
        method: "PATCH",
        data: { taskId },
      }),
      invalidatesTags: ["Task"],
    }),

    deleteTask: build.mutation<TasksApiMessageType, DeleteTaskType>({
      query: ({ taskId }) => ({
        url: "/deletetask",
        method: "DELETE",
        data: { taskId },
      }),
      invalidatesTags: ["Task"],
    }),

    getTasks: build.query<Array<ITask>, GetTasksType>({
      query: ({ boardId }) => ({
        url: `/board/${boardId}`,
        method: "GET",
      }),
      providesTags: ["Task"],
    }),
  }),
});

export const {
  useCreateBoardMutation,
  useDeleteBoardMutation,
  useGetBoardsQuery,
  useInviteToBoardMutation,
  useLeaveFromBoardMutation,
  useCreateTaskMutation,
  useDeleteTaskMutation,
  useGetTasksQuery,
  useSuccessTaskMutation,
} = tasksApi;
