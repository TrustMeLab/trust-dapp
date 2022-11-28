import React from "react";

import { Box, Container, Typography } from "@mui/material";

import { Lease, UserType } from "../../../../repositories/TrustAPI/types";
import { LargeCard } from "../../../../commons/components/LargeCard";
import {
  returnPaymentInTokenInfos,
  returnPeriod,
  returnRentInfos,
  returnTitle,
} from "../../pages/Tenant";
import { ButtonsLatestLeases } from "../Tenant/ButtonsLatestLeases";
import { useNavigate } from "react-router-dom";

interface LeasesDisplay {
  leases: Lease[];
}

export const LeasesDisplay = ({ leases }: LeasesDisplay) => {
  const navigate = useNavigate();
  console.log("LeasesDisplay : ", leases);

  return (
    <Container>
      {leases.length === 0 ? (
        <Typography sx={{ margin: "32px", texAlign: "center" }}>
          You don't have any active leases
        </Typography>
      ) : (
        <Box
          sx={{
            marginTop: "32px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "30px",
          }}
        >
          {leases.map((lease) => (
            <LargeCard
              title={returnTitle(lease.status)}
              period={returnPeriod(
                lease.startDate,
                lease.rentPaymentInterval,
                lease.totalNumberOfRents
              )}
              paymentToken={returnPaymentInTokenInfos(lease.currencyPair)}
              rentInfos={returnRentInfos(
                lease.rentAmount,
                lease.currencyPair,
                lease.rentPaymentInterval,
                lease.totalNumberOfRents,
                lease.paymentToken
              )}
              lease={lease}
              generalInfo={`Tenant : ${lease.tenant.handle}`}
              remarks={
                lease.status === "CANCELLED"
                  ? `Cancellation requested`
                  : undefined
              }
              buttons={
                <ButtonsLatestLeases
                  leaseId={lease.id}
                  leaseStatus={lease.status}
                  tenantReviewUri={lease.tenantReviewUri}
                  ownerReviewUri={lease.ownerReviewUri}
                  userType={UserType.OWNER}
                  cancellationRequestedByOwner={lease.cancelledByOwner}
                  cancellationRequestedByTenant={lease.cancelledByTenant}
                />
              }
              handleClick={() => navigate(`${lease.id}`)}
            />
          ))}
        </Box>
      )}
    </Container>
  );
};
