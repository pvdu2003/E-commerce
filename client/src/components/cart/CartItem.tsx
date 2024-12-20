import React from "react";
import {
  Grid,
  Checkbox,
  CardMedia,
  Typography,
  IconButton,
  TextField,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";

interface Book {
  _id: string;
  book_id: {
    image: string;
    price: number;
    title: string;
  };
  quantity: number;
}

interface CartItemProps {
  book: Book;
  publisher: string;
  onIncrement: (bookId: string) => void;
  onDecrement: (bookId: string) => void;
  onDelete: (bookId: string) => void;
  onQuantityChange: (bookId: string, quantity: string) => void;
  isChecked: boolean;
  onCheckboxChange: (bookId: string, publisher: string) => void;
}

const CartItem: React.FC<CartItemProps> = ({
  book,
  publisher,
  onIncrement,
  onDecrement,
  onDelete,
  onQuantityChange,
  isChecked,
  onCheckboxChange,
}) => {
  return (
    <Grid container alignItems="center" key={book._id}>
      <Grid item xs={1}>
        <Checkbox
          checked={isChecked}
          onChange={() => onCheckboxChange(book._id, publisher)}
        />
      </Grid>
      <Grid item xs={4} className="d-flex align-items-center">
        <CardMedia
          component="img"
          image={book.book_id.image}
          alt="Book Cover"
          sx={{ height: 75, width: 60, display: { xs: "none", sm: "block" } }}
        />
        <Typography
          variant="body2"
          className="ms-2 text-main text-decoration-none"
          sx={{
            maxWidth: "200px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {book.book_id.title}
        </Typography>
      </Grid>
      <Grid item xs={2}>
        {book.book_id.price.toFixed(2)}
      </Grid>
      <Grid item xs={2} className="d-flex align-items-center">
        <IconButton
          onClick={() => onDecrement(book._id)}
          size="small"
          aria-label="decrement"
        >
          <RemoveIcon />
        </IconButton>
        <TextField
          type="number"
          value={book.quantity}
          onChange={(e) => onQuantityChange(book._id, e.target.value)}
          inputProps={{ "aria-label": "quantity", min: 1 }}
          size="small"
          sx={{ width: "50px", textAlign: "center" }}
        />
        <IconButton
          onClick={() => onIncrement(book._id)}
          size="small"
          aria-label="increment"
        >
          <AddIcon />
        </IconButton>
      </Grid>
      <Grid item xs={2}>
        {(book.book_id.price * book.quantity).toFixed(2)}
      </Grid>
      <Grid item xs={1}>
        <IconButton onClick={() => onDelete(book._id)}>
          <DeleteIcon color="error" />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default CartItem;
