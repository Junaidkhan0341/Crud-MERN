import * as React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import { ReactComponent as CustomerIcon } from "../Assets/customers.svg";
import Logo from "../Assets/Logo.png";
import Header from "../Components/Header";
import { IconButton } from "@mui/material";

const drawerWidth = 300;

function ResponsiveDrawer({ children }) {
  const { window } = {};
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <List>
        <ListItem disablePadding onClick={() => navigate("/customer")}>
          <ListItemButton>
            <ListItemText />
            <ListItemIcon>
              <CustomerIcon width={"24px"} />
            </ListItemIcon>
            <Typography
              style={{ fontFamily: "Lato-SemiBold", fontSize: "18px" }}
            >
              CUSTOMERS
            </Typography>
            <ListItemText />
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  const location = useLocation();
  const getTitle = () => {
    switch (location.pathname) {
      case "/customer":
        return "Customer";
      default:
        return "Default Title";
    }
  };
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
        }}
        style={{ boxShadow: "0px 3px 15px #6B6B6B1A" }}
      >
        <Toolbar
          style={{
            height: "100px",
            backgroundColor: "#FFFFFF",
            color: "#000000",
          }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Header headTitle={getTitle()} />
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: "#015249",
              color: "#ffffff",
              borderRadius: "0px 20px 20px 0px",
            },
            "& .MuiButtonBase-root": {
              margin: "40px",
              background: "#043933 0% 0% no-repeat padding-box",
              boxShadow: "0px 5px 25px #00000040",
              borderRadius: "10px",
            },
          }}
        >
          <Box textAlign="center" role="presentation" width="300px">
            <img src={Logo} width="200" alt="Logo" style={{ margin: "30px" }} />
          </Box>
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", md: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: "#015249",
              color: "#ffffff",
              borderRadius: "0px 20px 20px 0px",
            },
            "& .MuiButtonBase-root": {
              margin: "40px",
              background: "#043933 0% 0% no-repeat padding-box",
              boxShadow: "0px 5px 25px #00000040",
              borderRadius: "10px",
            },
          }}
          open
        >
          <Box textAlign="center" role="presentation" width="300px">
            <img src={Logo} width="200" alt="Logo" style={{ margin: "30px" }} />
          </Box>
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { md: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
}

ResponsiveDrawer.propTypes = {
  window: PropTypes.func,
};

export default ResponsiveDrawer;
