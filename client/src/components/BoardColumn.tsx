import { FC, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import { Box, Typography, Card, Button, Modal, TextField } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import PendingIcon from "@mui/icons-material/Pending";

import { useCreateTaskMutation } from "../store/slices/tasksApi";
import ITask from "../models/ITask";

import Task from "./Task";

type PropsType = {
  tasks: Array<ITask>;
  status: string;
  boardId: string;
};

export type CreateTaskFormType = {
  boardId: number;
  taskDescription: string;
  taskTitle: string;
  taskFinalData: Date;
  taskStatus: string
};

const BoardColumn: FC<PropsType> = ({ boardId, status, tasks }) => {
  const { register, handleSubmit } = useForm<CreateTaskFormType>();
  const [createTask, { isLoading: isLoadingCreateTask }] = useCreateTaskMutation();
  const onSubmit: SubmitHandler<CreateTaskFormType> = (data) => 
    createTask({ boardId: parseInt(boardId), taskDescription: data.taskDescription, taskTitle: data.taskTitle, taskFinalData: data.taskFinalData, taskStatus: status });

  const [isOpenedModal, setIsOpenedModal] = useState(false);
  const handleOpenModal = () => setIsOpenedModal(true);
  const handleCloseModal = () => setIsOpenedModal(false);

  return (
    <>
      <Box sx={{ mr: 3, alignItems: "center" }}>
        <Typography variant="h5" align="center">{status}</Typography>

        <Box marginTop={2}>
          {tasks.map(task => <Task task={task} key={task.id} />)}
          
          <Card sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: 120, width: 300 }}>
            <Button sx={{ height: "100%", width: "100%" }} onClick={handleOpenModal}>
              {isLoadingCreateTask ? (<PendingIcon fontSize="large" />) : (<AddCircleOutlineIcon fontSize="large" />)}
            </Button>
          </Card>
        </Box>
      </Box>

      <Modal
        open={isOpenedModal}
        onClose={handleCloseModal}
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 20,
        }}
      >
        <Box
          component={"form"}
          onSubmit={handleSubmit(onSubmit)}
          sx={{
            background: "white",
            width: 400,
            maxHeight: 400,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            borderRadius: 2,
            p: 2,
          }}
        >
          <TextField
            sx={{ mb: 2 }}
            required
            label="Название задачи"
            autoFocus
            {...register("taskTitle")}
            fullWidth
          />
          <TextField
            sx={{ mb: 2 }}
            required
            label="Описание задачи"
            {...register("taskDescription")}
            fullWidth
          />
          <TextField
            sx={{ mb: 2 }}
            required
            {...register("taskFinalData")}
            type="date"
            fullWidth
          />
          <Button variant="outlined" type="submit" fullWidth>
            Подтвердить
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default BoardColumn;
