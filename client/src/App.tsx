import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Login from "./pages/auth/Signin";
import SignUp from "./pages/auth/Signup";
import Home from "./pages/Home";
import { useAuthContext } from "./contexts/AuthContext";

function App() {
  const { authUser } = useAuthContext();
  return (
    <>
      <Routes>
        <Route path="/login" element={authUser ? <SignUp /> : <Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<Home />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
