import React, {useState} from "react";
import {Box, Container} from "@mui/material";
import {LeftMenu} from "../components/Owner/LeftMenu";
import {useUser} from "../../../contexts/UserContext";
import {CreateLeaseButton} from "../components/Owner/CreateLeaseButton";
import {Lease, LeaseStatus} from "../../../repositories/TrustAPI/types";
import useOwnerLeases from "../../../hooks/useOwnerLeases";
import {LeasesDisplay} from "../components/Owner/LeasesDisplay";

export const Owner = () => {
  const [activeTabMenu, setActiveTabMenu] = useState(0);
  const { profile } = useUser();
  const leases = useOwnerLeases(profile.owner?.id as string);
  // const leases = leasesMock.leases;
  console.log("Leases : ", leases);
  const activeLeases =
    leases &&
    leases.length > 0 &&
    leases.filter(
      (lease: Lease) =>
        (LeaseStatus.ACTIVE || LeaseStatus.PENDING) === lease.status
    );

  const archivedLeases =
    leases &&
    leases.length > 0 &&
    leases.filter(
      (lease: Lease) =>
        //TODO Spé, le check ne marche pas si on change l'ordre des énums
        (LeaseStatus.ENDED || LeaseStatus.CANCELLED) === lease.status
    );

  console.log("activeLeases : ", activeLeases);
  console.log("archivedLeases : ", archivedLeases);
  const leasesToRender = activeTabMenu === 0 ? activeLeases : archivedLeases;
  console.log("Leases to render: ", leasesToRender);

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
        {leases && archivedLeases && leasesToRender && <LeasesDisplay leases={leasesToRender}/>}
      </Container>
    </Box>
  );
};
