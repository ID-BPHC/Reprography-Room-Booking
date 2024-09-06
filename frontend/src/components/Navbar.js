import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import LogoutIcon from "@mui/icons-material/PowerSettingsNew";
import { Link, useLocation } from "react-router-dom";
import { isAdmin } from "../utils";

import BITSLogo from "../assets/BITSLogo.png";
import { APP_TITLE } from "../constants/index.js";

const adminPages = [
  {
    title: "Users",
    link: "/admin/verified-users",
  },
  {
    title: "Requests",
    link: "/admin/pending-requests",
  },
  {
    title: "Rooms",
    link: "/admin/rooms",
  },
  {
    title: "Settings",
    link: "/admin/settings",
  }
];

const userPages = [
  {
    title: "Book",
    link: "/dashboard",
  },
  {
    title: "My Bookings",
    link: "/dashboard/bookings",
  },
  {
    title: "FAQs",
    link: "/dashboard/faq",
  },
  {
    title: "Contact",
    link: "/dashboard/contact",
  }
];

let pages = [...userPages];

if (isAdmin()) {
  pages = [...pages, ...adminPages];
}

const settings = ["Logout"];

const ResponsiveAppBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const location = useLocation();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <div>
      <AppBar
        position="static"
        style={{ backgroundColor: "white", color: "#1976D2" }}
      >
        <Container maxWidth="xl" style={{ color: "#1976D2" }}>
          <Toolbar disableGutters>
            <img src={BITSLogo} height={40} style={{ marginRight: 10 }} />
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
            >
              {APP_TITLE}
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page) => (
                  <Link to={page.link}>
                    <MenuItem key={page.title} onClick={handleCloseNavMenu}>
                      <Typography textAlign="center">{page.title}</Typography>
                    </MenuItem>
                  </Link>
                ))}
              </Menu>
            </Box>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
            >
              {APP_TITLE}
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Link to={page.link} style={{ textDecoration: "none" }}>
                  <Button
                    key={page}
                    onClick={handleCloseNavMenu}
                    sx={{ color: "#1976D2", display: "block" }}
                  >
                    {page.link === location.pathname ? (
                      <u>{page.title}</u>
                    ) : (
                      <>{page.title}</>
                    )}
                  </Button>
                </Link>
              ))}
            </Box>
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="LOG OUT">
                <Link to={"/logout"} style={{ textDecoration: "none" }}>
                  <Button
                    sx={{ color: "#1976D2",  }}
                  >
                    Log out<LogoutIcon />
                  </Button>
                </Link>
              </Tooltip>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
};
export default ResponsiveAppBar;
