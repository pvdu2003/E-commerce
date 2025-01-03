import React, { useState } from "react";
import {
  Container,
  Grid,
  TextField,
  Button,
  Typography,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { changePwd } from "../../services/user.service";
import { useAuthContext } from "../../contexts/AuthContext";
import { toast } from "react-toastify";
const ChangePwd: React.FC = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<{ [key: string]: string }>({});
  const navigate = useNavigate();
  const { authUser } = useAuthContext();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError({});

    if (newPassword !== confirmPassword) {
      setError({ confirm_pwd: "Passwords do not match" });
      return;
    }

    const response = await changePwd(
      authUser._id,
      currentPassword,
      newPassword
    );
    console.log(response);

    if (response === "Current password is incorrect") {
      setError({ password: response });
      return;
    }

    toast.success(response.message, { autoClose: 1000 });
    setTimeout(() => {
      navigate("/user/profile");
    }, 1500);
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Change Password
      </Typography>
      {error.general && <Alert severity="error">{error.general}</Alert>}
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Current Password"
              type="password"
              fullWidth
              required
              variant="outlined"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              error={!!error.password}
              helperText={error.password}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="New Password"
              type="password"
              fullWidth
              required
              variant="outlined"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              error={!!error.new_password}
              helperText={error.new_password}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Confirm Password"
              type="password"
              fullWidth
              required
              variant="outlined"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              error={!!error.confirm_pwd}
              helperText={error.confirm_pwd}
            />
          </Grid>
        </Grid>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "16px",
          }}
        >
          <Button
            type="submit"
            variant="contained"
            color="primary"
            style={{ marginRight: "8px" }}
          >
            Save
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => navigate("/user/profile")}
          >
            Cancel
          </Button>
        </div>
      </form>
    </Container>
  );
};

export default ChangePwd;
