import { useState } from "react";
import { Link } from "react-router-dom";

import { AppBar, IconButton, Toolbar, Drawer, Divider, Box, Button } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft"

import { useAppDispatch } from "../hooks/reduxHooks";
import { logoutUser } from "../store/thunks/authThunk";

const Nav = () => {
  const dispatch = useAppDispatch()
  const handleLogout = () => dispatch(logoutUser())

  const [isOpenedMenu, setIsOpenedMenu] = useState(false);
  const handleOpenMenu = () => setIsOpenedMenu(true);
  const handleCloseMenu = () => setIsOpenedMenu(false);

  return (
    <>
      <AppBar position="static" sx={{ mb: 2 }}>
        <Toolbar variant="regular" sx={{ display: "flex", justifyContent: "space-between" }}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleOpenMenu}
          >
            <MenuIcon />
          </IconButton>

          <Button variant="contained" onClick={handleLogout}>Выйти</Button>
        </Toolbar>
      </AppBar>

      <Drawer open={isOpenedMenu} anchor="left">
        <IconButton onClick={handleCloseMenu}>
          <ChevronLeftIcon/>
        </IconButton>

        <Divider/>

        <Box p={3}>
          <Link to="/">Доски</Link>
        </Box>
      </Drawer>
    </>
  );
};

export default Nav;
