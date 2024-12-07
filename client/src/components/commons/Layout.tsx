// src/components/Layout.tsx

import React from "react";
import { Container } from "@mui/material";
import Header from "./Header";
import useCategories from "../../hooks/useCategories"; // Import custom hook
import Footer from "./Footer";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { categories } = useCategories();

  return (
    <>
      <Header categories={categories} />
      <Container>{children}</Container>
      <Footer />
    </>
  );
};

export default Layout;
