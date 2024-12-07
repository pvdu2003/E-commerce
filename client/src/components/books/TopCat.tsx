import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import BookCard from "./BookCard";

interface Book {
  _id: string;
  image: string;
  title: string;
  price: number;
  quantity_sold: number;
}

interface Category {
  cat_id: string;
  category: string;
  books: Book[];
}

interface CategorySectionProps {
  cat: Category;
}

const TopCat: React.FC<CategorySectionProps> = ({ cat }) => {
  return (
    <Box key={cat.cat_id} className="my-3 py-2 px-3 bg-light">
      <Box
        display="flex"
        justifyContent="space-between"
        pb={2}
        alignItems="center"
      >
        <Typography variant="h5" component="h2">
          <Link
            to={`/category/${cat.cat_id}`}
            className="text-main text-decoration-none"
          >
            {cat.category}
          </Link>
        </Typography>
        <Link
          to={`/category/${cat.cat_id}`}
          className="fs-6 fst-italic text-main text-decoration-none"
        >
          More
          <i
            className="fas fa-chevron-right text-main align-middle"
            style={{ fontSize: "14px", marginLeft: "4px" }}
          />
        </Link>
      </Box>
      <Grid container spacing={2}>
        {cat.books.map((book) => (
          <Grid item xs={12} sm={6} md={4} lg={2} key={book._id}>
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
    </Box>
  );
};

export default TopCat;
