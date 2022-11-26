import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button } from "@mui/material";
import {PaymentStatus, RentPayment} from "../../../../repositories/TrustAPI/types";
import {
  declineLease,
  validateLease,
  cancelLease,
  payCryptoRentInETH,
  payCryptoRentInToken,
  getRate,
  payFiatRentInEth, payFiatRentInToken,
} from "../../../../contracts/utils";
import { useUser } from "../../../../contexts/UserContext";
import { LeaseReviewPopover } from "./LeaseReviewPopover";
import {CONST, tokens} from "../../../../const";

interface ButtonsProps {
  rentId: string;
  leaseId: string;
  amount: string;
  paymentDate: string;
  status: string;
  validationDate: string;
  rentPaymentDate: string;
  currencyPair: string;
  rentPaymentLimitDate: string;
  withoutIssues: boolean;
  paymentToken: string;
}
export const ButtonsRentPayment = ({ rentId, leaseId, amount, paymentDate, status, validationDate, rentPaymentDate,currencyPair, rentPaymentLimitDate, withoutIssues,paymentToken }: ButtonsProps) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const navigate = useNavigate();
  const { signer } = useUser();

  const handlePay = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (signer) {
      if (currencyPair === "CRYPTO") {
        if (paymentToken == CONST.ETH_ADDRESS) {
          await payCryptoRentInETH(signer, leaseId, rentId, withoutIssues, amount);
        } else {
          await payCryptoRentInToken(signer, leaseId, rentId, paymentToken, withoutIssues, amount);
        }
      } else if(paymentToken == CONST.ETH_ADDRESS) {
        const oracleRateData = await getRate(signer, currencyPair);
        console.log("oracleRateData : ",oracleRateData);
        //TODO check la data et la passer dans la fonction
        //TODO ajouter un fake oracle pour la démo
        await payFiatRentInEth(signer, leaseId, rentId, withoutIssues, oracleRateData);
      } else {
        const oracleRateData = await getRate(signer, currencyPair);
        console.log("oracleRateData : ",oracleRateData);
        //TODO check la data et la passer dans la fonction
        await payFiatRentInToken(signer, leaseId, rentId, paymentToken, withoutIssues, oracleRateData);
    }
  }
  };

  switch (status) {
    case PaymentStatus.PENDING.toString():
      const canPay = Date.now() >= Number(rentPaymentLimitDate);
      return (
        <Box
          sx={{
            display: "flex",
            gap: "12px",
            width: "100%",
          }}
        >
          <Button
            fullWidth
            variant="outlined"
            color="error"
            disabled ={!canPay}
            onClick={handlePay}
          >
            Pay
          </Button>
        </Box>
      );
    case PaymentStatus.PAID.toString():
      return (
        <Box sx={{ display: "flex", gap: "12px", width: "100%" }}>
          <Button
            fullWidth
            variant="outlined"
            color="info"
            disabled={true}
            onClick={handlePay}
          >
            Paid
          </Button>
        </Box>
      );
    case PaymentStatus.PENDING:
      return (
        <Box sx={{ display: "flex", gap: "12px", width: "100%" }}>
          Pending...
        </Box>
      );
    case PaymentStatus.NOT_PAID:
      return (
        <Box sx={{ display: "flex", gap: "12px", width: "100%" }}>
          Not paid...
        </Box>
      );
    default:
      return <></>;
  }
};
