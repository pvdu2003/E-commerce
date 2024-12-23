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
import { updateCart } from "../../services/cart.service";

interface Book {
  _id: string;
  book_id: {
    _id: string;
    image: string;
    price: number;
    title: string;
  };
  quantity: number;
}

interface CartItemProps {
  book: Book;
  publisher: string;
  userId: string;
  onCartUpdate: () => void;
  onDelete: (bookId: string) => void;
  onQuantityChange: (bookId: string, quantity: number) => void;
  isChecked: boolean;
  onCheckboxChange: (bookId: string, publisher: string) => void;
}

const CartItem: React.FC<CartItemProps> = ({
  book,
  publisher,
  userId,
  onCartUpdate,
  onDelete,
  onQuantityChange,
  isChecked,
  onCheckboxChange,
}) => {
  const handleQuantityChange = async (bookId: string, quantity: number) => {
    const qty = Math.max(1, quantity);
    onQuantityChange(bookId, qty);
    try {
      await updateCart(userId, bookId, publisher, qty);
      onCartUpdate();
    } catch (error) {
      console.error("Failed to update cart:", error);
    }
  };

  const handleIncrement = async () => {
    const newQuantity = book.quantity + 1;
    onQuantityChange(book.book_id._id, newQuantity);

    try {
      await updateCart(userId, book.book_id._id, publisher, newQuantity);
      onCartUpdate();
    } catch (error) {
      console.error("Failed to update cart:", error);
    }
  };

  const handleDecrement = async () => {
    const newQuantity = Math.max(1, book.quantity - 1);
    onQuantityChange(book.book_id._id, newQuantity);

    try {
      await updateCart(userId, book.book_id._id, publisher, newQuantity);
      onCartUpdate();
    } catch (error) {
      console.error("Failed to update cart:", error);
    }
  };

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
          onClick={handleDecrement}
          size="small"
          aria-label="decrement"
        >
          <RemoveIcon />
        </IconButton>
        <TextField
          type="number"
          value={book.quantity}
          onChange={(e) =>
            handleQuantityChange(book.book_id._id, parseInt(e.target.value))
          }
          inputProps={{ "aria-label": "quantity", min: 1 }}
          size="small"
          sx={{ width: "50px", textAlign: "center" }}
        />
        <IconButton
          onClick={handleIncrement}
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
