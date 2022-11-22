import React, { useContext } from "react";
import { Box, Typography } from "@mui/material";
import { Web3Button } from "@web3modal/react";
import { SignupForm } from "./SignupForm/SignupForm";
import TrustUserContext from "../../../context/user";

export const SignUp = () => {
  const { user, address } = useContext(TrustUserContext);
  return !address ? (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: 28
      }}
    >
      <Typography variant="h2">
        Veuillez connecter votre portefeuille crypto
      </Typography>

      <Box sx={{ margin: 12 }}>
        <Web3Button />
      </Box>
    </Box>
  ) : (
    <SignupForm address={address} />
  );
};
