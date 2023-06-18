import { useState } from "react";
import { Link } from "react-router-dom";

import { AppBar, IconButton, Toolbar, Drawer, Box, Button, List, ListItemButton, ListItemIcon, ListItemText, Container } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";

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
        <Container>
          <Toolbar variant="regular" sx={{ display: "flex", justifyContent: "space-between" }} disableGutters>
            <IconButton color="inherit" onClick={handleOpenMenu}>
              <MenuIcon />
            </IconButton>

            <Button variant="contained" onClick={handleLogout}>Выйти</Button>
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer open={isOpenedMenu} anchor="left" onClose={handleCloseMenu}>
        <Box sx={{ width: 200 }}>
          <List disablePadding>
            <Link to="/">
              <ListItemButton onClick={handleCloseMenu}>
                <ListItemIcon>
                  <DashboardIcon/>
                </ListItemIcon>

                <ListItemText primary="Доски"/>
              </ListItemButton>
            </Link>
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Nav;
