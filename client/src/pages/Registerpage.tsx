import { useForm, SubmitHandler } from "react-hook-form";
import { FC, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Skeleton, Container, Typography, Avatar, Box, Button, TextField } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import PendingIcon from "@mui/icons-material/Pending";

import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { registrationUser, RegisterType } from "../store/thunks/authThunk";

const Registerpage: FC = () => {
  const { isAuth, errorData, isError, isLoading } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const { register, handleSubmit } = useForm<RegisterType>();
  const onSubmit: SubmitHandler<RegisterType> = (data) =>
    dispatch(registrationUser({ login: data.login, password: data.password, email: data.email }));

  const navigate = useNavigate();
  useEffect(() => {
    if (isAuth) navigate("/");
  }, [isAuth]);

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Зарегистрироваться
        </Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Логин"
            autoFocus
            autoComplete="on"
            {...register("login")}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Пароль"
            type="password"
            autoComplete="on"
            {...register("password")}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Почта"
            type="email"
            autoComplete="on"
            {...register("email")}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            {isLoading ? <PendingIcon /> : <>Зарегистрироваться</>}
          </Button>
          <Link to="/login">Есть аккаунт? Войти</Link>
        </Box>
      </Box>

      {isError && <Typography>{errorData?.message}</Typography>}
    </Container>
  );
};

export default Registerpage;
