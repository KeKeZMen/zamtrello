import { Container, Skeleton } from "@mui/material";

const Loading = () => {
  return (
    <Container>
      <Skeleton variant="rectangular" width={210} height={118} />
      <Skeleton variant="rectangular" width={210} height={118} />
      <Skeleton variant="rectangular" width={210} height={118} />
    </Container>
  );
};

export default Loading;
