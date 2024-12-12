import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Login from "./pages/auth/Signin";
import SignUp from "./pages/auth/Signup";
import Home from "./pages/Home";
import { useAuthContext } from "./contexts/AuthContext";
import Layout from "./components/commons/Layout";
import Category from "./pages/Category";
import BookList from "./pages/book/BookList";
import BookDetail from "./pages/book/BookDetail";

const App: React.FC = () => {
  const { authUser } = useAuthContext();

  return (
    <>
      <Routes>
        <Route
          path="/login"
          element={
            <Layout>{authUser ? <Navigate to="/" /> : <Login />}</Layout>
          }
        />
        <Route
          path="/signup"
          element={
            <Layout>
              <SignUp />
            </Layout>
          }
        />
        <Route
          path="/"
          element={
            <Layout>{authUser ? <Home /> : <Navigate to={"/login"} />}</Layout>
          }
        />
        <Route
          path="/category/:id"
          element={
            <Layout>
              {authUser ? <Category /> : <Navigate to={"/login"} />}
            </Layout>
          }
        />
        <Route
          path="/book/:id"
          element={
            <Layout>
              {authUser ? <BookDetail /> : <Navigate to={"/login"} />}
            </Layout>
          }
        />
        <Route
          path="/book/list"
          element={
            <Layout>
              {authUser ? <BookList /> : <Navigate to={"/login"} />}
            </Layout>
          }
        />
      </Routes>
      <ToastContainer />
    </>
  );
};

export default App;
