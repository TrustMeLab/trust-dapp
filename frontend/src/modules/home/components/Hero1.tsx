import { Box, Button } from "@mui/material";
import { useTheme } from "@mui/material";

import Image from "mui-image";

export default function Hero1() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        color: "#ffffff",
        height: "42em",
        bgcolor: theme.palette.primary.main,
        boxShadow: 3,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "40%",
        }}
      >
        <Box sx={{ mt: "-1em", mb: "-1em", fontSize: "3em" }}>
          <h2>Trust.Me</h2>
        </Box>
        <Image src="/tenant_owner.png" height="30%" fit="contain" />
        <Box sx={{ fontSize: "1.5em" }}>
          <h3>Rental management tool</h3>
        </Box>
        <Box
          sx={{
            mb: "1em",
            fontSize: "1.2em",
            textAlign: "center",
          }}
        >
          Provide to both tenants and owners, a transparent, thrustless &
          decentralized way to:
          <br />
          Prove a clean track record of all the tenant’s payments
          <br />
          Pay & receive periodic rent payments through the smart contracts
          <br />
          Evaluate both tenant & owner each other at the end of your lease.
        </Box>
      </Box>
    </Box>
  );
}
