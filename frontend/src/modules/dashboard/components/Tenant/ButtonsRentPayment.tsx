import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button } from "@mui/material";
import {PaymentStatus } from "../../../../repositories/TrustAPI/types";
import {
  payCryptoRentInETH,
  payCryptoRentInToken,
  payFiatRentInEth,
  payFiatRentInToken,
  updateRate,
} from "../../../../contracts/utils";
import { toast } from 'react-toastify';
import { useUser } from "../../../../contexts/UserContext";
import {CONST} from "../../../../const";
import {useProvider} from "wagmi";
import TransactionToast from "../../../../commons/components/TransactionToast";

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
export const ButtonsRentPayment = ({ rentId, leaseId, amount, paymentDate, status, validationDate, rentPaymentDate, currencyPair, rentPaymentLimitDate, withoutIssues,paymentToken }: ButtonsProps) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  //TODO @BT ajouter ici le statut de wihthoutissues. Un "useState" ou un "useRef" pour que je le passe dans les fonction de paiement

  const navigate = useNavigate();
  const { signer } = useUser();
  const provider = useProvider();

  //Only works in testnet :(
  const renderToast = async (tx: any): Promise<void> => {
    const receipt = await toast.promise(provider.waitForTransaction(tx.hash), {
      pending: {
        render() {
          return (<TransactionToast message='Your update is in progress' transactionHash={tx.hash}/>);
        }
      }, success: 'Transaction successfully mined!', error: 'Transaction failed!',
    });
  };

  //TODO le booleen doit venir d'un state lié à un champ type radio
  const handlePay = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const contractRentId = rentId.substring(rentId.indexOf('-') + 1, rentId.length);
    if (signer) {
      if (currencyPair === "CRYPTO") {
        if (paymentToken == CONST.ETH_ADDRESS) {
          const tx = await payCryptoRentInETH(signer, leaseId, contractRentId, withoutIssues, amount);
          // renderToast(tx);
        } else {
          await payCryptoRentInToken(signer, leaseId, contractRentId, paymentToken, withoutIssues, amount);
        }
      } else if(paymentToken == CONST.ETH_ADDRESS) {
        //Update oracle rate value before calling the pay function
        await updateRate(signer, currencyPair);
        await payFiatRentInEth(signer, leaseId, contractRentId, withoutIssues, amount, currencyPair);
      } else {
        //Update oracle rate value before calling the pay function
        await updateRate(signer, currencyPair);
        const tx = await payFiatRentInToken(signer, leaseId, contractRentId, paymentToken, withoutIssues, amount, currencyPair);
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
