import React from "react";
import { Box, Container, Typography } from "@mui/material";

const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{ backgroundColor: "primary.main", color: "white", py: 2 }}
      id="footer"
    >
      <Container>
        <Typography variant="body2" align="center">
          &copy; {new Date().getFullYear()} APlusBook. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
