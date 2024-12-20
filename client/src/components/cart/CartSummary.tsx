import React from "react";
import { Button, Typography } from "@mui/material";

interface CartSummaryProps {
  totalFee: number;
}

const CartSummary: React.FC<CartSummaryProps> = ({ totalFee }) => {
  return (
    <div className="container text-end mt-3">
      {totalFee > 0 && (
        <>
          <Typography>
            Total fee:
            <span className="text-main fw-medium">{totalFee.toFixed(2)}</span> $
          </Typography>
          <Button variant="contained" color="primary" href="/order/checkout">
            Buy Now
          </Button>
        </>
      )}
    </div>
  );
};

export default CartSummary;
