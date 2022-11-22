import { useContext, useEffect, useState } from "react";
import { Alert, Box, Button, Typography, Container } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import { FormBlock } from "./FormBlock";
import { FinalBlock } from "./FinalBlock";
import TrustUserContext from "../../../../context/user";
import { useTrust } from "../../../../contexts/TrustContext";
import { Layout } from "../../../../commons/components/Layout";
import { useProfile } from "../../../../contexts/ProfileContext";

export const SignUp = () => {
  const { address } = useContext(TrustUserContext);
  const { hasProfile } = useProfile();
  const $api = useTrust();

  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({
    title: "",
    name: "",
  });
  const handleSubmit = async () => {
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
    if (hasProfile) navigate("/dashboard");
  }, [address]);

  return (
    <Layout>
      <Container maxWidth="xl">
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
    </Layout>
  );
};
