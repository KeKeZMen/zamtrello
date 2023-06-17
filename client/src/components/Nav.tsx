import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const Nav = () => {
  return (
    <AppBar position="static" sx={{ mb: 2 }}>
      <Toolbar variant="dense">
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" color="inherit" component="div">
          Photos
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Nav;
