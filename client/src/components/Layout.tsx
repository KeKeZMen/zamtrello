import { FC, ReactNode, useState } from "react";

import { Container } from "@mui/material";

import Header from "./Header";
import Menu from "./Menu";

type PropsType = {
  children: ReactNode;
};

const Layout: FC<PropsType> = ({ children }) => {
  const [isOpenedMenu, setIsOpenedMenu] = useState(false);

  return (
    <>
      <Header setIsOpenedMenu={setIsOpenedMenu}/>
      <Menu isOpenedMenu={isOpenedMenu} setIsOpenedMenu={setIsOpenedMenu}/>
      <Container component="main">{children}</Container>
    </>
  );
};

export default Layout;