import { useEffect, useState } from "react";
import { Alert, Box, Button, Container, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import { FormBlock } from "./FormBlock";
import { FinalBlock } from "./FinalBlock";
import { useTrust } from "../../../../contexts/TrustContext";
import { Layout } from "../../../../commons/components/Layout";
import { useUser } from "../../../../contexts/UserContext";
import { UserType } from "../../../../../../shared/types/UserAPI";
import { Owner, Tenant } from "../../../../repositories/TrustAPI";
import {mintOwnerId, mintTenantId} from "../../../../contracts/utils";

export interface UserForm {
  type: UserType
  name: string
}

export const SignUp = () => {
  const { address, hasProfile, setProfile, signer } = useUser();
  const $api = useTrust();

  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState<Partial<UserForm>>({});

  const handleSubmit = async () => {
    const { type, name } = values
    if (type === undefined || !address || !name) { return }
    setLoading(true);
    try {
      if (type === UserType.Tenant) {
        await mintTenantId(signer,name);
      } else if (type === UserType.Owner) {
        await mintOwnerId(signer,name);
      }
      // if (user) {
      //   switch (type) {
      //     case UserType.Owner:
      //       setProfile({ owner: user as Owner })
      //       break;
      //     case UserType.Tenant:
      //       setProfile({ tenant: user as Tenant })
      //       break;
      //
      //   }
        navigate("/dashboard")
      // }
    } catch (error) {
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
              padding: "80px 0px",
            }}
          >
            <Typography variant="h2" sx={{ textAlign: "center" }}>
              Qui êtes-vous?
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
