import React from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Login from "./pages/auth/Signin";
import SignUp from "./pages/auth/Signup";
import Home from "./pages/Home";
import { useAuthContext } from "./contexts/AuthContext";
import Layout from "./components/commons/Layout";

const App: React.FC = () => {
  const { authUser } = useAuthContext();

  return (
    <>
      <Routes>
        <Route
          path="/login"
          element={<Layout>{authUser ? <Home /> : <Login />}</Layout>}
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
          element={<Layout>{authUser ? <Home /> : <Login />}</Layout>}
        />
      </Routes>
      <ToastContainer />
    </>
  );
};

export default App;
