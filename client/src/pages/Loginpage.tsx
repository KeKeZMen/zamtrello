import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Skeleton, Container, CssBaseline, Typography } from "@mui/material";

import { useAppSelector } from "../hooks/reduxHooks";
import { loginUser } from "../store/thunks/authThunk";

import Userform from "../components/Userform";

const Loginpage: FC = () => {
  const { isAuth, errorData, isError, isLoading } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuth) navigate("/");
  }, [isAuth]);

  if(isLoading) return <Skeleton variant="rectangular" height={"100vh"}/>

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />

      <Userform
        linkHref={"/register"}
        linkHrefText={"Нет аккаунта? Создать"}
        onSubmitAction={loginUser}
        title={"Войти"}
      />

      {isError && <Typography>{errorData?.message}</Typography>}
    </Container>
  );
};

export default Loginpage;
