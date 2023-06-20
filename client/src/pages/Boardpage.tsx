import { useForm, SubmitHandler } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { Button, Box, Modal, TextField, Typography, Card } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

import { useCreateTaskMutation, useGetTasksQuery } from "../store/slices/tasksApi";

import Task from "../components/Task";
import Loading from "../components/Loading";
import Layout from "../components/Layout";
import ITask from "../models/ITask";

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
  const handleOpenModal = () => setIsOpenedModal(true)
  const handleCloseModal = () => setIsOpenedModal(false);
  
  const { register, handleSubmit } = useForm<CreateTaskFormType>();
  const [createTask, {}] = useCreateTaskMutation();
  const onSubmit: SubmitHandler<CreateTaskFormType> = (data) =>
    createTask({
      boardId: parseInt(boardId),
      taskDescription: data.taskDescription,
      taskTitle: data.taskTitle,
      taskFinalData: data.taskFinalData,
    });

  const { data, isLoading } = useGetTasksQuery({ boardId: parseInt(boardId) });
  const [inWorkTasks, setInWorkTasks] = useState<Array<ITask>>([]);
  const [failedTasks, setFailedTasks] = useState<Array<ITask>>([]);
  const [successTasks, setSuccessTasks] = useState<Array<ITask>>([])
  useEffect(() => {
    data?.forEach(task => {
      task.status === "IN_WORK" ? 
        setInWorkTasks([...inWorkTasks, task]) : 
        task.status === "FAILED" ? 
          setFailedTasks([...failedTasks, task]) : 
          setSuccessTasks([...successTasks, task])
    })
  }, [data])

  return (
    <Layout>
      {isLoading ? (<Loading />) : (
        <Box sx={{ display: "flex" }}>
          <Box sx={{ width: `${100 / 3}%`, mr: 3 }}>
            <Typography variant="h5" align="center">В работе</Typography>

            <Box marginTop={2}>
              {inWorkTasks.map(task => <Task task={task} key={task.id} />)}

              <Card sx={{  display: "flex", justifyContent: 'center', alignItems: "center", height: 120 }}>
                <Button sx={{ height: "100%", width: "100%" }} onClick={handleOpenModal}>
                  <AddCircleOutlineIcon fontSize="large"/>
                </Button>
              </Card>
            </Box>
          </Box>

          <Box sx={{ width: `${100 / 3}%`, mr: 3 }}>
            <Typography variant="h5" align="center">Просроченные</Typography>

            <Box marginTop={2}>
              {failedTasks.map(task => <Task task={task} key={task.id} />)}
            </Box>
          </Box>

          <Box sx={{ width: `${100 / 3}%` }}>
            <Typography variant="h5" align="center">Выполненные</Typography>
            
            <Box marginTop={2}>
              {successTasks.map(task => <Task task={task} key={task.id} />)}
            </Box>
          </Box>
        </Box>
      )}

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
