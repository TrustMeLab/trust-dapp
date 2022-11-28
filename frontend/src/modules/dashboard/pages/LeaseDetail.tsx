import React from "react";
import { Box, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { Container } from "@mui/system";
import {
  LeaseStatus,
  RentPayment,
  UserType,
} from "../../../repositories/TrustAPI";
import { useUser } from "../../../contexts/UserContext";
import { format, formatDuration, intervalToDuration } from "date-fns";
import { ButtonsLatestLeases } from "../components/Tenant/ButtonsLatestLeases";
import { tokens } from "../../../const";
import { ethers } from "ethers";
import { LeaseDetailCard } from "../../../commons/components/LeaseDetailCard";
import useLeaseDetails from "../../../hooks/useLeaseDetails";
import mocksLeases from "../../../mockLeases.json";

import { SmallTenantRentCard } from "../../../commons/components/SmallTenantRentCard";
import { useBalance } from "wagmi";

import { returnPaymentInTokenInfos } from "./Tenant";

export const LeaseDetail = () => {
  const { profile } = useUser();
  let { id } = useParams();
  //TODO Only works on Testnets :(
  // const { data } = useBalance();
  // console.log(data);

  // if(!id){
  //   return;
  // }
  const leaseDetail = useLeaseDetails(id as string);
  // const leaseDetail = mocksLeases.leases[0];
  console.log("Leasedetails : ", leaseDetail);
  // if(!leaseDetail){
  //   return;
  // }

  const returnTitle = (leaseStatus: LeaseStatus) => {
    if (leaseStatus === (LeaseStatus.ENDED || LeaseStatus.CANCELLED))
      return "Lease ended";
    return "Active Lease";
  };

  const returnPeriod = (
    startDate: number | string,
    rentPaymentInterval: string,
    totalNumberOfRents: string
  ) => {
    const debutDate = format(new Date(Number(startDate) * 1000), "dd/MM/yyyy");
    const endDate = format(
      new Date(
        (Number(startDate) +
          Number(rentPaymentInterval) * Number(totalNumberOfRents)) *
          1000
      ),
      "dd/MM/yyyy"
    );

    return `${debutDate} - ${endDate}`;
  };

  const returnRentInfos = (
    rentAmount: string,
    currencyPair: string,
    rentPaymentInterval: string,
    totalNumberOfRents: string,
    paymentToken: string
  ): string => {
    let displayCurrency = "";
    let paymentCurrency;
    if (currencyPair === "CRYPTO") {
      const token = tokens.find((token) => token.address === paymentToken);
      displayCurrency = token?.name || "";
      rentAmount = ethers.utils.formatEther(rentAmount);
    } else {
      displayCurrency = currencyPair.substring(0, currencyPair.indexOf("-"));
      // displayCurrency = FixedNumber.from().round(2).toString();
      paymentCurrency = tokens.find((token) => token.address === paymentToken);
    }
    let convertInterval = "0";
    if (rentPaymentInterval) {
      convertInterval = formatDuration(
        intervalToDuration({
          start: 0,
          end: Number(rentPaymentInterval) * 1000,
        })
      ); // 30days
    }
    console.log("convertInterval : ", convertInterval);
    return `${rentAmount} ${displayCurrency} / ${convertInterval}`;
  };

  return (
    <Container
      maxWidth="xl"
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      {leaseDetail && (
        <LeaseDetailCard
          title={returnTitle(leaseDetail.status)}
          period={returnPeriod(
            leaseDetail.startDate,
            leaseDetail.rentPaymentInterval,
            leaseDetail.totalNumberOfRents
          )}
          rentInfos={returnRentInfos(
            leaseDetail.rentAmount,
            leaseDetail.currencyPair,
            leaseDetail.rentPaymentInterval,
            leaseDetail.totalNumberOfRents,
            leaseDetail.paymentToken
          )}
          paymentToken={returnPaymentInTokenInfos(leaseDetail.currencyPair)}
          lease={leaseDetail}
          generalInfo={`Owner : ${leaseDetail.owner.handle}`}
          remarks={
            leaseDetail.status === "CANCELLED"
              ? `Cancellation requested`
              : undefined
          }
          // paymentCurrency = {paymentCurrency}
          buttons={
            <ButtonsLatestLeases
              leaseId={leaseDetail.id}
              leaseStatus={leaseDetail.status}
              tenantReviewUri={leaseDetail.tenantReviewUri}
              ownerReviewUri={leaseDetail.ownerReviewUri}
              cancellationRequestedByOwner={leaseDetail.cancelledByOwner}
              cancellationRequestedByTenant={leaseDetail.cancelledByTenant}
              userType={UserType.TENANT}
            />
          }
        />
      )}

      <Typography variant="h4" marginTop={4} marginBottom={4}>
        Paiements:
      </Typography>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "row",
          flexWrap: "wrap",
          gap: "30px",
        }}
      >
        {leaseDetail &&
          leaseDetail.rentPayments &&
          leaseDetail.rentPayments.map(
            (rentPayment: RentPayment, index: number) => (
              <SmallTenantRentCard
                key={rentPayment.id}
                index={index + 1}
                rentId={rentPayment.id}
                leaseId={leaseDetail.id}
                amount={leaseDetail.rentAmount}
                currencyPair={leaseDetail.currencyPair}
                paymentDate={rentPayment.paymentDate}
                rentPaymentDate={rentPayment.rentPaymentDate}
                validationDate={rentPayment.validationDate}
                totalNumberOfRents={leaseDetail.totalNumberOfRents}
                paymentToken={leaseDetail.paymentToken}
                status={rentPayment.status}
                withoutIssues={rentPayment.withoutIssues}
                startDate={leaseDetail.startDate}
                rentPaymentInterval={leaseDetail.rentPaymentInterval}
                rentPaymentLimitDate={rentPayment.rentPaymentLimitDate}
                leaseStatus={leaseDetail.status}
                isConnectedAsOwner={false}
                handleClick={() => {}}
              />
            )
          )}
      </Box>
    </Container>
  );
};
