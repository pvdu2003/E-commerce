import React, { useEffect, useState } from "react";
import { Container, Box } from "@mui/material";
import { fetchHotBooks } from "../services/home.service";
import TopCat from "../components/books/TopCat";

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

const Home: React.FC = () => {
  const [topBooksPerCategory, setTopBooksPerCategory] = useState<Category[]>(
    []
  );

  useEffect(() => {
    const fetchTopBooks = async () => {
      try {
        const response = await fetchHotBooks();
        setTopBooksPerCategory(response);
      } catch (error) {
        console.error(
          error instanceof Error ? error.message : "An error occurred"
        );
      }
    };

    fetchTopBooks();
  }, []);

  return (
    <Container>
      <Box mb={5}>
        {topBooksPerCategory.map((cat) => (
          <TopCat key={cat.cat_id} cat={cat} />
        ))}
      </Box>
    </Container>
  );
};

export default Home;
