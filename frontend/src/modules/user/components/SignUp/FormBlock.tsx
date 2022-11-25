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
        onClick={handleTenant}
        sx={{
          height: "60px",
          padding: 6,
          fontSize: "24px",
        }}
      >
        <SupervisorAccountIcon sx={{ marginRight: 3, fontSize: "28px" }} />
        Tenant
      </Button>
      <Button
        variant="outlined"
        onClick={handleOwner}
        sx={{
          height: "60px",
          padding: 6,
          fontSize: "24px",
        }}
      >
        <HouseIcon sx={{ marginRight: 3, fontSize: "28px" }} />
        Owner
      </Button>
    </Box>
  );
};
