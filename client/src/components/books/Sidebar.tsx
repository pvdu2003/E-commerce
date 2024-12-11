import React from "react";
import {
  List,
  ListItemText,
  Typography,
  Divider,
  Paper,
  ListItemButton,
} from "@mui/material";

interface Category {
  _id: string;
  name: string;
}

interface SidebarProps {
  title?: string;
  currentPage: number;
  categories: Category[];
  selectedCategoryId?: string;
}

const Sidebar: React.FC<SidebarProps> = ({
  currentPage,
  categories,
  selectedCategoryId,
}) => {
  console.log(categories);

  return (
    <Paper elevation={3} sx={{ padding: 2 }}>
      <List>
        <Typography variant="h6" className="mb-1">
          Price
        </Typography>

        <ListItemButton component="a" href={`?page=${currentPage}&to=3`}>
          <ListItemText primary="<3$" />
        </ListItemButton>
        <ListItemButton component="a" href={`?page=${currentPage}&from=3&to=6`}>
          <ListItemText primary="3-6$" />
        </ListItemButton>
        <ListItemButton component="a" href={`?page=${currentPage}&from=6`}>
          <ListItemText primary=">6$" />
        </ListItemButton>

        <Divider sx={{ my: 1 }} />

        <Typography variant="h6" className="my-1">
          Category
        </Typography>
        <List>
          <ListItemButton component="a" href="/book/list">
            <ListItemText primary="All Categories" />
          </ListItemButton>

          {categories.map((cat) => (
            <ListItemButton
              component="a"
              href={`/category/${cat._id}`}
              key={cat._id}
              sx={{
                backgroundColor:
                  selectedCategoryId === cat._id ? "lightgray" : "transparent",
              }}
            >
              <ListItemText primary={cat.name} />
            </ListItemButton>
          ))}
        </List>
      </List>
    </Paper>
  );
};

export default Sidebar;
