import React, { Fragment } from "react";
import { Box, Typography } from "@mui/material";
import { LargeCard } from "../../../commons/components/LargeCard";
import { useNavigate } from "react-router-dom";
import {
  Lease,
  LeaseStatus,
  UserType,
} from "../../../repositories/TrustAPI/types";
import { format, formatDuration, intervalToDuration } from "date-fns";
import { useUser } from "../../../contexts/UserContext";
import { ButtonsLatestLeases } from "../components/Tenant/ButtonsLatestLeases";
import { tokens } from "../../../const";
import { ethers } from "ethers";
import useLeasesByTenantId from "../../../hooks/useTenantLeases";
import { SmallCard } from "../../../commons/components/SmallCard";

export const returnTitle = (leaseStatus: LeaseStatus) => {
  if (leaseStatus === (LeaseStatus.ENDED || LeaseStatus.CANCELLED))
    return "Lease ended";
  if (leaseStatus === (LeaseStatus.PENDING))
    return "Pending lease";
  return "Your current Lease";
};

export const returnPeriod = (
  startDate: number | string,
  rentPaymentInterval: string,
  totalNumberOfRents: string
) => {
  const debutDate = format(new Date(Number(startDate) * 1000), "dd/MM/yyyy");
  const endDate = format(
    new Date(
      (Number(startDate) +
      Number(rentPaymentInterval) * Number(totalNumberOfRents)) * 1000
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
  if (currencyPair === "CRYPTO") {
    const token = tokens.find((token) => token.address === paymentToken);
    displayCurrency = token?.name || "";
    rentAmount = ethers.utils.formatEther(rentAmount);
  } else {
    displayCurrency = currencyPair.substring(0, currencyPair.indexOf("-"));
    //TODO Il faut intégrer la devise de paiement quelque part. On n'affiche que la devise Fiat
    const paymentCurrency = tokens.find(
      (token) => token.address === paymentToken
    );
  }
  let convertInterval = "0";
  // rentAmount = FixedNumber.from(rentAmount).round(2).toString();
  if (rentPaymentInterval) {
    convertInterval = formatDuration(
      intervalToDuration({ start: 0, end: Number(rentPaymentInterval) * 1000 })
    ); // 30days
  }
  return `${rentAmount} ${displayCurrency} / ${convertInterval}`;
};

export const Tenant = () => {
  const navigate = useNavigate();
  const { profile } = useUser();
  const tenantLeases = useLeasesByTenantId(profile?.tenant?.id as string);


  let formerLeases = tenantLeases.filter(
    (lease) =>
      lease.status === LeaseStatus.ENDED ||
      lease.status === LeaseStatus.CANCELLED
  );
  const pendingLeases = tenantLeases.filter(lease => lease.status === LeaseStatus.PENDING);
  const activeLease = tenantLeases.filter(lease => lease.status === LeaseStatus.ACTIVE)[0];
  console.log("Tenant.tsx: activeLease", activeLease);
  console.log("Tenant.tsx: pendingLease", pendingLeases);
  console.log("Tenant.tsx: formerLeases", formerLeases);

  return(
  <Fragment>
    {!activeLease && <Typography variant="h4" marginTop={4} marginBottom={4}>
      You don't have an active lease
    </Typography>}


    {activeLease && <LargeCard
      title={returnTitle(activeLease.status)}
      period={returnPeriod(activeLease.startDate, activeLease.rentPaymentInterval, activeLease.totalNumberOfRents)}
      rentInfos={returnRentInfos(activeLease.rentAmount, activeLease.currencyPair, activeLease.rentPaymentInterval, activeLease.totalNumberOfRents, activeLease.paymentToken)}
      lease={activeLease}
      generalInfo={`Owner : ${activeLease.tenant.handle}`}
      remarks={activeLease.status === "CANCELLED" ? `Cancellation requested` : undefined}
      handleClick={() => navigate(`/dashboard/tenant/leases/${activeLease.id}`)}
      buttons={<ButtonsLatestLeases
        leaseId={activeLease.id}
        leaseStatus={activeLease.status}
        reviewUri={activeLease.tenantReviewUri}
        cancellationRequestedByOwner={activeLease.cancelledByOwner}
        cancellationRequestedByTenant={activeLease.cancelledByTenant}
        userType={UserType.TENANT}
      />}
    />}

    <Typography variant="h4" marginTop={4} marginBottom={4}>
      Pending Leases
    </Typography>

    {pendingLeases && pendingLeases.map(lease => <LargeCard
      title={returnTitle(lease.status)}
      period={returnPeriod(lease.startDate, lease.rentPaymentInterval, lease.totalNumberOfRents)}
      rentInfos={returnRentInfos(lease.rentAmount, lease.currencyPair, lease.rentPaymentInterval, lease.totalNumberOfRents, lease.paymentToken)}
      lease={lease}
      generalInfo={`Owner : ${lease.tenant.handle}`}
      remarks={lease.status === "CANCELLED" ? `Cancellation requested` : undefined}
      handleClick={() => navigate(`/dashboard/tenant/leases/${lease.id}`)}
      buttons={<ButtonsLatestLeases
        leaseId={lease.id}
        leaseStatus={lease.status}
        reviewUri={lease.tenantReviewUri}
        cancellationRequestedByOwner={lease.cancelledByOwner}
        cancellationRequestedByTenant={lease.cancelledByTenant}
        userType={UserType.TENANT}
      />}
    />)}

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
          {formerLeases.length !== 0
            ? formerLeases.map((lease: Lease) => (
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
                  handleClick={() =>
                    navigate(`/dashboard/tenant/leases/${lease.id}`)
                  }
                />
              ))
            : "You don't have any former lease"}
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
