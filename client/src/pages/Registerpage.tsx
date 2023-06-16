import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Skeleton, Container, CssBaseline, Typography } from "@mui/material";

import { useAppSelector } from "../hooks/reduxHooks";
import { registrationUser } from "../store/thunks/authThunk";

import Userform from "../components/Userform";

const Registerpage: FC = () => {
  const { isAuth, errorData, isError, isLoading } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuth) navigate("/");
  }, [isAuth]);

  if (isLoading) return <Skeleton variant="rectangular" />;

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />

      <Userform
        linkHref={"/login"}
        linkHrefText={"Есть аккаунт? Войти"}
        onSubmitAction={registrationUser}
        title={"Зарегистрироваться"}
      />

      {isError && <Typography>{errorData?.message}</Typography>}
    </Container>
  );
};

export default Registerpage;
