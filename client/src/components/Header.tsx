import { FC } from "react";

import { AppBar, IconButton, Toolbar, Button, Container } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

import { useAppDispatch } from "../hooks/reduxHooks";
import { logoutUser } from "../store/thunks/authThunk";

type PropsType = {
  setIsOpenedMenu: (value: boolean | ((prev: boolean) => boolean)) => void;
};

const Header: FC<PropsType> = ({ setIsOpenedMenu }) => {
  const dispatch = useAppDispatch()
  const handleLogout = () => dispatch(logoutUser())
  const handleOpenMenu = () => setIsOpenedMenu(true);

  return (
    <AppBar position="static" sx={{ mb: 2 }}>
      <Container>
        <Toolbar variant="regular" sx={{ display: "flex", justifyContent: "space-between" }} disableGutters>
          <IconButton color="inherit" onClick={handleOpenMenu}>
            <MenuIcon />
          </IconButton>

          <Button variant="contained" onClick={handleLogout}>Выйти</Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
