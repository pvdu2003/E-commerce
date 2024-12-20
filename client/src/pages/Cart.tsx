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
  const [checkedBooks, setCheckedBooks] = useState<{ [key: string]: boolean }>(
    {}
  );
  const [checkedPublishers, setCheckedPublishers] = useState<{
    [key: string]: boolean;
  }>({});

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await fetchCartDetail(authUser._id);
        setCarts(response);
        updateTotalFee(response, checkedBooks);
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };

    fetchCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateTotalFee = (
    cartItems: Cart[],
    currentCheckedBooks: { [key: string]: boolean }
  ) => {
    const total = cartItems.reduce((acc, cart) => {
      return (
        acc +
        cart.books.reduce((bookAcc, book) => {
          if (currentCheckedBooks[book._id]) {
            return bookAcc + book.book_id.price * book.quantity;
          }
          return bookAcc;
        }, 0)
      );
    }, 0);
    setTotalFee(total);
  };

  const handleQuantityChange = (bookId: string, quantity: string) => {
    const qty = parseInt(quantity);
    if (qty < 1) return;

    setCarts((prevCarts) => {
      const updatedCarts = prevCarts.map((cart) => ({
        ...cart,
        books: cart.books.map((book) =>
          book._id === bookId ? { ...book, quantity: qty } : book
        ),
      }));
      updateTotalFee(updatedCarts, checkedBooks);
      return updatedCarts;
    });
  };

  const incrementQuantity = (bookId: string) => {
    setCarts((prevCarts) => {
      const updatedCarts = prevCarts.map((cart) => ({
        ...cart,
        books: cart.books.map((book) =>
          book._id === bookId ? { ...book, quantity: book.quantity + 1 } : book
        ),
      }));
      updateTotalFee(updatedCarts, checkedBooks);
      return updatedCarts;
    });
  };

  const decrementQuantity = (bookId: string) => {
    setCarts((prevCarts) => {
      const updatedCarts = prevCarts.map((cart) => ({
        ...cart,
        books: cart.books.map((book) =>
          book._id === bookId && book.quantity > 1
            ? { ...book, quantity: book.quantity - 1 }
            : book
        ),
      }));
      updateTotalFee(updatedCarts, checkedBooks);
      return updatedCarts;
    });
  };

  const handleDelete = async (bookId: string) => {
    try {
      await axios.delete(`/cart/delete/${bookId}`);
      const response = await fetchCartDetail(authUser._id);
      setCarts(response);
      updateTotalFee(response, checkedBooks);
    } catch (error) {
      console.error("Error deleting book from cart:", error);
    }
  };

  const handleCheckboxChange = (bookId: string, publisher: string) => {
    setCheckedBooks((prev) => {
      const newCheckedState = { ...prev, [bookId]: !prev[bookId] };

      // Check how many books under this publisher are still checked
      const allBooks =
        carts.find((cart) => cart.publisher === publisher)?.books || [];
      const allChecked = allBooks.every((book) => newCheckedState[book._id]);

      // Update publisher checkbox state
      setCheckedPublishers((prevPublishers) => ({
        ...prevPublishers,
        [publisher]: allChecked,
      }));

      updateTotalFee(carts, newCheckedState);
      return newCheckedState;
    });
  };

  const handlePublisherCheckboxChange = (publisher: string, books: Book[]) => {
    const isChecked = !checkedPublishers[publisher];

    const newCheckedBooks = { ...checkedBooks };
    books.forEach((book) => {
      newCheckedBooks[book._id] = isChecked;
    });

    setCheckedBooks(newCheckedBooks);
    setCheckedPublishers((prev) => ({
      ...prev,
      [publisher]: isChecked,
    }));
    updateTotalFee(carts, newCheckedBooks);
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
                  <Checkbox
                    checked={!!checkedPublishers[cart.publisher]}
                    onChange={() =>
                      handlePublisherCheckboxChange(cart.publisher, cart.books)
                    }
                  />
                </Grid>
                <Grid item xs={8} className="text-start text-main fw-medium">
                  {cart.publisher}
                </Grid>
              </Grid>

              <hr />
              {cart.books.map((book) => (
                <Grid container alignItems="center" key={book._id}>
                  <Grid item xs={1}>
                    <Checkbox
                      checked={!!checkedBooks[book._id]}
                      onChange={() =>
                        handleCheckboxChange(book._id, cart.publisher)
                      }
                    />
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
                  <Grid item xs={2}>
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
            {totalFee > 0 && (
              <>
                <Typography>
                  Total fee:
                  <span className="text-main fw-medium">
                    {totalFee.toFixed(2)}
                  </span>
                  $
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  href="/order/checkout"
                >
                  Buy Now
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </Container>
  );
};

export default Cart;
