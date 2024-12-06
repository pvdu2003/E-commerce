import React, { useState } from "react";
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

interface Category {
  id: number;
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
    <AppBar position="static" color="primary">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton href="/" edge="start" color="inherit">
            <img
              src="/APlusBook_logo.png"
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
              <MenuItem key={category.id} onClick={handleClose}>
                <a
                  href={`/category/${category.id}`}
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
          <IconButton type="submit" color="inherit">
            <i className="fas fa-magnifying-glass"></i>
          </IconButton>
        </form>

        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton href="/user/profile" color="inherit">
            <i className="fas fa-user"></i>
          </IconButton>
          <IconButton href="/announcement/list" color="inherit">
            <i className="fas fa-bell"></i>
          </IconButton>
          <IconButton href="/cart/list" color="inherit">
            <i className="fas fa-cart-shopping"></i>
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
