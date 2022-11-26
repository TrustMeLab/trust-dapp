import React, { useState } from "react";
import {
  Alert,
  Box,
  Button,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography,
} from "@mui/material";
import { Signer } from "ethers";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../../contexts/UserContext";
import Crypto from "../../../assets/cryptocurrency.png";
import Fiat from "../../../assets/fiat.png";
import mocks from "../../mocks.json";

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
  paymentMethod: string; //needed for the form, will not be sent to the contract
}

const steps = [
  "Choose your payment method",
  "Choose your currency pair",
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
    const { currencyPair, rentAmount, tenantId, paymentToken } = values;
    const formValues = {
      signer,
      tenantId,
      rentAmount,
      currencyPair,
      paymentToken,
    };
    setLoading(true);
    try {
      // TODO, call mint smart contract
      //await createLease(formValues)
      // navigate("/dashboard/owner/leases");
      setActiveStep(activeStep + 1);
    } catch (error) {
      setError("Une erreur est survenue");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<Element>, id: string) => {
    setValues({ ...values, [id]: e.target.value });
  };

  return (
    <Box sx={{ margin: "auto", width: "60%" }}>
      <Stepper activeStep={activeStep} sx={{ marginBottom: "48px" }}>
        {steps.map((label, index) => {
          const stepProps: { completed?: boolean } = {};

          return (
            <Step {...stepProps} key={index}>
              <StepLabel>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <Box sx={{ margin: "28px 0px", display: "flex" }}>
        {activeStep === 0 ? (
          <>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-evenly",
                alignItems: "center",
              }}
            >
              <Button
                onClick={() => {
                  setValues((prev) => ({ ...prev, paymentMethod: "crypto" }));
                  setActiveStep(activeStep + 1);
                }}
                sx={{
                  height: "60px",
                  padding: 6,
                  fontSize: "24px",
                }}
              >
                <img
                  src={Crypto}
                  style={{ width: "80px", marginRight: "12px" }}
                />
                Crypto currency
              </Button>
              <Button
                onClick={() => {
                  setValues((prev) => ({ ...prev, paymentMethod: "fiat" }));
                  setActiveStep(activeStep + 1);
                }}
                sx={{
                  height: "60px",
                  padding: 6,
                  fontSize: "24px",
                }}
              >
                <img
                  src={Fiat}
                  style={{ width: "100px", marginRight: "12px" }}
                />
                Fiat currency
              </Button>
            </Box>
          </>
        ) : activeStep === 1 ? (
          <FormControl
            sx={{
              width: "50%",
              margin: "auto",
            }}
          >
            <InputLabel>Pair</InputLabel>
            {values.paymentMethod === "crypto" ? (
              <Select
                id="currencyPair"
                value={values.currencyPair}
                label="Currency Pair"
                onChange={(event: SelectChangeEvent) => {
                  setValues((prev) => ({
                    ...prev,
                    currencyPair: event.target.value as string,
                  }));
                  setActiveStep(activeStep + 1);
                }}
              >
                <MenuItem value={"ETH"}>ETH</MenuItem>
                <MenuItem value={"CRT"}>CRT</MenuItem>
              </Select>
            ) : (
              <Select
                id="currencyPair"
                value={values.currencyPair}
                label="Currency Pair"
                onChange={(event: SelectChangeEvent) => {
                  setValues((prev) => ({
                    ...prev,
                    currencyPair: event.target.value as string,
                  }));
                  setActiveStep(activeStep + 1);
                }}
              >
                <MenuItem value={"USD-ETH"}>USD-ETH</MenuItem>
                <MenuItem value={"EUR-ETH"}>EUR-ETH</MenuItem>
              </Select>
            )}
          </FormControl>
        ) : activeStep === 2 ? (
          <FormControl
            sx={{
              width: "50%",
              margin: "auto",
              gap: "32px",
            }}
          >
            <TextField
              select
              id="tenantId"
              label="Tenant"
              variant="outlined"
              value={values.tenantId}
              onChange={(event: SelectChangeEvent) => {
                setValues((prev) => ({
                  ...prev,
                  tenantId: event.target.value as string,
                }));
              }}
            >
              {mocks.data.tenants.map((tenant) => (
                <MenuItem key={tenant.handle} value={tenant.id}>
                  {tenant.handle}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              id="rentAmount"
              label="Rent Amount"
              variant="outlined"
              type="number"
              // sx={{ width: 400 }}
              value={values.rentAmount}
              onChange={(e: React.ChangeEvent) =>
                handleInputChange(e, "rentAmount")
              }
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    {values.currencyPair}
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              select
              id="rentPaymentInterval"
              label="Payment Interval"
              variant="outlined"
              value={values.rentPaymentInterval}
              onChange={(event: SelectChangeEvent) => {
                setValues((prev) => ({
                  ...prev,
                  rentPaymentInterval: event.target.value as string,
                }));
              }}
            >
              {mocks.data.rentPaymentInterval.map((interval) => (
                <MenuItem key={interval.id} value={interval.value}>
                  {interval.value}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              id="startDate"
              label="Starting date"
              type="date"
              value={values.startDate}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(e: React.ChangeEvent) =>
                handleInputChange(e, "startDate")
              }
            />
          </FormControl>
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
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
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
