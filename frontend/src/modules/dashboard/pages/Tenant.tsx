import React, { useEffect, useState } from "react";
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

export const Tenant = () => {
  const navigate = useNavigate();
  const $api = useTrust();
  const { profile } = useUser();
  // const [tenantLeases ,setTenantLeases] = useState<Lease[]>([]);

  // const getAllLeasesFromTenant = async () => {
  //   if (profile.tenant) {
  //     const result = await $api.getTenantLeases(profile?.tenant?.address);
  //     setTenantLeases(result);
  //   }
  // };

  const lastLease = tenantLeases[0];
  const returnTitle = (leaseStatus: LeaseStatus) => {
    if (leaseStatus === (LeaseStatus.ENDED || LeaseStatus.CANCELLED))
      return "Bail terminé";
    return "Votre bail en cours";
  };

  const returnPeriod = (
    startDate: number | string,
    rentPaymentInterval: number,
    totalNumberOfRents: number
  ) => {
    const debutDate = format(new Date(Number(startDate)), "dd/MM/yyyy");
    const endDate = format(
      new Date(Number(startDate) + rentPaymentInterval * totalNumberOfRents),
      "dd/MM/yyyy"
    );

    return `${debutDate} - ${endDate}`;
  };

  const returnRentInfos = (
    rentAmount: number,
    currencyPair: string = "USD",
    rentPaymentInterval: number,
    totalNumberOfRents: number
  ) => {
    const convertInterval = formatDuration(
      intervalToDuration({ start: 0, end: rentPaymentInterval * 1000 })
    ); // 30days
    console.log("convertinterval>>>>", convertInterval);
    return `${rentAmount} ${currencyPair}/ ${convertInterval}`;
  };

  useEffect(() => {
    // getAllLeasesFromTenant();
  }, []);

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
          period={returnPeriod(
            lastLease.startDate,
            lastLease.rentPaymentInterval,
            lastLease.totalNumberOfRents
          )}
          rentInfos={returnRentInfos(
            lastLease.rentAmount,
            lastLease.currencyPair,
            lastLease.rentPaymentInterval,
            lastLease.totalNumberOfRents
          )}
          generalInfo={`Owner : ${lastLease.tenant.handle}`}
          remarks={
            lastLease.status === "CANCELLED"
              ? `Cnacellation requested`
              : undefined
          }
          handleClick={() =>
            navigate(`/dashboard/tenant/lease/${lastLease.id}`)
          }
          buttons={
            <ButtonsLatestLeases
              leaseId={lastLease.id}
              leaseStatus={"PENDING" as any}
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
                lease.totalNumberOfRents
              )}
              period={returnPeriod(
                lease.startDate,
                lease.rentPaymentInterval,
                lease.totalNumberOfRents
              )}
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
const tenantLeases: any = [
  {
    id: "1",
    paymentToken: "0x0000000000000000000000000000000000000000",
    ownerReviewUri: null,
    rentAmount: "500000",
    rentPaymentInterval: "2592000",
    rentPaymentLimitTime: "5184000",
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
