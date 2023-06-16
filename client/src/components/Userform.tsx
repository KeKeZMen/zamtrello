import { FC } from "react";
import { Link } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";

import { useAppDispatch } from "../hooks/reduxHooks";

type UserFormType = {
  login: string;
  password: string;
};

type PropsType = {
  onSubmitAction: ({}: UserFormType) => any;
  title: string;
  linkHref: string;
  linkHrefText: string;
};

const Userform: FC<PropsType> = ({ onSubmitAction, title, linkHref, linkHrefText }) => {
  const { register, handleSubmit } = useForm<UserFormType>();
  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<UserFormType> = (data) =>
    dispatch(onSubmitAction({ login: data.login, password: data.password }));

  return (
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
        {title}
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ mt: 1 }}
      >
        <TextField
          margin="normal"
          required
          fullWidth
          label="Логин"
          autoFocus
          {...register("login")}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          label="Пароль"
          type="password"
          autoComplete="current-password"
          {...register("password")}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          {title}
        </Button>
        <Link to={linkHref}>{linkHrefText}</Link>
      </Box>
    </Box>
  );
};

export default Userform;
