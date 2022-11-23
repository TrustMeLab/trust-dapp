import React from "react";
import { Box, Typography } from "@mui/material";
import { LargeCard } from "../../../commons/components/LargeCard";
import { useNavigate } from "react-router-dom";
import { Container } from "@mui/system";
import { SmallCard } from "../../../commons/components/SmallCard";
import { Layout } from "../../../commons/components/Layout";
// import { useTrust } from "../../../contexts/TrustContext";

export const Tenant = () => {
  const navigate = useNavigate();
  // const $api = useTrust();
  // const { profile } = useProfile();

  const lastLease = profile.tenant.leases[0];
  const returnTitle = (leaseStatus: string) => {
    if (leaseStatus === ("ENDED" || "CANCELLED")) return "Bail";
    return "Votre bail en cours";
  };

  const returnPeriod = (startDate: string): string => {
    const debutDate = new Date(startDate);
    const endDate = new Date(startDate);

    return `${debutDate} - ${endDate}`;
  };

  const returnRentInfos = (amount: string, interval: string) => {
    const rentAmountByInterval = Number(amount) / Number(interval);
    return `${rentAmountByInterval} € / ${interval}j`;
  };

  return (
    <Layout activeTab="tenant">
      <Container
        sx={{
          margin: "32px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <LargeCard
          title={returnTitle(lastLease.status)}
          period={returnPeriod(lastLease.startDate)}
          rentInfos={returnRentInfos(
            lastLease.rentAmount,
            lastLease.rentPaymentInterval
          )}
          generalInfo={`Owner : ${lastLease.tenant.handle}`}
          remarks={
            lastLease.status === "CANCELLED"
              ? `Requested cancellation`
              : undefined
          }
          buttonTitle={"Request cancellation"}
          handleClick={() =>
            navigate(`/dashboard/tenant/lease/${lastLease.id}`)
          }
          handleClickButton={(e: React.MouseEvent) => {
            // const result = await $api.requestCancel( lastLease.id); //WIP
            e.stopPropagation();
          }}
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
          {profile.tenant.leases.map((lease) => (
            <SmallCard
              rentInfos={returnRentInfos(
                lease.rentAmount,
                lease.rentPaymentInterval
              )}
              period={returnPeriod(lease.startDate)}
              handleClick={() =>
                navigate(`/dashboard/tenant/lease/${lease.id}`)
              }
            />
          ))}
        </Box>
      </Container>
    </Layout>
  );
};

//Mock
const profile = {
  tenant: {
    id: "testId",
    address: "4x0jfezmf99zpl937",
    name: "José",
    leases: [
      {
        id: "1",
        paymentToken: "0x0000000000000000000000000000000000000000",
        ownerReviewUri: null,
        rentAmount: "500000",
        rentPaymentInterval: "0",
        rentPaymentLimitTime: "0",
        startDate: "1669113886",
        status: "ENDED",
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
        paymentToken: "0xf50ead67827fdf4fb8852c0ddfe4f17e88d34594",
        ownerReviewUri: null,
        rentAmount: "500000",
        rentPaymentInterval: "0",
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
    ],
  },
};
