import React, { useEffect, useState } from "react";
import { Container, Grid, Typography, Pagination, Box } from "@mui/material";
import { fetchBooks } from "../../services/book.service"; // Adjust the import path as necessary
import BookCard from "../../components/books/BookCard";

interface Book {
  _id: string;
  title: string;
  price: number;
  quantity_sold: number;
  image: string;
}

interface BookListProps {
  initialPage?: number;
  initialFrom?: number;
  initialTo?: number;
  initialTitle?: string;
}

const BookList: React.FC<BookListProps> = ({
  initialPage = 1,
  initialFrom = 0,
  initialTo = 150,
  initialTitle = "",
}) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(initialPage);
  const [totalPages, setTotalPages] = useState<number>(1);

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };
  useEffect(() => {
    const loadBooks = async () => {
      try {
        const data = await fetchBooks(
          currentPage,
          initialFrom,
          initialTo,
          initialTitle
        );
        setBooks(data.books);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    loadBooks();
  }, [currentPage, initialFrom, initialTo, initialTitle]);

  return (
    <Container>
      <Grid container spacing={2} my={4}>
        <Grid item xs={12}>
          <Typography variant="h4" align="center" gutterBottom>
            Book List
          </Typography>
        </Grid>
        <Grid container spacing={2} justifyContent="center">
          {books.map((book) => (
            <Grid item key={book._id} xs={6} sm={4} md={3}>
              <BookCard
                _id={book._id}
                image={book.image}
                title={book.title}
                price={book.price}
                quantity_sold={book.quantity_sold}
              />
            </Grid>
          ))}
        </Grid>
        {totalPages > 1 && (
          <Grid item xs={12}>
            <Box display="flex" justifyContent="center" my={5}>
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={handlePageChange}
                variant="outlined"
                shape="rounded"
              />
            </Box>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default BookList;
