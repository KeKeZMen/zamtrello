import { useState, FC } from "react";
import { Link } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";

import {
  Box,
  Modal,
  Button,
  Typography,
  CardContent,
  Card,
  TextField,
} from "@mui/material";

import { useInviteToBoardMutation } from "../store/slices/tasksApi";
import IBoard from "../models/IBoard";

type PropsType = {
  board: IBoard;
};

type InviteFormType = {
  login: string;
};

const Board: FC<PropsType> = ({ board }) => {
  const [isOpenedModal, setIsOpenedModal] = useState(false);
  const handleOpenModal = () => setIsOpenedModal(true);
  const handleCloseModal = () => setIsOpenedModal(false);

  const [inviteToBoard, {}] = useInviteToBoardMutation();
  const { register, handleSubmit } = useForm<InviteFormType>();
  const onSubmit: SubmitHandler<InviteFormType> = (data) =>
    inviteToBoard({ boardId: board.id, login: data.login });

  return (
    <Card key={board.id} sx={{ mt: 3, mb: 3 }}>
      <CardContent>
        <Link to={`/board/${board.id}`}>
          <Typography>{board.title}</Typography>
        </Link>

        <Button onClick={handleOpenModal}>Добавить пользователя</Button>

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
              label="Имя пользователя"
              autoFocus
              {...register("login")}
              fullWidth
            />
            <Button variant="outlined" type="submit" fullWidth>
              Подтвердить
            </Button>
          </Box>
        </Modal>
      </CardContent>
    </Card>
  );
};

export default Board;
