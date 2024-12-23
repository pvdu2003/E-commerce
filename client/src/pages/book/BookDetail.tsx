import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Container,
  Grid,
  Typography,
  Button,
  TextField,
  Box,
  CardMedia,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { fetchBookDetail } from "../../services/book.service";
import { addToCart } from "../../services/cart.service";
import { useAuthContext } from "../../contexts/AuthContext";
import { toast } from "react-toastify";

interface Book {
  _id: string;
  image: string;
  title: string;
  price: number;
  quantity_sold: number;
  quantity_in_stock: number;
  author: string;
  publisher: string;
  isbn: string;
  cat_id: {
    name: string;
  };
  description: string;
}

const BookDetail: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const [book, setBook] = useState<Book | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const { authUser } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBook = async () => {
      if (!id) return;

      try {
        const response = await fetchBookDetail(id);
        setBook(response);
      } catch (err) {
        console.error(`Error fetching book details: ${err}`);
      }
    };

    fetchBook();
  }, [id]);

  const incrementQuantity = () => {
    if (book) {
      setQuantity((prev) => Math.min(prev + 1, book.quantity_in_stock));
    }
  };

  const decrementQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!book) return;

    try {
      await addToCart(authUser._id, book._id, book.publisher, quantity);
      toast.success("Add this book to your cart", { autoClose: 1500 });
      setTimeout(() => {
        navigate(`/cart/list`, { replace: true });
      }, 2000);
    } catch (error) {
      console.error("Error adding book to cart:", error);
    }
  };

  if (!book) {
    return <Typography>No book found.</Typography>;
  }

  return (
    <Container sx={{ mt: 4, px: 5 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={5}>
          <CardMedia
            component="img"
            src={book.image}
            alt="Book image"
            sx={{ height: "auto", maxHeight: "400px", objectFit: "cover" }}
          />
        </Grid>
        <Grid item xs={12} md={7}>
          <Typography variant="h5">{book.title}</Typography>
          <Box display="flex" justifyContent="space-between" my={2}>
            <Typography>
              Quantity sold:
              <span className="ms-2 text-main fw-medium">
                {book.quantity_sold}
              </span>
            </Typography>
            <Typography>
              Quantity in stock:
              <span className="ms-2 text-main fw-medium">
                {book.quantity_in_stock}
              </span>
            </Typography>
          </Box>
          <Typography variant="h5" className="text-main">
            Price: {book.price} $
          </Typography>
          <form onSubmit={handleSubmit}>
            <Box
              display="flex"
              alignItems="center"
              my={2}
              mb={{ xs: 2, md: 0 }}
            >
              <Typography>Quantity:</Typography>

              <IconButton
                onClick={decrementQuantity}
                size="small"
                aria-label="decrement"
              >
                <RemoveIcon />
              </IconButton>

              <TextField
                type="number"
                value={quantity}
                onChange={(e) =>
                  setQuantity(Math.max(1, Number(e.target.value)))
                }
                inputProps={{ min: 1 }}
                size="small"
                sx={{
                  width: "60px",
                  textAlign: "center",
                  "& input": {
                    textAlign: "center",
                  },
                }}
              />

              <IconButton
                onClick={incrementQuantity}
                size="small"
                aria-label="increment"
              >
                <AddIcon />
              </IconButton>
            </Box>
            <Button variant="outlined" color="primary" type="submit">
              Add to cart
            </Button>
          </form>
          <Box my={4} mb={{ xs: 4, md: 0 }}>
            <Typography variant="h6">Book Detail</Typography>
            <hr />
            <Typography>
              Author:
              <span className="ms-2 text-main fw-medium">{book.author}</span>
            </Typography>
            <Typography>
              Publisher:
              <span className="ms-2 text-main fw-medium">{book.publisher}</span>
            </Typography>
            <Typography>
              ISBN:
              <span className="ms-2 text-main fw-medium">{book.isbn}</span>
            </Typography>
            <Typography>
              Category:
              <span className="ms-2 text-main fw-medium">
                {book.cat_id.name}
              </span>
            </Typography>
            <Typography>
              Book Description:
              <span className="ms-2 text-main fw-medium">
                {book.description}
              </span>
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default BookDetail;
