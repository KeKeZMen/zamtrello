import { useForm, SubmitHandler } from "react-hook-form";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Skeleton, Container, Typography, Avatar, Box, Button, TextField } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { LoginType, loginUser } from "../store/thunks/authThunk";

const Loginpage = () => {
  const { isAuth, errorData, isError, isLoading } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const { register, handleSubmit } = useForm<LoginType>();
  const onSubmit: SubmitHandler<LoginType> = (data) =>
    dispatch(loginUser({ login: data.login, password: data.password }));
  
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuth) navigate("/");
  }, [isAuth]);

  if (isLoading) return <Skeleton variant="rectangular" height={"100vh"} />;

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
          Войти
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
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Войти
          </Button>
          <Link to="/register">Нет аккаунта? Зарегестрироваться</Link>
        </Box>
      </Box>

      {isError && <Typography>{errorData?.message}</Typography>}
    </Container>
  );
};

export default Loginpage;
