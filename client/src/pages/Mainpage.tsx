import { lazy, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import { Button, Box, Modal, TextField, Card } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

import { useCreateBoardMutation, useGetBoardsQuery } from "../store/slices/tasksApi";

import Board from "../components/Board";
import Loading from "../components/Loading";
const Layout = lazy(() => import("../components/Layout"));

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

  const { data, isLoading } = useGetBoardsQuery(null);

  return (
    <Layout>
      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
        {isLoading ? (<Loading />) : (data?.map((board) => <Board board={board} key={board.id} />))}

        <Card sx={{ m: 1, width: 250, display: "flex", justifyContent: 'center', alignItems: "center", height: 125 }}>
          <Button sx={{ height: "100%", width: "100%" }} onClick={handleOpenModal}>
            <AddCircleOutlineIcon fontSize="large"/>
          </Button>
        </Card>
      </Box>

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
    </Layout>
  );
};

export default Mainpage;
