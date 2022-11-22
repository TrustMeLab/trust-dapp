import React, { useContext, useEffect, useState } from "react";
import { Alert, Box, Button, Typography, Container } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import { Web3Button } from "@web3modal/react";
import { FormBlock } from "./FormBlock";
import { FinalBlock } from "./FinalBlock";
import TrustUserContext from "../../../../context/user";
import { useTrust } from "../../../../contexts/TrustContext";

export const SignUp = () => {
  const { address } = useContext(TrustUserContext);
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({
    title: "",
    name: "",
  });
  const handleSubmit = async () => {
    const $api = useTrust();
    setLoading(true);
    try {
      if (!address) navigate("/login");
      else {
        const result = await $api.createProfile({ ...values, address });
        if (result) navigate("/dashboard");
      }
    } catch (error) {
      setError("Une erreur est survenue");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!address) navigate("/login");
  }, [address]);

  return (
    <Container maxWidth="xl">
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          marginBottom: "16px",
        }}
      >
        <Box
          sx={{
            border: 1,
            borderRadius: "10px",
            padding: "10px 16px",
            margin: "10px ",
          }}
        >
          {address}
        </Box>
        <Web3Button />
      </Box>
      {step === 0 ? (
        <Box
          sx={{
            padding: "80px 0px",
          }}
        >
          <Typography variant="h2" sx={{ textAlign: "center" }}>
            Qui êtes-vous?
          </Typography>
          <FormBlock
            handleTenant={() => {
              setValues((prev) => ({ ...prev, title: "tenant" }));
              setStep(1);
            }}
            handleOwner={() => {
              setValues((prev) => ({ ...prev, title: "owner" }));
              setStep(1);
            }}
          />
        </Box>
      ) : (
        step === 1 && (
          <>
            <Button
              variant="outlined"
              startIcon={<ArrowBackIcon />}
              onClick={() => {
                setStep(0);
                setError("");
              }}
            >
              Back
            </Button>
            <Typography
              variant="h2"
              sx={{ textAlign: "center", margin: "42px 0px" }}
            >
              Merci! Afin de créer votre compte, veuillez entrer les
              informations suivantes:
            </Typography>
            <FinalBlock
              handleSubmit={handleSubmit}
              values={values}
              setValues={setValues}
              loading={loading}
            />
          </>
        )
      )}
      {error && <Alert severity="error">{error}</Alert>}
    </Container>
  );
};
