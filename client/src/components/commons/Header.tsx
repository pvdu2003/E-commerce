import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
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
  from?: number;
  to?: number;
  page?: number;
}

const Header: React.FC<HeaderProps> = ({ categories, from, to, page = 1 }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);

    const params = new URLSearchParams(location.search);
    if (newSearchTerm) {
      params.set("title", newSearchTerm);
    } else {
      params.delete("title");
    }
    if (from !== undefined) {
      params.set("from", from.toString());
    }
    if (to !== undefined) {
      params.set("to", to.toString());
    }

    navigate(`${location.pathname}?${params.toString()}`, { replace: true });
  };

  const handleSearchSubmit = () => {
    const params = new URLSearchParams(location.search);
    if (searchTerm) {
      params.set("title", searchTerm);
    } else {
      params.delete("title");
    }
    if (from !== undefined) {
      params.set("from", from.toString());
    }
    if (to !== undefined) {
      params.set("to", to.toString());
    }
    if (page && page > 1) {
      params.set("page", page.toString());
    } else {
      params.delete("page");
    }

    navigate(`${location.pathname}?${params.toString()}`);
  };

  const isButtonDisabled = searchTerm.trim().length === 0;

  return (
    <AppBar position="static" className="px-5">
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
            sx={{ textTransform: "capitalize" }}
          >
            Categories
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            {categories.map((category) => (
              <MenuItem
                key={category._id}
                onClick={() => {
                  handleClose();
                  navigate(
                    `/category/${category._id}?${
                      from !== undefined ? `from=${from}&` : ""
                    }${to !== undefined ? `to=${to}&` : ""}${
                      page && page > 1 ? `page=${page}` : ""
                    }`
                  );
                }}
              >
                {category.name}
              </MenuItem>
            ))}
          </Menu>
        </Box>

        <TextField
          variant="outlined"
          name="title"
          placeholder="Search books here"
          fullWidth
          size="small"
          value={searchTerm}
          onChange={handleInputChange}
          sx={{
            borderRadius: "20px",
            mr: 1,
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#fff",
              },
              "&:hover fieldset": {
                borderColor: "#fff",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#fff",
              },
              "& input": {
                color: "#fff",
              },
            },
          }}
        />
        <IconButton
          type="button"
          color="inherit"
          onClick={handleSearchSubmit}
          disabled={isButtonDisabled}
        >
          <SearchIcon />
        </IconButton>

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
