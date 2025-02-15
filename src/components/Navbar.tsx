import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Box,
  Button,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Toolbar,
} from "@mui/material";
import React, { useState } from "react";
import useLogout from "../api/useLogout";

const Navbar: React.FC = () => {
  const { mutate } = useLogout();

  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = async () => {
    mutate();
  };

  const drawer = (
    <Box sx={{ width: 250 }} onClick={handleDrawerToggle}>
      <List>
        <ListItemButton onClick={handleLogout}>
          <ListItemText primary="Logout" />
        </ListItemButton>
      </List>
    </Box>
  );

  return (
    <AppBar position="fixed">
      <Toolbar>
        <div className="flex items-center justify-between w-full">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <p className="font-medium">Fidelity Card</p>
        </div>
        <Box sx={{ display: { xs: "none", sm: "flex" } }}>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Box>
      </Toolbar>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{ display: { xs: "block", sm: "none" } }}
      >
        {drawer}
      </Drawer>
    </AppBar>
  );
};

export default Navbar;
