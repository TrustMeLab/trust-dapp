import { useState } from "react";
import { Button, Popover, Typography } from "@mui/material";

import { Lease } from "../../../../repositories/TrustAPI/types";
import { formatDuration, intervalToDuration } from "date-fns";

interface PopoverProps {
  lease: Lease;
  period: string;
}

export const LeasePopoverDetails = ({ lease, period }: PopoverProps) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();

    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  return (
    <>
      <Button aria-describedby={id} variant="contained" onClick={handleClick}>
        Details
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        anchorPosition={{ top: 100, left: 100 }}
      >
        <Typography sx={{ p: 2 }}>
          <b>Owner:</b> {lease.tenant.handle}
        </Typography>
        <Typography sx={{ p: 2 }}>
          <b>Montant :</b> {lease.rentAmount} {lease.currencyPair}
        </Typography>
        <Typography sx={{ p: 2 }}>
          <b>Périodicité : </b>
          {formatDuration(
            intervalToDuration({
              start: 0,
              end: Number(lease.rentPaymentInterval) * 1000,
            })
          )}
        </Typography>
        <Typography sx={{ p: 2 }}>
          <b>Nombre d'échéances : </b>
          {lease.totalNumberOfRents}
        </Typography>
        <Typography sx={{ p: 2 }}>
          <b>Dates : </b>
          {period}
        </Typography>
        <Typography sx={{ p: 2 }}>
          <b>Uri : </b>
          {lease.uri}
        </Typography>
        <Typography sx={{ p: 2 }}>
          <b>Status : </b>
          {lease.status}
        </Typography>
      </Popover>
    </>
  );
};
