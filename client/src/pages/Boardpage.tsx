import { useState } from "react";
import { useParams } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";

import { Box, Button, Modal, TextField } from "@mui/material"
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import PendingIcon from "@mui/icons-material/Pending";

import { useChangeTaskStatusMutation, useCreateTaskMutation, useGetTasksQuery } from "../store/slices/tasksApi";

import Loading from "../components/Loading";
import Layout from "../components/Layout";
import BoardColumn, { CreateTaskFormType } from "../components/BoardColumn";

const Boardpage = () => {
  const { id: boardId } = useParams();
  if (!boardId) return <Loading />;

  const { register, handleSubmit } = useForm<CreateTaskFormType>();
  const [createTask, { isLoading: isLoadingCreateTask }] = useCreateTaskMutation();
  const onSubmit: SubmitHandler<CreateTaskFormType> = (data) => 
    createTask({ boardId: parseInt(boardId), taskDescription: data.taskDescription, taskTitle: data.taskTitle, taskFinalData: data.taskFinalData, taskStatus: data.taskStatus });
  const [isOpenedModal, setIsOpenedModal] = useState(false);
  const handleOpenModal = () => setIsOpenedModal(true);
  const handleCloseModal = () => setIsOpenedModal(false);

  const { data, isLoading } = useGetTasksQuery({ boardId: parseInt(boardId) });

  const [changeTaskStatus, {}] = useChangeTaskStatusMutation()
  const onChangeStatus = (cardInfo: string, newStatus: string) => {
    const parsedCardInfo = JSON.parse(cardInfo) as { id: number, status: string };
    changeTaskStatus({ taskId: parsedCardInfo.id, newStatus })
  }

  return (
    <>
      <Layout>
        {isLoading ? (<Loading />) : data?.map((tasks, index) => (
          <BoardColumn boardId={boardId} status={tasks.status} tasks={tasks.tasks} key={index} changeTaskStatus={onChangeStatus}/>
        ))}

        <Button sx={{ ml: 3 }} onClick={handleOpenModal}>
          {isLoadingCreateTask ? (<PendingIcon fontSize="large" />) : (<AddCircleOutlineIcon fontSize="large" />)}
        </Button>
      </Layout>

      <Modal
        open={isOpenedModal}
        onClose={handleCloseModal}
        sx={{ display: "flex", justifyContent: "center", mt: 20 }}
      >
        <Box
          component={"form"}
          onSubmit={handleSubmit(onSubmit)}
          sx={{
            background: "white",
            width: 300,
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
            label="Статус задачи"
            {...register("taskStatus")}
            fullWidth
          />
          <TextField
            sx={{ mb: 2 }}
            required
            {...register("taskFinalData")}
            type="date"
            fullWidth
          />
          <Button type="submit" fullWidth>
            Добавить
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default Boardpage;
