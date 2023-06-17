import { FC, ReactNode } from "react";

import { Container } from "@mui/material";

import Nav from "./Nav";

type PropsType = {
  children: ReactNode;
};

const Layout: FC<PropsType> = ({ children }) => {
  return (
    <>
      <Nav />
      <Container component="main">{children}</Container>
    </>
  );
};

export default Layout;
