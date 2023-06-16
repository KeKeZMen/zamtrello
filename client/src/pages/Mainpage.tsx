import {
  Container,
  Button,
  Skeleton,
  Box,
  Modal,
  TextField,
} from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";

import {
  useCreateBoardMutation,
  useGetBoardsQuery,
} from "../store/slices/tasksApi";

import Board from "../components/Board";
import { useState } from "react";

type CreateBoardFormType = {
  boardTitle: string;
};

const Mainpage = () => {
  const [isOpenedModal, setIsOpenedModal] = useState(false);
  const handleOpenModal = () => setIsOpenedModal(true);
  const handleCloseModal = () => setIsOpenedModal(false);

  const [createBoard, {}] = useCreateBoardMutation();
  const { register, handleSubmit } = useForm<CreateBoardFormType>();
  const onSubmit: SubmitHandler<CreateBoardFormType> = (data) =>
    createBoard({ boardTitle: data.boardTitle });

  const { data } = useGetBoardsQuery(null);

  return (
    <Container component={"main"}>
      {data?.map((board) => (
        <Board board={board} />
      ))}

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
            width: 300,
            maxHeight: 200,
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
            label="Название доски"
            autoFocus
            {...register("boardTitle")}
            fullWidth
          />
          <Button variant="outlined" type="submit" fullWidth>
            Подтвердить
          </Button>
        </Box>
      </Modal>

      <Button onClick={handleOpenModal}>Создать доску</Button>
    </Container>
  );
};

export default Mainpage