import React, { useState } from "react";
import { Box, Container } from "@mui/material";
import { LeftMenu } from "../components/Owner/LeftMenu";
import { LeasesDisplay } from "../components/Owner/LeasesDisplay";
// import useOwnerLeases from "../../../hooks/useOwnerLeases";
import { useUser } from "../../../contexts/UserContext";
import { CreateLeaseButton } from "../components/Owner/CreateLeaseButton";
import { Lease, LeaseStatus } from "../../../repositories/TrustAPI/types";
import leasesMock from "../../../mockLeases.json";

export const Owner = () => {
  const [activeTabMenu, setActiveTabMenu] = useState(0);
  const { address } = useUser();
  // const leases = address && useOwnerLeases(address);
  const leases = leasesMock.leases;

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
