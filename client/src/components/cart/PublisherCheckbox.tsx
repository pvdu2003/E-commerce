import React from "react";
import { Grid, Checkbox } from "@mui/material";

interface PublisherCheckboxProps {
  publisher: string;
  isChecked: boolean;
  onChange: () => void;
}

const PublisherCheckbox: React.FC<PublisherCheckboxProps> = ({
  publisher,
  isChecked,
  onChange,
}) => {
  return (
    <Grid container alignItems="center">
      <Grid item xs={1}>
        <Checkbox checked={isChecked} onChange={onChange} />
      </Grid>
      <Grid item xs={8} className="text-start text-main fw-medium">
        {publisher}
      </Grid>
    </Grid>
  );
};

export default PublisherCheckbox;
