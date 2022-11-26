import React, { useState } from "react";
import { Box, Container } from "@mui/material";
import { Layout } from "../../../commons/components/Layout";
import { LeftMenu } from "../components/Owner/LeftMenu";
import { LeasesDisplay } from "../components/Owner/LeasesDisplay";
// import useOwnerLeases from "../../../hooks/useOwnerLeases";
import { useUser } from "../../../contexts/UserContext";
import { CreateLeaseButton } from "../components/Owner/CreateLeaseButton";
import { Lease, LeaseStatus } from "../../../repositories/TrustAPI/types";
import useLeasesByTenantId from "../../../hooks/useTenantLeases";

export const Owner = () => {
  const [activeTabMenu, setActiveTabMenu] = useState(0);
  const { address } = useUser();
  // const leases = address && useOwnerLeases(address);
  const leases = ownerLeases;

  const activeLeases =
    leases &&
    leases.length > 0 &&
    leases.filter(
      (lease: Lease) =>
        lease.status === (LeaseStatus.ACTIVE || LeaseStatus.PENDING)
    );

  const archivedLeases =
    leases &&
    leases.length > 0 &&
    leases.filter(
      (lease: Lease) =>
        lease.status === (LeaseStatus.ENDED || LeaseStatus.CANCELLED)
    );

  const leasestoRender = activeTabMenu === 0 ? activeLeases : archivedLeases;

  // useEffect(() => {
  //   if (activeTabMenu === 0) {
  //     setLeasesToRender(activeLeases);
  //   } else setLeasesToRender(archivedLeases);
  // }, [activeTabMenu]);

  return (
    <Box sx={{ display: "flex", gap: "18px" }}>
      <LeftMenu activeTab={activeTabMenu} setActiveTab={setActiveTabMenu} />
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <CreateLeaseButton />
        <LeasesDisplay leases={leasestoRender} />
      </Container>
    </Box>
  );
};

const ownerLeases: any = [
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
