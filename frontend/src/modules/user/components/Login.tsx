import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Alert, Box, Typography } from "@mui/material";
import { Web3Button } from "@web3modal/react";
import TrustUserContext from "../../../context/user";
import { Repository } from "../../../repositories";

export const Login = () => {
  const [error, setError] = useState("");

  const { address } = useContext(TrustUserContext);

  const helper = Repository();
  const navigate = useNavigate();

  const handleProfile = async (addressAccount: string) => {
    const profile = await helper.getProfile(addressAccount);
    if (!profile.tenant && !profile.owner) {
      navigate("/sign-up");
    } else navigate("/dashboard");
  };
  useEffect(() => {
    if (!address) return;
    try {
      (async () => {
        await handleProfile(address);
      })();
    } catch (error) {
      setError("Une erreur est survenue, impossible de trouver le profil");
    }
  }, [address]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        padding: 28,
      }}
    >
      <Typography variant="h2">
        Veuillez connecter votre portefeuille crypto
      </Typography>

      <Box sx={{ margin: 12 }}>
        <Web3Button />
      </Box>
      {error && <Alert severity="error">{error}</Alert>}
    </Box>
  );
};
