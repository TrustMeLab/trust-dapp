import React, { useEffect } from "react";
import {
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import { useUser } from "../../../contexts/UserContext";
import avatar from "/src/assets/profile_picture.png";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import FingerprintIcon from "@mui/icons-material/Fingerprint";
import NumbersIcon from "@mui/icons-material/Numbers";
import HouseIcon from "@mui/icons-material/House";
import { Lease, Tenant } from "../../../repositories/TrustAPI/types";
import { ColoredTypography } from "../../../commons/components/ColoredTypography";
import useTotalLeaseCount from "../../../hooks/useTotalLeaseCount";

interface ProfileInfos {
  info: string;
  data: any;
}

type DetailsInfos = Partial<Tenant>;

export const Profile = () => {
  const { profile } = useUser();
  const leaseCount = useTotalLeaseCount(profile?.owner?.id as string, profile?.tenant?.id as string);

  const navigate = useNavigate();

  let tenantInfos: Array<ProfileInfos> | [] = [];
  let ownerInfos: Array<ProfileInfos> | [] = [];

  const generateInfos = (
    info: DetailsInfos,
    leaseCount: number
  ): ProfileInfos[] => {
    return Object.entries(info).map((el) => {
      if (el[1] === "hasLease")
        console.log("el",el);
      {
        return {
          info: "Number of leases", data: leaseCount,
        }
      };

      return {
        info: el[0] === "handle" ? "name" : el[0],
        data:
          el[1].toString().charAt(0).toUpperCase() + el[1].toString().slice(1),
      };
    });
  };

  if (leaseCount?.tenantLeases && profile.tenant) {
    // const {...restTenant } = profile.tenant;
    tenantInfos = generateInfos(profile.tenant, leaseCount.tenantLeases);
  }

  if (leaseCount?.ownerLeases && profile.owner) {
    // const { leases: leasesOwner, ...restOwner } = profile?.owner;
    ownerInfos = generateInfos(profile.owner, leaseCount.ownerLeases);
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
          sx={{ width: 400, height: 400, marginRight: "80px" }}
        />
        <Box sx={{ display: "flex" }}>
          <Grid item xs={12} md={6}>
            <Typography
              sx={{ mt: 4, mb: 2, marginBottom: "42px" }}
              variant="h3"
              component="div"
            >
              General <ColoredTypography>informations</ColoredTypography>
            </Typography>

            {tenantInfos.length > 0 && (
              <List
                sx={{
                  display: "flex",
                  gap: "42px",
                  alignItems: "center",
                  marginBottom: "60px",
                }}
              >
                <Box>
                  <Typography>Tenant Infos</Typography>
                  <Divider />
                  {tenantInfos.map((el: any) => (
                    <ListItem>
                      <ListItemIcon>{generateIcon(el.info)} </ListItemIcon>
                      <ListItemText
                        primary={el.info}
                        secondary={el.data ?? null}
                      />
                    </ListItem>
                  ))}
                </Box>

                <Button
                  variant="contained"
                  sx={{ height: "60px" }}
                  onClick={() => navigate("/dashboard/tenant/leases")}
                >
                  Go to Tenant dashboard
                </Button>
              </List>
            )}
            {ownerInfos.length > 0 && (
              <List sx={{ display: "flex", gap: "42px", alignItems: "center" }}>
                <Box>
                  <Typography>Owner Infos</Typography>
                  <Divider />

                  {ownerInfos.map((el: any) => (
                    <ListItem>
                      <ListItemIcon>{generateIcon(el.info)} </ListItemIcon>
                      <ListItemText
                        primary={el.info}
                        secondary={el.data ?? null}
                      />
                    </ListItem>
                  ))}
                </Box>
                <Button
                  variant="contained"
                  sx={{ height: "60px" }}
                  onClick={() => navigate("/dashboard/owner/leases")}
                >
                  Go to Owner dashboard
                </Button>
              </List>
            )}
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};
