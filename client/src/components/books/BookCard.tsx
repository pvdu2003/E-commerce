import React from "react";
import {
  Typography,
  Card,
  CardMedia,
  CardContent,
  Grid,
  Box,
} from "@mui/material";

interface BookCardProps {
  _id: string;
  image: string;
  title: string;
  price: number;
  quantity_sold: number;
}

const BookCard: React.FC<BookCardProps> = ({
  _id,
  image,
  title,
  price,
  quantity_sold,
}) => {
  return (
    <Grid item xs={6} sm={4} md={3} key={_id}>
      <Card sx={{ width: "12rem", height: "16rem" }}>
        <a href={`/book/${_id}`}>
          <CardMedia
            component="img"
            image={image}
            alt="Book Image"
            sx={{ height: "12rem" }}
          />
        </a>
        <CardContent sx={{ padding: "0px !important" }}>
          <Typography variant="h6" component="h5" className="text-dark" noWrap>
            <a href={`/book/${_id}`} className="text-decoration-none text-dark">
              {title}
            </a>
          </Typography>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="body2" className="text-main fw-bold">
              {price.toFixed(2)}$
            </Typography>
            <Typography variant="body2" style={{ fontSize: "14px" }}>
              Sold: {quantity_sold}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default BookCard;
