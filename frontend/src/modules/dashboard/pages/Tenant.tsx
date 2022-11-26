import React, { useEffect, Fragment } from "react";
import { Box, Typography } from "@mui/material";
import { LargeCard } from "../../../commons/components/LargeCard";
import { useNavigate } from "react-router-dom";
import { Container } from "@mui/system";
import { SmallCard } from "../../../commons/components/SmallCard";
import { Layout } from "../../../commons/components/Layout";
import { Lease, LeaseStatus } from "../../../repositories/TrustAPI/types";
import { useTrust } from "../../../contexts/TrustContext";
import fns from "date-fns";
import { useUser } from "../../../contexts/UserContext";
import { formatDuration, intervalToDuration, format } from "date-fns";
import { ButtonsLatestLeases } from "../components/Tenant/ButtonsLatestLeases";
import { CONST, tokens } from "../../../const";
import { ethers, FixedNumber } from "ethers";
import useLeasesByTenantId from "../../../hooks/useTenantLeases";
import useTenantById from "../../../hooks/useTenantById";

export const returnTitle = (leaseStatus: LeaseStatus) => {
  if (leaseStatus === (LeaseStatus.ENDED || LeaseStatus.CANCELLED))
    return "Bail terminé";
  return "Votre bail en cours";
};

export const returnPeriod = (
  startDate: number | string,
  rentPaymentInterval: string,
  totalNumberOfRents: string
) => {
  const debutDate = format(new Date(Number(startDate)), "dd/MM/yyyy");
  const endDate = format(
    new Date(
      Number(startDate) +
        Number(rentPaymentInterval) * Number(totalNumberOfRents)
    ),
    "dd/MM/yyyy"
  );

  return `${debutDate} - ${endDate}`;
};

export const returnRentInfos = (
  rentAmount: string,
  currencyPair: string,
  rentPaymentInterval: string,
  totalNumberOfRents: string,
  paymentToken: string
) => {
  let displayCurrency = "";
  if (currencyPair === "CRYPTO") {
    const token = tokens.find((token) => token.address === paymentToken);
    displayCurrency = token?.name || "";
  } else {
    displayCurrency = currencyPair.substring(0, currencyPair.indexOf("-"));
    // displayCurrency = FixedNumber.from(currencyPair.substring(0, currencyPair.indexOf('-'))).round.(2).toString()
    const paymentCurrency = tokens.find(
      (token) => token.address === paymentToken
    );
  }
  const parsedRentAmount = ethers.utils.formatUnits(rentAmount, 18);
  const convertInterval = formatDuration(
    intervalToDuration({ start: 0, end: Number(rentPaymentInterval) * 1000 })
  ); // 30days
  console.log(`${parsedRentAmount} ${displayCurrency} / ${convertInterval}`)
  return `${parsedRentAmount} ${displayCurrency} / ${convertInterval}`;
};

export const Tenant = () => {
  const navigate = useNavigate();
  const { profile } = useUser();
  const tenantLeases = useLeasesByTenantId(profile?.tenant?.id as string);
  console.log("Tenant.tsx: tenantLeases", tenantLeases);
  console.log("Tenant.tsx: profile", profile);

  const lastLease = tenantLeases[0];
  // const lastLease = tenantLeases;
  // console.log("Tenant.tsx: lastLease", lastLease);

  return (
    !tenantLeases ? <p>You don't have a lease</p> :
    lastLease && <Fragment>
      <LargeCard
        title={returnTitle(lastLease.status)}
        period={returnPeriod(
          lastLease.startDate,
          lastLease.rentPaymentInterval,
          lastLease.totalNumberOfRents
        )}
        rentInfos={returnRentInfos(
          lastLease.rentAmount,
          lastLease.currencyPair,
          lastLease.rentPaymentInterval,
          lastLease.totalNumberOfRents,
          lastLease.paymentToken
        )}
        lease={lastLease}
        generalInfo={`Owner : ${lastLease.tenant.handle}`}
        remarks={
          lastLease.status === "CANCELLED"
            ? `Cancellation requested`
            : undefined
        }
        handleClick={() => navigate(`/dashboard/tenant/leases/${lastLease.id}`)}
        buttons={
          <ButtonsLatestLeases
            leaseId={lastLease.id}
            leaseStatus={lastLease.status}
            reviewUri={lastLease.tenantReviewUri}
          />
        }
      />

      <Typography variant="h4" marginTop={4} marginBottom={4}>
        Historique
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          gap: "16px",
        }}
      >
        {tenantLeases.map((lease: Lease) => (
          <SmallCard
            rentInfos={returnRentInfos(
              lease.rentAmount,
              lease.currencyPair,
              lease.rentPaymentInterval,
              lease.totalNumberOfRents,
              lease.paymentToken
            )}
            period={returnPeriod(
              lease.startDate,
              lease.rentPaymentInterval,
              lease.totalNumberOfRents
            )}
            handleClick={() => navigate(`/dashboard/tenant/leases/${lease.id}`)}
          />
        ))}
      </Box>
    </Fragment>
  );
};

//Mock
const tenantLeases: any = [
  {
    id: "1",
    currencyPair: "CRYPTO",
    paymentToken: "0x0000000000000000000000000000000000000000",
    ownerReviewUri: null,
    rentAmount: "500000",
    rentPaymentInterval: "2592000",
    rentPaymentLimitTime: "5184000",
    startDate: "1669113886",
    status: "PENDING",
    tenant: {
      address: "0x53addc3b41c5c761aa86ee21b8d42b7eee98a2b1",
      handle: "Carol",
      hasLease: false,
      id: "1",
    },
    tenantReviewUri: null,
    totalNumberOfRents: "12",
  },
  {
    id: "2",
    currencyPair: "USD-SHI",
    paymentToken: "0xf50ead67827fdf4fb8852c0ddfe4f17e88d34594",
    ownerReviewUri: null,
    rentAmount: "500000",
    rentPaymentInterval: "2592000",
    rentPaymentLimitTime: "0",
    startDate: "1669113889",
    status: "ENDED",
    tenant: {
      address: "0x858ee79b08ae13efd752838d25d1155d3ccd1894",
      handle: "Dave",
      hasLease: false,
      id: "2",
    },
    tenantReviewUri: null,
    totalNumberOfRents: "12",
  },
];
//   },
// };
