import React, { useState } from "react";
import { Alert, Box, Button, Typography } from "@mui/material";
import { Web3Button } from "@web3modal/react";
import { Container } from "@mui/system";
import { FormBlock } from "./FormBlock";
import { useNavigate } from "react-router-dom";
import { Repository } from "../../../../repositories";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { FinalBlock } from "./FinalBlock";

interface SignUpProps {
  address: string;
}
export const SignupForm = ({ address }: SignUpProps) => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [error, setError] = useState("");
  const [values, setValues] = useState({
    title: "",
    name: "",
  });

  const handleSubmit = async () => {
    const helper = Repository();
    try {
      const result = await helper.createProfile({ ...values, address });
      if (result) navigate("/dashboard");
    } catch (error) {
      setError("Une erreur est survenue");
    }
  };

  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          marginBottom: "16px",
        }}
      >
        <Box
          sx={{
            border: 1,
            borderRadius: "10px",
            padding: "10px",
            margin: "10px 0px",
          }}
        >
          {address}
        </Box>
        <Web3Button />
      </Box>
      {step === 0 ? (
        <>
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
        </>
      ) : (
        step === 1 && (
          <>
            <Button
              variant="outlined"
              startIcon={<ArrowBackIcon />}
              onClick={() => setStep(0)}
              sx={{
                margin: "10px 0px",
              }}
            >
              Back
            </Button>
            <Typography variant="h2" sx={{ textAlign: "center" }}>
              Merci! Afin de créer votre compte, veuillez entrer les
              informations suivantes:
            </Typography>
            <FinalBlock
              handleSubmit={handleSubmit}
              values={values}
              setValues={setValues}
            />
          </>
        )
      )}
      {error && <Alert severity="error">{error}</Alert>}
    </Container>
  );
};
