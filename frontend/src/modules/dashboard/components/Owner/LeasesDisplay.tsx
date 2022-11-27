import React from "react";

import { Box, Container, Typography } from "@mui/material";

import { Lease } from "../../../../repositories/TrustAPI/types";
import { LargeCard } from "../../../../commons/components/LargeCard";
import { returnPeriod, returnRentInfos, returnTitle } from "../../pages/Tenant";
import { ButtonsLatestLeases } from "../Tenant/ButtonsLatestLeases";
import { useNavigate } from "react-router-dom";

interface LeasesDisplay {
  leases: Lease[];
}

export const LeasesDisplay = ({ leases }: LeasesDisplay) => {
  const navigate = useNavigate();

  return (
    <Container>
      {leases.length === 0 ? (
        <Typography>You don't have any active leases</Typography>
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
              handleClick={() => navigate(`${lease.id}`)}
            />
          ))}
        </Box>
      )}
    </Container>
  );
};
