import { useEffect, useState } from "react";
import { Alert, Box, Button, Container, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import { FormBlock } from "./FormBlock";
import { FinalBlock } from "./FinalBlock";
import { useTrust } from "../../../../contexts/TrustContext";
import { Layout } from "../../../../commons/components/Layout";
import { useUser } from "../../../../contexts/UserContext";
import { mintOwnerId, mintTenantId } from "../../../../contracts/utils";

export enum UserType {
  Owner,
  Tenant
}

export interface UserForm {
  type: UserType;
  name: string;
}

export const SignUp = () => {
  const { address, hasProfile, setProfile, signer } = useUser();
  const $api = useTrust();

  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState<Partial<UserForm>>({});

  const handleSubmit = async () => {
    const { type, name } = values;
    if (type === undefined || !address || !name || !signer) {
      return;
    }
    setLoading(true);
    try {
      switch (type) {
        case UserType.Tenant:
          await mintTenantId(signer, name);
          break;
        case UserType.Owner:
          await mintOwnerId(signer, name);
          break;
      }
      navigate("/dashboard");
    } catch (error) {
      console.log("Error Minting Id", error);
      setError("Une erreur est survenue");
    } finally {
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
              padding: "80px",
            }}
          >
            <Typography variant="h2" sx={{ textAlign: "center" }}>
              Who are you?
            </Typography>
            <FormBlock
              handleTenant={() => {
                setValues((prev) => ({ ...prev, type: UserType.Tenant }));
                setStep(1);
              }}
              handleOwner={() => {
                setValues((prev) => ({ ...prev, type: UserType.Owner }));
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
                To create your account, please enter your name :
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
