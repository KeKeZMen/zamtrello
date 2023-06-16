import { useParams } from "react-router-dom";

import { Container, Skeleton } from "@mui/material";

import { useGetTasksQuery } from "../store/slices/tasksApi";
import Task from "../components/Task";

const Boardpage = () => {
  const { id } = useParams();
  if (!id) return <Skeleton variant="rectangular" width={210} height={118} />;

  const { data } = useGetTasksQuery({ boardId: parseInt(id) });

  return (
    <Container>
      {data?.map((task) => (
        <Task task={task} />
      ))}
    </Container>
  );
};

export default Boardpage;
