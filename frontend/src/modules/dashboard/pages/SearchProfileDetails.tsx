import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Rating,
  Typography,
  useTheme,
} from "@mui/material";
import { useParams, useLocation } from "react-router-dom";

import mocksTenants from "../../../mocksTenants.json";
import { ColoredTypography } from "../../../commons/components/ColoredTypography";

import { Lease, Owner, Tenant } from "../../../repositories/TrustAPI";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import FingerprintIcon from "@mui/icons-material/Fingerprint";

// import useReviewDetails from "../../../hooks/useReviewDetails";

export const SearchProfileDetails = () => {
  const [loading, setLoading] = useState(false);
  const [profileReview, setProfileReview] = useState<
    Partial<Tenant> | Partial<Owner>
  >({});
  const theme = useTheme();
  const location = useLocation();
  const { id } = useParams();

  console.log("prams>ID>", id);

  const handleProfile = () => {
    // const renderProfile = useReview(location.state.id, location.state.profile); //TODO: DECOMMENT
    const renderInfosProfile = mocksTenants.tenants.find(
      (el) => el.id === id
    ) as any;
    setProfileReview({ ...renderInfosProfile });
    setLoading(false);
  };

  const handleScore = (lease: Lease) => {
    const payments = lease.rentPayments;
    const paid = payments.filter((payment: any) => payment.status === "PAID");
    const final = payments.length ? paid.length / payments.length : 1;
    return Math.round(final * 5 * 10) / 10;
  };
  useEffect(() => {
    handleProfile();
  }, []);

  return (
    <Container maxWidth="xl">
      {loading ? (
        <Box>Loading...</Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Avatar
            alt="avatar"
            src={profileReview.uri || "/src/assets/doggo_1.png"}
            sx={{ width: 400, height: 400, marginRight: "100px" }}
          />
          <Box sx={{ display: "flex" }}>
            <Grid item xs={12} md={6}>
              <Typography
                sx={{ mt: 4, mb: 2, marginBottom: "42px" }}
                variant="h3"
                component="div"
              >
                General{" "}
                {location.state.profile === "tenant" ? "Tenant" : "Owner"}
                <ColoredTypography> informations</ColoredTypography>
              </Typography>

              {profileReview &&
                profileReview.leases &&
                (profileReview.leases.length === 0 ? (
                  <Box>This user doesn't have any leases</Box>
                ) : (
                  <List
                    sx={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Box>
                      <ListItem>
                        <ListItemIcon>
                          <PermIdentityIcon />
                        </ListItemIcon>
                        <ListItemText
                          primary={"Name"}
                          secondary={profileReview.handle}
                        />
                      </ListItem>
                      <ListItem sx={{ marginBottom: "30px" }}>
                        <ListItemIcon>
                          <FingerprintIcon />
                        </ListItemIcon>
                        <ListItemText
                          primary={"Address"}
                          secondary={profileReview.address}
                        />
                      </ListItem>

                      {profileReview.leases.map((lease: any) => (
                        <Card
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            marginBottom: "32px",
                            minWidth: "800px",
                          }}
                        >
                          <CardContent
                            sx={{
                              padding: "30px",
                              display: "flex",
                              gap: "50px",
                              alignItems: "center",
                            }}
                          >
                            <Box>
                              <Rating
                                name="read-only"
                                value={handleScore(lease)}
                                readOnly
                              />
                              <Typography
                                variant="h5"
                                sx={{ fontWeight: "bold" }}
                              >
                                Lease id n° {lease.id}
                              </Typography>
                              <Typography sx={{}}>
                                Status: {lease.status}
                              </Typography>
                              <Typography>
                                Owner : {lease.owner.handle}
                              </Typography>
                            </Box>

                            <Box
                              sx={{
                                fontStyle: "italic",
                                fontWeight: "light",
                                color: theme.palette.text.secondary,
                              }}
                            >
                              " {lease.tenantReviewUri} "
                            </Box>
                          </CardContent>
                        </Card>
                      ))}
                    </Box>
                  </List>
                ))}
            </Grid>
          </Box>
        </Box>
      )}
    </Container>
  );
};
