import { FC, MouseEvent } from "react";

import { Card, CardContent, Typography } from "@mui/material";

import ITask from "../models/ITask";

type PropsType = {
  task: ITask;
};

const Task: FC<PropsType> = ({ task }) => {
  const handleDoubleClick = (e: MouseEvent<HTMLSpanElement>) => {
    console.log(e.currentTarget)
  }

  return (
    <Card key={task.id} sx={{ mb: 3, minHeight: 120  }} draggable>
      <CardContent>
        <Typography onDoubleClick={handleDoubleClick} variant="h4">{task.title}</Typography>
        <Typography onDoubleClick={handleDoubleClick}>{task.description}</Typography>
        <Typography onDoubleClick={handleDoubleClick}>{task.final_date.toLocaleString()}</Typography>
      </CardContent>
    </Card>
  );
};

export default Task;
