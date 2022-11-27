import React from "react";
import { Box, Button } from "@mui/material";

import Crypto from "../../../../assets/cryptocurrency.png";
import Fiat from "../../../../assets/fiat.png";
import { CreateLeaseForm } from "../../pages/OwnerCreateLease";

interface FirstFormBlockProps {
  setValues: (value: React.SetStateAction<Partial<CreateLeaseForm>>) => void;
  activeStep: number;
  setActiveStep: (value: number) => void;
}
export const FirstFormBlock = ({
  setValues,
  setActiveStep,
  activeStep,
}: FirstFormBlockProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center",
      }}
    >
      <Button
        onClick={() => {
          setValues((prev) => ({ ...prev, paymentMethod: "crypto" }));
          setActiveStep(activeStep + 1);
        }}
        sx={{
          height: "60px",
          padding: 6,
          fontSize: "24px",
        }}
      >
        <img src={Crypto} style={{ width: "80px", marginRight: "12px" }} />
        Crypto currency
      </Button>
      <Button
        onClick={() => {
          setValues((prev) => ({ ...prev, paymentMethod: "fiat" }));
          setActiveStep(activeStep + 1);
        }}
        sx={{
          height: "60px",
          padding: 6,
          fontSize: "24px",
        }}
      >
        <img src={Fiat} style={{ width: "100px", marginRight: "12px" }} />
        Fiat currency
      </Button>
    </Box>
  );
};
