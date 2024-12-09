import React, { useEffect, useState } from "react";
import { Container, Grid, Pagination } from "@mui/material";
import { useParams } from "react-router-dom";
import BookCard from "../components/books/BookCard";
import { fetchCategoryById } from "../services/category.service";

interface Book {
  _id: string;
  image: string;
  title: string;
  price: number;
  quantity_sold: number;
}

const Category = () => {
  const { id } = useParams<{ id: string }>();
  const [books, setBooks] = useState<Book[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;

      try {
        const { books, totalPages } = await fetchCategoryById(id, currentPage);
        setBooks(books);
        setTotalPages(totalPages);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id, currentPage]);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
  };

  return (
    <Container>
      <Grid container spacing={2} className="my-4">
        <Grid item xs={2}></Grid>
        <Grid item xs={10} className="ps-5">
          <Grid container spacing={2}>
            {books.map((book) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={book._id}>
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
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              variant="outlined"
              shape="rounded"
              className="mt-4"
            />
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Category;
