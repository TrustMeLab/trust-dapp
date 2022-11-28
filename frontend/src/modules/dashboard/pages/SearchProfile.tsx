import React from "react";
import {
  Autocomplete,
  Box,
  Divider,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import mocksTenants from "../../../mocksTenants.json";
import { ColoredTypography } from "../../../commons/components/ColoredTypography";
import TenantIcon from "../../../assets/tenant_icon.png";
import OwnerIcon from "../../../assets/owner_icon.png";

export const SearchProfile = () => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        margin: "auto",
        display: "flex",
        gap: "60px",
        justifyContent: "space-around",
      }}
    >
      <Box sx={{ flex: 1 }}>
        <Typography variant="h3" marginBottom={"32px"}>
          Search for a <ColoredTypography>Tenant</ColoredTypography>
        </Typography>
        <Autocomplete
          disablePortal
          id="tenants"
          fullWidth
          options={mocksTenants.tenants}
          getOptionLabel={(option) => option.handle}
          onChange={(event, newValue: any) => {
            navigate(`${newValue.id}`, {
              state: { profile: "tenant", id: newValue.id },
            });
          }}
          renderInput={(params: any) => {
            return (
              <Box
                sx={{
                  display: "flex",
                  gap: "32px",
                  alignItems: "center",
                }}
              >
                <img src={TenantIcon} style={{ width: "150px" }} />

                <TextField
                  {...params}
                  label="Enter a name..."
                  variant="outlined"
                />
              </Box>
            );
          }}
        />
      </Box>
      <Divider sx={{ margin: "60px 0px" }} />
      <Box sx={{ flex: 1 }}>
        <Typography variant="h3" marginBottom={"32px"}>
          Search for an <ColoredTypography>Owner</ColoredTypography>
        </Typography>
        <Autocomplete
          disablePortal
          id="tenants"
          options={mocksTenants.tenants}
          getOptionLabel={(option) => option.handle}
          onChange={(event, newValue: any) => {
            navigate(`${newValue.id}`, { state: { profile: "owner" } });
          }}
          renderInput={(params: any) => {
            return (
              <Box
                sx={{
                  display: "flex",
                  gap: "32px",
                  alignItems: "center",
                }}
              >
                <img src={OwnerIcon} style={{ width: "150px" }} />
                <TextField
                  {...params}
                  label="Enter a name..."
                  variant="outlined"
                />
              </Box>
            );
          }}
        />
      </Box>
    </Box>
  );
};
