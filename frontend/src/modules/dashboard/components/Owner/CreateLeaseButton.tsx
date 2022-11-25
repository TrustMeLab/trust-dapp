import { Card, Typography } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const CreateLeaseButton = () => {
  const navigate = useNavigate();
  return (
    <Card
      sx={{
        borderRadius: "10px",
        padding: "32px",
        textAlign: "center",
        cursor: "pointer",
        width: "80%",
        boxShadow:
          "rgba(60, 64, 67, 0.9) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
        "&:hover": {
          boxShadow: "rgba(0, 0, 0, 0.5) 0px 4px 12px;",
        },
      }}
      onClick={() => navigate("/dashboard/owner/lease/create")}
    >
      <Typography variant="h4">Create Lease Form</Typography>
    </Card>
  );
};
