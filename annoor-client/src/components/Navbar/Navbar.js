import {
  AppBar,
  Badge,
  Box,
  IconButton,
  Toolbar,
  Typography,
  Button,
  Popover,
  Divider,
} from "@mui/material";
import React, { useState } from "react";
import "./Navbar.css";
import MenuIcon from "@mui/icons-material/Menu";
import MoreIcon from "@mui/icons-material/MoreVert";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { AccountCircle } from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AnnoorContext } from "../../context/AnnoorContext";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase.init";

const Navbar = ({ handleDrawerToggle, handleMobileDrawerToggle }) => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const { cart, handleSignOut } = useContext(AnnoorContext);

  const [menuPopOverEl, setMenuPopOverEl] = useState(null);
  const menuPopOverOpen = Boolean(menuPopOverEl);

  let cartItemQuantity = 0;
  cart.forEach((element) => {
    cartItemQuantity = cartItemQuantity + element.quantity;
  });

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        style={{
          zIndex: 1251,
          backgroundColor: "white",
          borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
        }}
        elevation={0}
      >
        <Toolbar
          sx={{ minHeight: "48px !important", justifyContent: "space-between" }}
        >
          <div id="start">
            <IconButton
              onClick={handleDrawerToggle}
              size="large"
              edge="start"
              color="primary"
              sx={{
                display: { md: "inline-flex", xs: "none" },
              }}
            >
              <MenuIcon />
            </IconButton>
            <IconButton
              onClick={handleMobileDrawerToggle}
              size="large"
              edge="start"
              color="primary"
              sx={{
                display: { xs: "inline-flex", md: "none" },
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              onClick={() => navigate("/food")}
              variant="h6"
              noWrap
              component="div"
              sx={{
                display: { xs: "none", sm: "block" },
                color: "primary.main",
                cursor: "pointer",
              }}
            >
              Annoor Business
            </Typography>
          </div>
          <div id="center">
            <form className="search-bar-container">
              <input
                placeholder="Search"
                type="text"
                className="search-input"
              />
              <div className="search-button-container">
                <Button
                  size="small"
                  sx={{
                    minWidth: 0,
                    borderRadius: 0,
                    backgroundColor: "transparent",
                    height: "100%",
                  }}
                >
                  <SearchIcon />
                </Button>
              </div>
            </form>
          </div>
          <div id="end">
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                gap: "5px",
                alignItems: "center",
              }}
            >
              <Link to="/cart">
                <IconButton size="large" color="primary">
                  <Badge badgeContent={cartItemQuantity} color="error">
                    <ShoppingCartOutlinedIcon />
                  </Badge>
                </IconButton>
              </Link>
              {user ? (
                <>
                  <IconButton
                    onClick={(e) => setMenuPopOverEl(e.currentTarget)}
                    size="large"
                    edge="end"
                    color="primary"
                  >
                    <AccountCircle />
                  </IconButton>
                </>
              ) : (
                <Link to="/signIn">
                  <Button variant="outlined" size="small">
                    SIGN IN
                  </Button>
                </Link>
              )}
            </Box>
            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <IconButton
                onClick={(e) => setMenuPopOverEl(e.currentTarget)}
                size="large"
                edge="end"
                color="primary"
              >
                <Badge
                  badgeContent={!menuPopOverOpen ? cartItemQuantity : 0}
                  color="error"
                >
                  <MoreIcon />
                </Badge>
              </IconButton>
            </Box>
          </div>
        </Toolbar>
      </AppBar>

      <Popover
        elevation={1}
        open={menuPopOverOpen}
        anchorEl={menuPopOverEl}
        onClose={() => setMenuPopOverEl(null)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        options={{
          element: "arrowRef",
        }}
      >
        <Box
          onClick={() => {
            setMenuPopOverEl(null);
          }}
        >
          <Box sx={{ display: { xs: "block", md: "none" } }}>
            <Link
              to={"/cart"}
              style={{ height: "50px", paddingBottom: "0px" }}
              className="each-menu-item"
            >
              <Badge badgeContent={cartItemQuantity} color="error">
                <ShoppingCartOutlinedIcon color="primary" />
              </Badge>
            </Link>
            <Divider />
          </Box>
          {user && (
            <>
              <a className="each-menu-item">
                <span>Profile</span>
              </a>
              <Divider />
              <a className="each-menu-item">
                <span>Orders</span>
              </a>
            </>
          )}
          <Divider />
          {user ? (
            <a onClick={handleSignOut} className="each-menu-item">
              <span>Logout</span>
            </a>
          ) : (
            <Link to={"/signIn"} className="each-menu-item">
              <span>Sign in</span>
            </Link>
          )}
        </Box>
      </Popover>
    </Box>
  );
};

export default Navbar;
