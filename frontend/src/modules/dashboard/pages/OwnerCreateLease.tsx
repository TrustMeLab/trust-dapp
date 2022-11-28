import React, { useState } from "react";
import {
  Alert,
  Box,
  Button,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import { Signer } from "ethers";
import { useNavigate } from "react-router-dom";

import mocksCryptoCurrencies from "../../../mocksCryptoCurrencies.json";

// import useTenants from "../../../hooks/useTenants";
import { FirstFormBlock } from "../components/Owner/FirstFormBlock";
import { SecondFormBlock } from "../components/Owner/SecondFormBlock";
import { ThirdFormBlock } from "../components/Owner/ThirdFormBlock";
import { createLease } from "../../../contracts/utils";
import { useUser } from "../../../contexts/UserContext";
import { ColoredTypography } from "../../../commons/components/ColoredTypography";

export interface CreateLeaseForm {
  signer: Signer;
  tenantId: string;
  rentAmount: string;
  totalNumberOfRents: string;
  paymentToken: string;
  rentPaymentInterval: string;
  rentPaymentLimitTime: string;
  currencyPair: string;
  startDate: string;
  paymentMethod: string;
  tenantInfo: { address: string; handle: string; id: string };
}

const steps = [
  "Choose your payment method",
  "Choose your preferred currencie(s)",
  "Complete rent details",
];

export const OwnerCreateLease = () => {
  const { signer } = useUser();
  const [activeStep, setActiveStep] = React.useState(0);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState<Partial<CreateLeaseForm>>({});

  console.log(values);

  const navigate = useNavigate();
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSubmit = async () => {
    const {
      currencyPair,
      rentAmount,
      tenantId,
      paymentMethod,
      rentPaymentInterval,
      rentPaymentLimitTime,
      totalNumberOfRents,
      startDate,
    } = values;

    const parsedCurrencyPair =
      paymentMethod === "crypto" ? "CRYPTO" : currencyPair;
    console.log("parsedCurrencyPair ", parsedCurrencyPair);
    let paymentToken;
    if (paymentMethod === "crypto") {
      paymentToken = mocksCryptoCurrencies.data.currencies.crypto.find(
        (el) => el.value === currencyPair
      )?.addressToken;
      console.log("paymentToken ", paymentToken);
    } else {
      paymentToken = mocksCryptoCurrencies.data.currencies.fiat.find(
        (el) => el.value === currencyPair
      )?.addressToken;
    }
    console.log("paymentToken ", paymentToken);
    console.log("rentAmount ", rentAmount);
    console.log("currencyPair ", currencyPair);

    const parseDateToSeconds = Math.floor(
      new Date(startDate as string).getTime() / 1000
    );

    const transformDurationToSeconds = (duration: string) => {
      switch (duration) {
        case "day":
          return 24 * 60 * 60;
        case "week":
          return 7 * 24 * 60 * 60;
        case "month":
          return 4 * 7 * 24 * 60 * 60;

        default:
          break;
      }
    };

    const formValues = {
      tenantId,
      rentAmount,
      totalNumberOfRents,
      paymentToken: paymentToken,
      rentPaymentInterval: transformDurationToSeconds(
        rentPaymentInterval as string
      ),
      rentPaymentLimitTime: transformDurationToSeconds(
        rentPaymentLimitTime as string
      ),
      currencyPair: parsedCurrencyPair,
      startDate: parseDateToSeconds,
      signer,
    };

    console.log(">>>>FORM VALUES>>", formValues);
    console.log("parsedCurrencyPair ", parsedCurrencyPair);
    setLoading(true);
    try {
      if (
        signer &&
        tenantId &&
        rentAmount &&
        totalNumberOfRents &&
        paymentToken &&
        rentPaymentInterval &&
        rentPaymentLimitTime &&
        parsedCurrencyPair &&
        parseDateToSeconds
      ) {
        await createLease(
          signer,
          tenantId,
          rentAmount,
          totalNumberOfRents,
          paymentToken,
          transformDurationToSeconds(rentPaymentInterval as string) as number,
          transformDurationToSeconds(rentPaymentLimitTime as string) as number,
          parsedCurrencyPair,
          parseDateToSeconds
        );
      }
      setActiveStep(activeStep + 1);
    } catch (error) {
      console.log("error", error);
      setError("Une erreur est survenue");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ margin: "auto", width: "60%" }}>
      <Typography variant="h3" align="center" gutterBottom>
        Create a <ColoredTypography>lease</ColoredTypography>
      </Typography>

      <Stepper activeStep={activeStep} sx={{ margin: "60px 0px" }}>
        {steps.map((label, index) => {
          const stepProps: { completed?: boolean } = {};

          return (
            <Step {...stepProps} key={index}>
              <StepLabel
                optional={
                  index === 0 ? (
                    <Typography>{values.paymentMethod}</Typography>
                  ) : (
                    index === 1 && (
                      <Typography>{values.currencyPair}</Typography>
                    )
                  )
                }
              >
                {label}
              </StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <Box sx={{ margin: "28px 0px", display: "flex" }}>
        {activeStep === 0 ? (
          <FirstFormBlock
            activeStep={activeStep}
            setValues={setValues}
            setActiveStep={setActiveStep}
          />
        ) : activeStep === 1 ? (
          <SecondFormBlock
            activeStep={activeStep}
            setValues={setValues}
            setActiveStep={setActiveStep}
            values={values}
          />
        ) : activeStep === 2 ? (
          <ThirdFormBlock setValues={setValues} values={values} />
        ) : (
          activeStep === steps.length && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                margin: "auto",
              }}
            >
              <Typography sx={{ mt: 2, mb: 1 }}>Lease created.</Typography>
              <Box marginTop="32px" />
              <Button
                onClick={() => {
                  navigate("/dashboard/owner/leases");
                }}
              >
                Go Back to Owner page
              </Button>
            </Box>
          )
        )}
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "80px",
        }}
      >
        {activeStep !== steps.length && (
          <Button
            color="primary"
            variant="outlined"
            disabled={activeStep === 0}
            onClick={handleBack}
            sx={{ mr: 1 }}
          >
            Back
          </Button>
        )}
        {activeStep === steps.length - 1 && (
          <Button
            color="primary"
            variant="contained"
            disabled={loading}
            onClick={handleSubmit}
            sx={{ mr: 1 }}
          >
            Create Lease
          </Button>
        )}
      </Box>

      {error && <Alert severity="error">{error}</Alert>}
    </Box>
  );
};
