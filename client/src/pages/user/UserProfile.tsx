import React from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  Hidden,
} from "@mui/material";
import { useAuthContext } from "../../contexts/AuthContext";
import UserNav from "../../components/UserNav";

const UserProfile: React.FC = () => {
  const { authUser } = useAuthContext();
  return (
    <Container maxWidth="lg">
      <Box textAlign="center" mt={5}>
        <Typography variant="h4" fontWeight="bold">
          ACCOUNT INFORMATION
        </Typography>
      </Box>
      <Grid container spacing={2} mt={2} alignItems="start">
        <Hidden mdDown>
          <Grid item xs={0} md={3}>
            <UserNav />
          </Grid>
        </Hidden>
        <Grid item xs={12} md={9} textAlign="left">
          <Box mt={2}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Typography>
                  Username:
                  <span
                    style={{
                      fontWeight: "500",
                      color: "green",
                      paddingLeft: 2,
                    }}
                  >
                    {authUser.username}
                  </span>
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography>
                  Email:
                  <span
                    style={{
                      fontWeight: "500",
                      color: "green",
                      paddingLeft: 2,
                    }}
                  >
                    {authUser.email}
                  </span>
                </Typography>
              </Grid>
              {authUser.dob && (
                <Grid item xs={12} md={6}>
                  <Typography>
                    Date of birth:
                    <span
                      style={{
                        fontWeight: "500",
                        color: "green",
                        paddingLeft: 2,
                      }}
                    >
                      {new Date(authUser.dob).toLocaleString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </Typography>
                </Grid>
              )}
              {authUser.phone_num && (
                <Grid item xs={12} md={6}>
                  <Typography>
                    Phone Number:
                    <span
                      style={{
                        fontWeight: "500",
                        color: "green",
                        paddingLeft: 2,
                      }}
                    >
                      {authUser.phone_num}
                    </span>
                  </Typography>
                </Grid>
              )}
              {authUser.address && (
                <Grid item xs={12} md={6}>
                  <Typography>
                    Address:
                    <span
                      style={{
                        fontWeight: "500",
                        color: "green",
                        paddingLeft: 2,
                      }}
                    >
                      {authUser.address}
                    </span>
                  </Typography>
                </Grid>
              )}
              <Grid item xs={12} md={6}>
                <Typography>
                  Role:
                  <span
                    style={{
                      fontWeight: "500",
                      color: "green",
                      paddingLeft: 2,
                    }}
                  >
                    {authUser.role}
                  </span>
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography>
                  Created At:
                  <span
                    style={{
                      fontWeight: "500",
                      color: "green",
                      paddingLeft: 2,
                    }}
                  >
                    {new Date(authUser.createdAt).toLocaleString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                      hour: "numeric",
                      minute: "numeric",
                      second: "numeric",
                    })}
                  </span>
                </Typography>
              </Grid>
              {authUser.updatedAt !== authUser.createdAt && (
                <Grid item xs={12} md={6}>
                  <Typography>
                    Updated At:
                    <span
                      style={{
                        fontWeight: "500",
                        color: "green",
                        paddingLeft: 2,
                      }}
                    >
                      {new Date(authUser.updatedAt).toLocaleString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                        hour: "numeric",
                        minute: "numeric",
                        second: "numeric",
                      })}
                    </span>
                  </Typography>
                </Grid>
              )}
            </Grid>
            <Box mt={2}>
              {authUser._id.toString() === authUser._id.toString() ? (
                <Button variant="contained" color="primary" href="/user/update">
                  Update
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  href="/user/manage"
                  startIcon={<i className="fas fa-arrow-left"></i>}
                >
                  Come back
                </Button>
              )}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default UserProfile;
