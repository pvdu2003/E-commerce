import React, { useState, FormEvent, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockIcon from "@mui/icons-material/Lock";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "bootstrap/dist/css/bootstrap.min.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { login } from "../../services/auth.service";
import { useAuthContext } from "../../contexts/AuthContext";

interface LoginData {
  username: string;
  password: string;
}

function Signin() {
  const defaultTheme = createTheme();
  const { setAuthUser } = useAuthContext();

  const defaultData: LoginData = {
    username: "",
    password: "",
  };

  const [formData, setFormData] = useState<LoginData>(defaultData);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { username, password } = formData;
    try {
      const resp = await login(username, password);
      if (resp.message !== "Login successful") {
        toast.error(resp.message);
      } else {
        sessionStorage.setItem("user", JSON.stringify(resp.user));
        sessionStorage.setItem("token", resp.token);
        toast.success("Login successfully!!!", { autoClose: 1000 });
        setAuthUser(resp.user);
      }
    } catch (error) {
      console.error("An error occurred during login.", error);
    }
  };

  const googleAuth = () => {
    window.location.href = `${import.meta.env.VITE_SERVER_URL}/auth/google`;
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    const user = urlParams.get("user");

    if (user && token) {
      sessionStorage.setItem("user", decodeURIComponent(user));
      sessionStorage.setItem("token", token);
      setAuthUser(JSON.parse(decodeURIComponent(user)));
      toast.success("Logged in with Google successfully!");
      window.location.href = "/";
    } else {
      console.log("no user and token provided");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Log in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              onChange={handleOnChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={handleOnChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Login
            </Button>
            <Button
              fullWidth
              variant="outlined"
              sx={{ mt: 3, mb: 2 }}
              onClick={googleAuth}
            >
              Login with Google
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="/forgot-pwd" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default Signin;
