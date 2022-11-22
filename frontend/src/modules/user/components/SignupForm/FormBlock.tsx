import React from "react";
import { Box, Button } from "@mui/material";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import HouseIcon from "@mui/icons-material/House";

interface FormBlockProps {
  handleTenant: () => void;
  handleOwner: () => void;
}
export const FormBlock = ({ handleTenant, handleOwner }: FormBlockProps) => {
  return (
    <Box
      sx={{
        margin: "32px",
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center",
      }}
    >
      <Button
        variant="outlined"
        startIcon={<SupervisorAccountIcon />}
        onClick={handleTenant}
      >
        Locataire
      </Button>
      <Button
        variant="outlined"
        startIcon={<HouseIcon />}
        onClick={handleOwner}
      >
        Propriétaire
      </Button>
    </Box>
  );
};
