import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
  TextField,
  Menu,
  MenuItem,
  Box,
} from "@mui/material";
import { ArrowDropDown } from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
interface Category {
  _id: string;
  name: string;
}

interface HeaderProps {
  categories: Category[];
}

const Header: React.FC<HeaderProps> = ({ categories }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton href="/" edge="start" color="inherit">
            <img
              src="/imgs/APlusBook_logo.png"
              alt="A Plus Book Logo"
              style={{ width: 100, height: 60 }}
            />
          </IconButton>
          <Button
            color="inherit"
            onClick={handleMenuClick}
            endIcon={<ArrowDropDown />}
          >
            Categories
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            {categories.map((category) => (
              <MenuItem key={category._id} onClick={handleClose}>
                <a
                  href={`/category/${category._id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  {category.name}
                </a>
              </MenuItem>
            ))}
          </Menu>
        </Box>

        <form
          action="/book/list"
          method="get"
          style={{ display: "flex", flexGrow: 1 }}
        >
          <TextField
            variant="outlined"
            name="title"
            placeholder="Search books here"
            fullWidth
            size="small"
            sx={{ borderRadius: "20px", mr: 1 }}
          />
          <SearchIcon type="submit" color="inherit"></SearchIcon>
        </form>

        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton component={Link} to="/user/profile" color="inherit">
            <PersonIcon />
          </IconButton>
          <IconButton component={Link} to="/announcement/list" color="inherit">
            <NotificationsIcon />
          </IconButton>
          <IconButton component={Link} to="/cart/list" color="inherit">
            <ShoppingCartIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
