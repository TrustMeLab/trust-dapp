import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button } from "@mui/material";
import {
  LeaseStatus,
  PaymentStatus,
} from "../../../../repositories/TrustAPI/types";
import {
  markRentAsNotPaid,
  payCryptoRentInETH,
  payCryptoRentInToken,
  payFiatRentInEth,
  payFiatRentInToken,
  updateRate,
} from "../../../../contracts/utils";
import { toast } from "react-toastify";
import { useUser } from "../../../../contexts/UserContext";
import { CONST } from "../../../../const";
import { useProvider } from "wagmi";
import TransactionToast from "../../../../commons/components/TransactionToast";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";

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
  leaseStatus: LeaseStatus;
  isConnectedAsOwner: boolean;
}
export const ButtonsRentPayment = ({
  rentId,
  leaseId,
  amount,
  paymentDate,
  status,
  validationDate,
  rentPaymentDate,
  currencyPair,
  rentPaymentLimitDate,
  withoutIssues,
  paymentToken,
  leaseStatus,
  isConnectedAsOwner,
}: ButtonsProps) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [happy, setHappy] = useState(true);

  const navigate = useNavigate();
  const { signer } = useUser();
  const provider = useProvider();

  //Only works in testnet :(
  const renderToast = async (tx: any): Promise<void> => {
    const receipt = await toast.promise(provider.waitForTransaction(tx.hash), {
      pending: {
        render() {
          return (
            <TransactionToast
              message="Your update is in progress"
              transactionHash={tx.hash}
            />
          );
        },
      },
      success: "Transaction successfully mined!",
      error: "Transaction failed!",
    });
  };

  //TODO le booleen doit venir d'un state lié à un champ type radio
  const handlePay = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const contractRentId = rentId.substring(
      rentId.indexOf("-") + 1,
      rentId.length
    );
    if (signer) {
      if (currencyPair === "CRYPTO") {
        if (paymentToken == CONST.ETH_ADDRESS) {
          const tx = await payCryptoRentInETH(
            signer,
            leaseId,
            contractRentId,
            happy, // withoutIssues,
            amount
          );
          // renderToast(tx);
          //TODO navigate(0) ==> Dans le "promise.success" ===> Pour quand on sera sur testnet
          navigate(0);
        } else {
          await payCryptoRentInToken(
            signer,
            leaseId,
            contractRentId,
            paymentToken,
            happy, // withoutIssues,
            amount
          );
        }
      } else if (paymentToken == CONST.ETH_ADDRESS) {
        //Update oracle rate value before calling the pay function
        await updateRate(signer, currencyPair);
        console.log("amount", amount);
        await payFiatRentInEth(
          signer,
          leaseId,
          contractRentId,
          happy, //withoutIssues
          amount,
          currencyPair
        );
        navigate(0);
      } else {
        //Update oracle rate value before calling the pay function
        await updateRate(signer, currencyPair);
        const tx = await payFiatRentInToken(
          signer,
          leaseId,
          contractRentId,
          paymentToken,
          happy, // withoutIssues,
          amount,
          currencyPair
        );
        navigate(0);
      }
    }
  };

  const handleMarkAsNotPaid = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const contractRentId = rentId.substring(
      rentId.indexOf("-") + 1,
      rentId.length
    );
    if (signer) {
      await markRentAsNotPaid(signer, leaseId, contractRentId);
      navigate(0);
    }
  };

  switch (status) {
    case PaymentStatus.PENDING.toString():
      const canPay = Date.now() / 1000 >= Number(rentPaymentDate);
      return !isConnectedAsOwner ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "12px",
            width: "100%",
            margin: "10px",
          }}
        >
          <Box sx={{ display: "flex", gap: "10px" }}>
            <SentimentSatisfiedAltIcon
              onClick={() => setHappy(true)}
              color={happy ? "success" : "disabled"}
              sx={{ cursor: "pointer" }}
            />
            <SentimentVeryDissatisfiedIcon
              onClick={() => setHappy(false)}
              color={!happy ? "error" : "disabled"}
              sx={{ cursor: "pointer" }}
            />
          </Box>
          <Button
            fullWidth
            variant="outlined"
            color="error"
            disabled={!canPay || leaseStatus !== LeaseStatus.ACTIVE}
            onClick={handlePay}
          >
            Pay
          </Button>
        </Box>
      ) : (
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
            disabled={!canPay || leaseStatus !== LeaseStatus.ACTIVE}
            onClick={handleMarkAsNotPaid}
          >
            Mark as not paid
          </Button>
        </Box>
      );
    case PaymentStatus.PAID.toString():
      return (
        <Box
          sx={{
            bgcolor: "#11C6AE",
            display: "flex",
            gap: "12px",
            width: "100%",
          }}
        >
          <Button
            fullWidth
            variant="outlined"
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
        <Box
          sx={{
            display: "flex",
            mr: "2em",
            justifyContent: "flex-end",
            gap: "12px",
            width: "100%",
          }}
        >
          ❗ Not paid...
        </Box>
      );
    default:
      return <></>;
  }
};
