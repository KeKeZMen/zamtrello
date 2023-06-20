import { useState, FC } from "react";
import { Link } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";

import { Box, Modal, Button, Typography, CardContent, Card, TextField, CardActions } from "@mui/material";
  
import { useDeleteBoardMutation, useInviteToBoardMutation, useLeaveFromBoardMutation } from "../store/slices/tasksApi";
import IBoard from "../models/IBoard";
import { useAppSelector } from "../hooks/reduxHooks";

type PropsType = {
  board: IBoard;
};

type InviteFormType = {
  login: string;
};

const Board: FC<PropsType> = ({ board }) => {
  const { user } = useAppSelector(state => state.auth)

  const [isOpenedModal, setIsOpenedModal] = useState(false);
  const handleOpenModal = () => setIsOpenedModal(true)
  const handleCloseModal = () => setIsOpenedModal(false);

  const [inviteToBoard, {}] = useInviteToBoardMutation();
  const { register, handleSubmit } = useForm<InviteFormType>();
  const onSubmit: SubmitHandler<InviteFormType> = (data) =>
    inviteToBoard({ boardId: board.id, login: data.login });

  const [deleteBoard, {}] = useDeleteBoardMutation()
  const handleDeleteBoard = () => deleteBoard({ boardId: board.id })

  const [leaveFromBoard, {}] = useLeaveFromBoardMutation()
  const handleLeaveBoard = () => leaveFromBoard({ boardId: board.id })

  return (
    <>
      <Card sx={{ m: 1, width: 250, height: 125 }}>
        <CardContent>
          <Link to={`/board/${board.id}`}>
            <Typography variant="h4">{board.title}</Typography>
          </Link>
        </CardContent>

        <CardActions>
          {board.creator_id === user.id ? (
            <>
              <Button onClick={handleOpenModal} size="small">Добавить</Button>
              <Button onClick={handleDeleteBoard} size="small">Удалить</Button>
            </>
          ) : (
            <Button size="small" onClick={handleLeaveBoard}>Покинуть</Button>
          )}
        </CardActions>
      </Card>

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
          <Button type="submit" fullWidth>
            Добавить
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default Board;
