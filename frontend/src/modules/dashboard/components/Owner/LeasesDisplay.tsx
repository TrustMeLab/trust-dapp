import React from "react";

import { Box, Container } from "@mui/material";

import { Lease } from "../../../../repositories/TrustAPI/types";
import { LargeCard } from "../../../../commons/components/LargeCard";
import { returnPeriod, returnRentInfos, returnTitle } from "../../pages/Tenant";
import { ButtonsLatestLeases } from "../Tenant/ButtonsLatestLeases";

interface LeasesDisplay {
  leases: Lease[];
}

export const LeasesDisplay = ({ leases }: LeasesDisplay) => {
  return (
    <Container>
      <Box
        sx={{
          marginTop: "32px",
          display: "flex",
          flexDirection: "column",
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
                ? `Cnacellation requested`
                : undefined
            }
            buttons={
              <ButtonsLatestLeases
                leaseId={lease.id}
                leaseStatus={lease.status}
                reviewUri={lease.uri}
              />
            }
          />
        ))}
      </Box>
    </Container>
  );
};
