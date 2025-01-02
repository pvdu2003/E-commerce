import React, { useState } from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Grid,
  Box,
  Typography,
  Container,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";
import { updateProfile } from "../../services/user.service";
import { toast } from "react-toastify";

interface User {
  name: string;
  username: string;
  email: string;
  dob: string | null;
  phone_num: string | null;
  address: string | null;
}

const UserUpdate: React.FC = () => {
  const { authUser, setAuthUser } = useAuthContext();

  const [formData, setFormData] = useState<User>({
    name: authUser.name,
    username: authUser.username,
    email: authUser.email,
    dob: authUser.dob,
    phone_num: authUser.phone_num,
    address: authUser.address,
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const updatedUser = await updateProfile(
        authUser._id,
        formData.name,
        formData.username,
        formData.email,
        formData.dob,
        formData.phone_num,
        formData.address
      );
      sessionStorage.setItem("user", JSON.stringify(updatedUser));

      setAuthUser(updatedUser);
      toast.success("Updated profile successfully", { autoClose: 1000 });
      setTimeout(() => {
        navigate("/user/profile");
      }, 1500);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const formatDateString = (dateString: string | null): string => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  };

  return (
    <Container component="main" maxWidth="md" sx={{ pb: 4 }}>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }} />
        <Typography component="h1" variant="h5">
          Update Account
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Full Name"
                value={formData.name}
                InputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Username"
                value={formData.username}
                InputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Date of Birth"
                name="dob"
                type="date"
                value={formData.dob ? formatDateString(formData.dob) : ""}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Phone Number"
                name="phone_num"
                type="tel"
                value={formData.phone_num || ""}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Address"
                name="address"
                value={formData.address || ""}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          <Box sx={{ display: "flex", justifyContent: "flex-end", py: 4 }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ mr: 2 }}
            >
              Update
            </Button>
            <Button
              variant="outlined"
              onClick={() => navigate("/user/profile")}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default UserUpdate;
