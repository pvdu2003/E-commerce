import { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
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

import { resetPwd } from "../../services/user.service";

const ForgotPwd: React.FC = () => {
  const defaultTheme = createTheme();
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email || !username) {
      toast.error("Please enter your username and email address", {
        autoClose: 2000,
      });
      return;
    }

    try {
      const resp = await resetPwd(username, email);
      if (resp.status !== 404) {
        toast.success(resp.data.message, { autoClose: 1000 });
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      } else {
        toast.error(resp.message, { autoClose: 2000 });
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.", { autoClose: 2000 });
      console.error(error);
    }
  };

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
            Forgot Password
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
              label="Your Username"
              name="username"
              autoComplete="username"
              autoFocus
              onChange={handleUsernameChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Your Email"
              name="email"
              autoComplete="email"
              onChange={handleEmailChange}
            />
            <Button type="submit" fullWidth variant="contained" sx={{ my: 2 }}>
              Submit
            </Button>

            <Grid container direction="column" m={0.25}>
              <Grid>
                <Link href="/login" variant="body2">
                  Return to login page?
                </Link>
              </Grid>
              <Grid>
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
};

export default ForgotPwd;
