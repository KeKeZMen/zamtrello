import { FC, DragEvent } from "react";

import { Card, CardContent, Typography, Button } from "@mui/material";

import { useDeleteTaskMutation } from "../store/slices/tasksApi";
import ITask from "../models/ITask";

type PropsType = {
  task: ITask;
};

const Task: FC<PropsType> = ({ task }) => {
  const dragStartHandler = (e: DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData("cardInfo", JSON.stringify({ id: task.id, status: task.status }))
  };

  const [deleteTask, {}] = useDeleteTaskMutation()
  const handleDeleteTask = () => deleteTask({ taskId: task.id })

  return (
    <Card key={task.id} sx={{ mb: 3, minHeight: 120, width: 300 }} draggable onDragStart={dragStartHandler}>
      <CardContent>
        <Typography variant="h4">{task.title}</Typography>
        <Typography>{task.description}</Typography>
        <Typography>{task.final_date.toLocaleString()}</Typography>
        <Button onClick={handleDeleteTask}>Удалить</Button>
      </CardContent>
    </Card>
  );
};

export default Task;
