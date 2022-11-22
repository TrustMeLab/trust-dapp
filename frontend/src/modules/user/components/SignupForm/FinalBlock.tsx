import React from "react";
import { Box, Button, TextField } from "@mui/material";
import { ProfileFormValues } from "../../../../repositories/types";

interface FinalBlockProps {
  handleSubmit: () => void;
  values: any;
  setValues: (values: ProfileFormValues) => void;
}
export const FinalBlock = ({
  handleSubmit,
  values,
  setValues,
}: FinalBlockProps) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      name: e.target.value,
    });
  };

  return (
    <Box
      sx={{
        margin: "32px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <TextField
        id="name-input"
        name="name"
        label="Name"
        type="text"
        value={values.name}
        onChange={handleInputChange}
      />
      <Button variant="contained" onClick={handleSubmit} sx={{ marginTop: 12 }}>
        Envoyer
      </Button>
    </Box>
  );
};
