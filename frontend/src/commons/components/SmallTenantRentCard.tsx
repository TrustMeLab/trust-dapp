import {Card, Typography} from "@mui/material";
import React from "react";
import {green} from "@mui/material/colors";
import {ButtonsRentPayment} from "../../modules/dashboard/components/Tenant/ButtonsRentPayment";
import {LeaseStatus, PaymentStatus} from "../../repositories/TrustAPI";
import {formatDuration, intervalToDuration, format} from "date-fns";
import {tokens} from "../../const";
import {ethers, FixedNumber} from "ethers";

interface SmallTenantCardProps {
  index: number,
  leaseId: string,
  rentId: string,
  // rentInfos: string | number,
  amount: string,
  currencyPair: string,
  paymentDate: string,
  validationDate: string,
  totalNumberOfRents: string,
  paymentToken: string,
  // period: string,
  status: string,
  withoutIssues: boolean,
  startDate: string,
  rentPaymentInterval: string,
  rentPaymentLimitDate: string,
  handleClick: () => void;
}

export const SmallTenantRentCard = ({
  index,
  leaseId,
  rentId,
  // rentInfos,
  // period,
  amount,
  currencyPair,
  paymentDate,
  validationDate,
  totalNumberOfRents,
  paymentToken,
  status,
  withoutIssues,
  startDate,
  rentPaymentInterval,
  handleClick,
  rentPaymentLimitDate
  }: SmallTenantCardProps) => {

  const renderPeriod = (
    startDate: number | string,
    rentPaymentInterval: string,
    totalNumberOfRents: string
  ) => {
    const debutDate = format(new Date(Number(startDate)), "dd/MM/yyyy");
    const endDate = format(
      new Date(Number(startDate) + Number(rentPaymentInterval) * Number(totalNumberOfRents)),
      "dd/MM/yyyy"
    );
    // console.log("endDate : ",endDate);

    return `${debutDate} - ${endDate}`;
  };

  //TODO bug here on end date - En vrai aps obligé de render comme ça, je peux juste display comme je veux
  const renderRentInfos = (
    rentAmount: string,
    currencyPair: string,
    rentPaymentInterval: string,
    totalNumberOfRents: string,
    paymentToken: string
  ): string => {
    let displayCurrency = "";
    if(currencyPair === "CRYPTO") {
      const token = tokens.find((token) => token.address === paymentToken);
      displayCurrency = token?.name || "";
    } else {
      displayCurrency = currencyPair.substring(0, currencyPair.indexOf('-'));
      displayCurrency = FixedNumber.from(currencyPair.substring(0, currencyPair.indexOf('-'))).round(2).toString();
      const paymentCurrency = tokens.find((token) => token.address === paymentToken);
    }
    const parsedRentAmount = ethers.utils.formatUnits(rentAmount, 18);
    // const convertInterval = 11
    console.log("rentPaymentInterval",rentPaymentInterval);
    let convertInterval = '0';
    if(rentPaymentInterval){
      convertInterval = formatDuration(intervalToDuration({ start: 0, end: Number(rentPaymentInterval) * 1000 })); // 30days
      console.log("convertInterval",convertInterval);
      console.log("displayCurrency",displayCurrency);
    }
    return `${parsedRentAmount} ${displayCurrency} / ${convertInterval}`;
  };

  return (<Card
    id={rentId}
    sx={{
      display: "flex",
      flexDirection: "column",
      borderRadius: "10px",
      padding: "8px",
      cursor: "pointer",
      width: "240px",
      height: "160px",
      justifyContent: "space-around",
      alignItems: "center",
      "&:hover": {
        boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px;",
      },
    }}
    onClick={handleClick}
  >
    <Typography sx={{ fontSize: 18, backgroundColor: green }} color="text.primary" gutterBottom>
      Rent {index}
    </Typography>
    <Typography variant="h6" sx={{fontWeight: "light"}}>
      {renderPeriod(startDate, rentPaymentInterval, totalNumberOfRents)}
    </Typography>
    {/*<Typography variant="h5">{renderRentInfos(*/}
    {/*  amount,*/}
    {/*  currencyPair,*/}
    {/*  renderPeriod(startDate, rentPaymentInterval, totalNumberOfRents),*/}
    {/*  totalNumberOfRents,*/}
    {/*  paymentToken*/}
    {/*)}</Typography>*/}
    <ButtonsRentPayment
      rentId={rentId}
      leaseId={leaseId}
      amount={amount}
      rentPaymentDate={paymentDate}
      paymentDate={paymentDate}
      rentPaymentLimitDate={rentPaymentLimitDate}
      validationDate={validationDate}
      currencyPair={currencyPair}
      withoutIssues={withoutIssues}
      status={status}
      paymentToken={paymentToken}/>
  </Card>);
};
