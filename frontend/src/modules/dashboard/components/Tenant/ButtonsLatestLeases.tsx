import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTrust } from "../../../../contexts/TrustContext";
import { Box, Button, useTheme } from "@mui/material";
import { LeaseStatus } from "../../../../repositories/TrustAPI/types";

interface ButtonsProps {
  leaseId: string;
  leaseStatus: LeaseStatus;
}
export const ButtonsLatestLeases = ({ leaseId, leaseStatus }: ButtonsProps) => {
  const navigate = useNavigate();
  const $api = useTrust();

  const handleClickCancel = async (e: React.MouseEvent) => {
    e.stopPropagation();

    await $api.cancelLease(leaseId);
    navigate(0);
  };

  const handleClickConfirm = async (e: React.MouseEvent) => {
    e.stopPropagation();

    await $api.validateLease(leaseId);
    navigate(0);
  };

  const handleClickDecline = async (e: React.MouseEvent) => {
    e.stopPropagation();

    await $api.declineLease(leaseId);
    navigate(0);
  };

  switch (leaseStatus) {
    case "PENDING":
      return (
        <Box sx={{ display: "flex", gap: "12px" }}>
          <Button variant="outlined" color="error" onClick={handleClickDecline}>
            Reject
          </Button>
          <Button
            variant="outlined"
            color="success"
            onClick={handleClickConfirm}
          >
            Confirm
          </Button>
        </Box>
      );
    case "ACTIVE":
      return (
        <Box sx={{ display: "flex", gap: "12px" }}>
          <Button color="success" sx={{ cursor: "auto" }}>
            ACTIVE
          </Button>
          <Button variant="outlined" color="info" onClick={handleClickCancel}>
            Request Cancellation
          </Button>
        </Box>
      );
    case "ENDED":
      return (
        <Button variant="outlined" disabled color="info">
          ENDED
        </Button>
      );
    case "CANCELLED":
      return (
        <Button variant="outlined" disabled color="primary">
          CANCELLED
        </Button>
      );
    default:
      return <></>;
  }
};
