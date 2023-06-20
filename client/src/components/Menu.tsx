import { useState, FC } from "react";
import { Link } from "react-router-dom";

import { Drawer, Box, List, ListItemButton, ListItemIcon, ListItemText, Collapse, Typography } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

type PropsType = {
  isOpenedMenu: boolean;
  setIsOpenedMenu: (value: boolean | ((prev: boolean) => boolean)) => void;
};

const Menu: FC<PropsType> = ({ isOpenedMenu, setIsOpenedMenu }) => {
  const [isOpenedBoardActions, setIsOpenedBoardActions] = useState(false);
  const handleBoardActions = () => setIsOpenedBoardActions((prev) => !prev);
  const handleCloseMenu = () => setIsOpenedMenu(false);

  return (
    <Drawer open={isOpenedMenu} anchor="left" onClose={handleCloseMenu}>
      <Box sx={{ width: 200 }}>
        <List disablePadding>
          <ListItemButton onClick={handleBoardActions}>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Доски" />
            {isOpenedBoardActions ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>

          <Collapse unmountOnExit in={isOpenedBoardActions} timeout="auto">
            <ListItemButton sx={{ pl: 4 }}>
              <Link to="/">
                <Typography>Перейти к доскам</Typography>
              </Link>
            </ListItemButton>
          </Collapse>
        </List>
      </Box>
    </Drawer>
  );
};

export default Menu;
