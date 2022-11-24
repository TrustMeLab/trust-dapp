import React, { useState } from "react";
import {
  Alert,
  Box,
  Paper,
  Popover,
  TextField,
  Typography,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
// import postToIPFS from "../../../../repositories/services/ipfsUtils";
import { useUser } from "../../../../contexts/UserContext";
// import { reviewLease } from "../../../../contracts/utils";

interface LeaseReviewPopoverProps {
  owner?: string;
  leaseId: string;
  anchorEl: HTMLButtonElement | null;
  setAnchorEl: React.Dispatch<React.SetStateAction<HTMLButtonElement | null>>;
}

export interface ReviewForm {
  review: string;
}

export const LeaseReviewPopover = ({
  owner,
  leaseId,
  anchorEl,
  setAnchorEl,
}: LeaseReviewPopoverProps) => {
  const [review, setReview] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { signer } = useUser();
  const handleClose = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setAnchorEl(null);
    setLoading(false);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    setReview(e.target.value);
  };

  const handleSubmit = async (e: React.MouseEvent) => {
    e.stopPropagation();

    setLoading(true);
    try {
      //   const uri = await postToIPFS(JSON.stringify(review));
      //   if (signer && uri) await reviewLease(signer, leaseId, uri);
      setAnchorEl(null);
      setLoading(false);
    } catch (error) {
      setError("An error occurred");
      setLoading(false);
    }
  };
  return (
    <Popover
      id={id}
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
    >
      <Box padding={4} textAlign="center">
        <Typography marginBottom={"18px"} textAlign="center" variant="h5">
          What did you think of your experience with {owner ?? "the owner"} ?
        </Typography>

        <TextField
          id="review"
          name="review"
          type="text"
          multiline
          fullWidth
          value={review}
          onChange={handleInputChange}
        />
        <LoadingButton
          variant="contained"
          onClick={handleSubmit}
          sx={{ marginTop: 4 }}
          loading={loading}
          disabled={!review}
        >
          Send
        </LoadingButton>

        {error && <Alert severity="error">{error}</Alert>}
      </Box>
    </Popover>
  );
};
