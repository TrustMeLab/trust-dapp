import React, { useEffect } from "react";
import {
  Avatar,
  Box,
  Card,
  Container,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import { useUser } from "../../../contexts/UserContext";
import avatar from "/src/assets/avatar_logo.jpg";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import FingerprintIcon from "@mui/icons-material/Fingerprint";
import NumbersIcon from "@mui/icons-material/Numbers";
import HouseIcon from "@mui/icons-material/House";
import { Lease, Tenant, Owner } from "../../../repositories/TrustAPI/types";

interface ProfileInfos {
  info: string;
  data: any;
}

type DetailsInfos = Partial<Tenant>;

export const Profile = () => {
  const { profile, hasProfile } = useUser();
  const navigate = useNavigate();

  let tenantInfos: Array<ProfileInfos> | [] = [];
  let ownerInfos: Array<ProfileInfos> | [] = [];

  const generateInfos = (
    info: DetailsInfos,
    leases: Lease[]
  ): ProfileInfos[] => {
    return Object.entries(info).map((el) => {
      if (el[0] === "hasLease")
        return {
          info: "Number of leases",
          data: leases.length > 0 ? leases.length : 0,
        };

      return {
        info: el[0] === "handle" ? "name" : el[0],
        data:
          el[1].toString().charAt(0).toUpperCase() + el[1].toString().slice(1),
      };
    });
  };

  if (profile.tenant) {
    const { leases: leasesTenant, ...restTenant } = profile.tenant;
    tenantInfos = profile.tenant && generateInfos(restTenant, leasesTenant);
  }

  if (profile.owner) {
    const { leases: leasesOwner, ...restOwner } = profile?.owner;
    ownerInfos = profile.owner && generateInfos(restOwner, leasesOwner);
  }

  const generateIcon = (info: string) => {
    switch (info) {
      case "name":
        return <PermIdentityIcon />;
      case "address":
        return <FingerprintIcon />;

      case "id":
        return <NumbersIcon />;
      case "Number of leases":
        return <HouseIcon />;

      default:
        break;
    }
  };
  return (
    <Container maxWidth="xl">
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Avatar
          alt="avatar"
          src={avatar}
          sx={{ width: 400, height: 400, marginRight: "42px" }}
        />
        <Box sx={{ display: "flex" }}>
          <Grid item xs={12} md={6}>
            <Typography sx={{ mt: 4, mb: 2 }} variant="h4" component="div">
              General informations
            </Typography>
            {tenantInfos.length > 0 && (
              <List>
                <Card>Tenant Infos</Card>

                {tenantInfos.map((el: any) => (
                  <ListItem>
                    <ListItemIcon>{generateIcon(el.info)} </ListItemIcon>
                    <ListItemText
                      primary={el.info}
                      secondary={el.data ?? null}
                    />
                  </ListItem>
                ))}
              </List>
            )}

            {ownerInfos.length > 0 && (
              <List>
                <Card>Owner Infos</Card>

                {ownerInfos.map((el: any) => (
                  <ListItem>
                    <ListItemIcon>{generateIcon(el.info)} </ListItemIcon>
                    <ListItemText
                      primary={el.info}
                      secondary={el.data ?? null}
                    />
                  </ListItem>
                ))}
              </List>
            )}
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};
