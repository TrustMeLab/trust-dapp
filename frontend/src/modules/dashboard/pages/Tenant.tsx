import React, {Fragment} from "react";
import {Box, Typography} from "@mui/material";
import {LargeCard} from "../../../commons/components/LargeCard";
import {useNavigate} from "react-router-dom";
import {Lease, LeaseStatus, UserType} from "../../../repositories/TrustAPI/types";
import {format, formatDuration, intervalToDuration} from "date-fns";
import {useUser} from "../../../contexts/UserContext";
import {ButtonsLatestLeases} from "../components/Tenant/ButtonsLatestLeases";
import {tokens} from "../../../const";
import {ethers} from "ethers";
import useLeasesByTenantId from "../../../hooks/useTenantLeases";
import {SmallCard} from "../../../commons/components/SmallCard";

export const returnTitle = (leaseStatus: LeaseStatus) => {
  if (leaseStatus === (LeaseStatus.ENDED || LeaseStatus.CANCELLED))
    return "Lease ended";
  return "Your current Lease";
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
): string => {
  let displayCurrency = "";
  if(currencyPair === "CRYPTO") {
    const token = tokens.find((token) => token.address === paymentToken);
    displayCurrency = token?.name || "";
    rentAmount = ethers.utils.formatUnits(rentAmount, 18);
  } else {
    displayCurrency = currencyPair.substring(0, currencyPair.indexOf('-'));
    //TODO Il faut intégrer la devise de paiement quelque part. On n'affiche que la devise Fiat
    const paymentCurrency = tokens.find((token) => token.address === paymentToken);
  }
  let convertInterval = '0';
  // rentAmount = FixedNumber.from(rentAmount).round(2).toString();
  if(rentPaymentInterval){
    convertInterval = formatDuration(intervalToDuration({ start: 0, end: Number(rentPaymentInterval) * 1000 })); // 30days
  }
  return `${rentAmount} ${displayCurrency} / ${convertInterval}`;
};

export const Tenant = () => {
  const navigate = useNavigate();
  const { profile } = useUser();
  const tenantLeases = useLeasesByTenantId(profile?.tenant?.id as string);
  console.log("Tenant.tsx: tenantLeases", tenantLeases);
  console.log("Tenant.tsx: profile", profile);
  const lastLease = tenantLeases[0];

  let formerLeases = tenantLeases.filter(lease => lease.status === LeaseStatus.ENDED || lease.status === LeaseStatus.CANCELLED);
  // const lastLease = tenantLeases;

  console.log("Tenant.tsx: lastLease", lastLease);
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
            cancellationRequestedByOwner={lastLease.cancelledByOwner}
            cancellationRequestedByTenant={lastLease.cancelledByTenant}
            userType={UserType.TENANT}
          />
        }
      />

      <Typography variant="h4" marginTop={4} marginBottom={4}>
        Former Leases
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          gap: "16px",
        }}
      >
        {formerLeases.length !== 0 ? formerLeases.map((lease: Lease) => (
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
        )) :
        "You don't have any former lease"}
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
