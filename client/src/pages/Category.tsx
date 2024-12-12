import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Pagination,
  Box,
  Hidden,
  Typography,
} from "@mui/material";
import { useParams, useLocation } from "react-router-dom";
import BookCard from "../components/books/BookCard";
import { fetchCategoryById } from "../services/category.service";
import Sidebar from "../components/books/Sidebar";
import useCategories from "../hooks/useCategories";

interface Book {
  _id: string;
  image: string;
  title: string;
  price: number;
  quantity_sold: number;
}

const Category = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const [books, setBooks] = useState<Book[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);

  const { categories } = useCategories();

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;

      const params = new URLSearchParams(location.search);
      const title = params.get("title") || "";

      try {
        const { books, totalPages } = await fetchCategoryById(
          id,
          currentPage,
          title
        );
        setBooks(books);
        setTotalPages(totalPages);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id, currentPage, location.search]);

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  return (
    <Container>
      <Grid container spacing={2} justifyContent="center" my={1}>
        <Hidden mdDown>
          <Grid item xs={12} sm={12} md={3}>
            <Sidebar
              categories={categories}
              currentPage={currentPage}
              selectedCategoryId=""
            />
          </Grid>
        </Hidden>

        <Grid container item spacing={2} xs={12} sm={12} md={9}>
          {books.length > 0 ? (
            books.map((book) => (
              <Grid item key={book._id} xs={6} sm={4} md={3}>
                <BookCard
                  _id={book._id}
                  image={book.image}
                  title={book.title}
                  price={book.price}
                  quantity_sold={book.quantity_sold}
                />
              </Grid>
            ))
          ) : (
            <Grid item xs={12}>
              <Typography variant="h6" align="center">
                No books found. Please try a different search or filter.
              </Typography>
            </Grid>
          )}
          {totalPages > 1 && (
            <Grid item xs={12} my={4}>
              <Box display="flex" justifyContent="center">
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
      </Grid>
    </Container>
  );
};

export default Category;
