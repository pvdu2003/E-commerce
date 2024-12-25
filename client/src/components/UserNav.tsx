import React from "react";
import { Box, Link, Typography } from "@mui/material";
import { useAuthContext } from "../contexts/AuthContext";

const UserNav: React.FC = () => {
  const { authUser } = useAuthContext();

  return (
    <Box className="d-flex flex-column border-end border-2">
      <Link
        href="/user/profile"
        className="text-dark text-decoration-none py-2"
        underline="none"
      >
        <Typography variant="body1">Account Information</Typography>
      </Link>
      <Link
        href="/user/change-password"
        className="text-dark text-decoration-none py-2"
        underline="none"
      >
        <Typography variant="body1">Change Password</Typography>
      </Link>

      {/* For admin */}
      {authUser.role === "admin" && (
        <>
          <Link
            href="/book/manage"
            className="text-dark text-decoration-none py-2"
            underline="none"
          >
            <Typography variant="body1">Manage Books</Typography>
          </Link>
          <Link
            href="/user/manage"
            className="text-dark text-decoration-none py-2"
            underline="none"
          >
            <Typography variant="body1">Manage Users</Typography>
          </Link>
          <Link
            href="/order/manage"
            className="text-dark text-decoration-none py-2"
            underline="none"
          >
            <Typography variant="body1">Manage Orders</Typography>
          </Link>
        </>
      )}

      {/* For all */}
      <Link
        href="/order/list"
        className="text-dark text-decoration-none py-2"
        underline="none"
      >
        <Typography variant="body1">My Orders</Typography>
      </Link>
      <Link
        href="/auth/logout"
        className="text-dark text-decoration-none py-2"
        underline="none"
      >
        <Typography variant="body1">Log Out</Typography>
      </Link>
    </Box>
  );
};

export default UserNav;
