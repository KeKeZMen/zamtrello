import { FC } from "react";

import { Card, CardContent, Typography } from "@mui/material";

import ITask from "../models/ITask";

type PropsType = {
  task: ITask;
};

const Task: FC<PropsType> = ({ task }) => {
  return (
    <Card key={task.id}>
      <CardContent>
        <Typography>{task.title}</Typography>
        <Typography>{task.description}</Typography>
        <Typography>{task.final_date.toLocaleString()}</Typography>
      </CardContent>
    </Card>
  );
};

export default Task;
