import { useForm, SubmitHandler } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useState } from "react";

import { Button, Box, Modal, TextField } from "@mui/material";

import {
  useCreateTaskMutation,
  useGetTasksQuery,
} from "../store/slices/tasksApi";

import Task from "../components/Task";
import Loading from "../components/Loading";
import Layout from "../components/Layout";

type CreateTaskFormType = {
  boardId: number;
  taskDescription: string;
  taskTitle: string;
  taskFinalData: Date;
};

const Boardpage = () => {
  const { id: boardId } = useParams();
  if (!boardId) return <Loading />;

  const [isOpenedModal, setIsOpenedModal] = useState(false);
  const handleOpenModal = () => setIsOpenedModal(true);
  const handleCloseModal = () => setIsOpenedModal(false);

  const [createTask, {}] = useCreateTaskMutation();
  const { register, handleSubmit } = useForm<CreateTaskFormType>();
  const onSubmit: SubmitHandler<CreateTaskFormType> = (data) =>
    createTask({
      boardId: parseInt(boardId),
      taskDescription: data.taskDescription,
      taskTitle: data.taskTitle,
      taskFinalData: data.taskFinalData,
    });

  const { data, isLoading } = useGetTasksQuery({ boardId: parseInt(boardId) });

  return (
    <Layout>
      {isLoading ? (<Loading />) : (
        <Box sx={{ display: "flex", justifyContent: "space-around" }}>
          <Box>
            {(data?.map((task) => <Task task={task} key={task.id} />))}
          </Box>

          <Box>test</Box>
        </Box>
      )}

      <Button onClick={handleOpenModal}>Добавить задачу</Button>

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
    </Layout>
  );
};

export default Boardpage;
