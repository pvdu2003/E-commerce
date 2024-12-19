import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Button,
  Checkbox,
  TextField,
  IconButton,
  CardMedia,
  Grid,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAuthContext } from "../contexts/AuthContext";
import { fetchCartDetail } from "../services/cart.service";
import axios from "axios";

interface Book {
  _id: string;
  book_id: {
    _id: string;
    image: string;
    price: number;
    title: string;
    author: string;
  };
  quantity: number;
  addedAt: string;
}

interface Cart {
  _id: string;
  publisher: string;
  books: Book[];
}

const Cart: React.FC = () => {
  const [carts, setCarts] = useState<Cart[]>([]);
  const [totalFee, setTotalFee] = useState<number>(0);
  const { authUser } = useAuthContext();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await fetchCartDetail(authUser._id);
        setCarts(response);
        updateTotalFee(response);
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };

    fetchCart();
  }, [authUser._id]);

  const handleQuantityChange = (bookId: string, quantity: string) => {
    setCarts((prevCarts) =>
      prevCarts.map((cart) => ({
        ...cart,
        books: cart.books.map((book) =>
          book._id === bookId ? { ...book, quantity: parseInt(quantity) } : book
        ),
      }))
    );
    updateTotalFee(carts);
  };

  const incrementQuantity = (bookId: string) => {
    setCarts((prevCarts) =>
      prevCarts.map((cart) => ({
        ...cart,
        books: cart.books.map((book) =>
          book._id === bookId ? { ...book, quantity: book.quantity + 1 } : book
        ),
      }))
    );
    updateTotalFee(carts);
  };

  const decrementQuantity = (bookId: string) => {
    setCarts((prevCarts) =>
      prevCarts.map((cart) => ({
        ...cart,
        books: cart.books.map((book) =>
          book._id === bookId && book.quantity > 1
            ? { ...book, quantity: book.quantity - 1 }
            : book
        ),
      }))
    );
    updateTotalFee(carts);
  };

  const handleDelete = async (bookId: string) => {
    try {
      await axios.delete(`/cart/delete/${bookId}`);
      const response = await fetchCartDetail(authUser._id);
      setCarts(response);
      updateTotalFee(response);
    } catch (error) {
      console.error("Error deleting book from cart:", error);
    }
  };

  const updateTotalFee = (cartItems: Cart[]) => {
    const total = cartItems.reduce((acc, cart) => {
      return (
        acc +
        cart.books.reduce((bookAcc, book) => {
          return bookAcc + book.book_id.price * book.quantity;
        }, 0)
      );
    }, 0);
    setTotalFee(total);
  };

  return (
    <Container>
      <Typography variant="h4" align="center" gutterBottom>
        Your Cart
      </Typography>

      {carts.length === 0 ? (
        <div className="text-center">
          <img className="w-50" src="/imgs/empty_cart.jpg" alt="Empty cart" />
          <Typography>Your cart is empty!</Typography>
          <Button href="/book/list" variant="contained" color="primary">
            Explore now!
          </Button>
        </div>
      ) : (
        <div className="container text-center p-2 mb-5">
          {carts.map((cart) => (
            <div
              key={cart._id}
              className="container text-center p-2 my-3 border"
            >
              <Grid container alignItems="center">
                <Grid item xs={1}>
                  <Checkbox value={cart.publisher} />
                </Grid>
                <Grid item xs={8} className="text-start text-main fw-medium">
                  {cart.publisher}
                </Grid>
              </Grid>

              <hr />
              {cart.books.map((book) => (
                <Grid container alignItems="center" key={book._id}>
                  <Grid item xs={1}>
                    <Checkbox value={book._id} />
                  </Grid>
                  <Grid item xs={4} className="d-flex align-items-center">
                    <CardMedia
                      component="img"
                      image={book.book_id.image}
                      alt="Book Cover"
                      sx={{
                        height: 75,
                        width: 60,
                        display: { xs: "none", sm: "block" },
                      }}
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
                      onClick={() => decrementQuantity(book._id)}
                      size="small"
                      aria-label="decrement"
                    >
                      <RemoveIcon />
                    </IconButton>
                    <TextField
                      type="number"
                      value={book.quantity}
                      onChange={(e) =>
                        handleQuantityChange(book._id, e.target.value)
                      }
                      inputProps={{
                        "aria-label": "quantity",
                        min: 1,
                      }}
                      size="small"
                      sx={{
                        width: "50px",
                        textAlign: "center",
                      }}
                    />
                    <IconButton
                      onClick={() => incrementQuantity(book._id)}
                      size="small"
                      aria-label="increment"
                    >
                      <AddIcon />
                    </IconButton>
                  </Grid>
                  <Grid
                    item
                    xs={2}
                    sx={{ display: { xs: "none", sm: "block" } }}
                  >
                    {(book.book_id.price * book.quantity).toFixed(2)}
                  </Grid>
                  <Grid
                    item
                    xs={2}
                    sx={{ display: { xs: "block", sm: "none" } }}
                  >
                    {(book.book_id.price * book.quantity).toFixed(2)}
                  </Grid>
                  <Grid item xs={1}>
                    <IconButton onClick={() => handleDelete(book._id)}>
                      <DeleteIcon color="error" />
                    </IconButton>
                  </Grid>
                </Grid>
              ))}
            </div>
          ))}

          <div className="container text-end mt-3">
            <Typography>
              Total fee:
              <span className="text-main fw-medium">{totalFee.toFixed(2)}</span>
              $
            </Typography>
            <Button variant="contained" color="primary" href="/order/checkout">
              Buy Now
            </Button>
          </div>
        </div>
      )}
    </Container>
  );
};

export default Cart;
