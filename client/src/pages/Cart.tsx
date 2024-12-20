import React, { useEffect, useState } from "react";
import { Container, Typography, Button } from "@mui/material";
import { useAuthContext } from "../contexts/AuthContext";
import { fetchCartDetail } from "../services/cart.service";
import axios from "axios";
import CartItem from "../components/cart/CartItem";
import PublisherCheckbox from "../components/cart/PublisherCheckbox";
import CartSummary from "../components/cart/CartSummary";

interface Book {
  _id: string;
  book_id: {
    _id: string;
    image: string;
    price: number;
    title: string;
    author: string;
    publisher: string;
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
              <PublisherCheckbox
                publisher={cart.publisher}
                isChecked={!!checkedPublishers[cart.publisher]}
                onChange={() =>
                  handlePublisherCheckboxChange(cart.publisher, cart.books)
                }
              />
              <hr />
              {cart.books.map((book) => (
                <CartItem
                  key={book._id}
                  book={book}
                  publisher={cart.publisher}
                  onIncrement={incrementQuantity}
                  onDecrement={decrementQuantity}
                  onDelete={handleDelete}
                  onQuantityChange={handleQuantityChange}
                  isChecked={!!checkedBooks[book._id]}
                  onCheckboxChange={() =>
                    handleCheckboxChange(book._id, cart.publisher)
                  }
                />
              ))}
            </div>
          ))}

          <CartSummary totalFee={totalFee} />
        </div>
      )}
    </Container>
  );
};

export default Cart;
