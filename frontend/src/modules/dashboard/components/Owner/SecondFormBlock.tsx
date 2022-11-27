import React from "react";
import { FormControl, MenuItem, TextField } from "@mui/material";

import { CreateLeaseForm } from "../../pages/OwnerCreateLease";
import mocksCryptoCurrencies from "../../../../mocksCryptoCurrencies.json";

interface SecondFormBlockProps {
  setValues: (value: React.SetStateAction<Partial<CreateLeaseForm>>) => void;
  activeStep: number;
  values: Partial<CreateLeaseForm>;
  setActiveStep: (value: number) => void;
}
export const SecondFormBlock = ({
  setValues,
  values,
  setActiveStep,
  activeStep,
}: SecondFormBlockProps) => {
  return (
    <FormControl
      sx={{
        width: "50%",
        margin: "auto",
      }}
    >
      {values.paymentMethod === "crypto" ? (
        <>
          <TextField
            select
            id="currencyPair"
            value={values.currencyPair}
            label="Crypto Currency"
            onChange={(event) => {
              setValues((prev) => ({
                ...prev,
                currencyPair: event.target.value as string,
              }));
              setActiveStep(activeStep + 1);
            }}
          >
            {mocksCryptoCurrencies.data.currencies.crypto.map(
              (cryptoCurrency) => (
                <MenuItem
                  key={cryptoCurrency.value}
                  value={cryptoCurrency.value}
                >
                  {cryptoCurrency.label}
                </MenuItem>
              )
            )}
          </TextField>
        </>
      ) : (
        <TextField
          select
          id="currencyPair"
          value={values.currencyPair}
          label="Currency Pair"
          onChange={(event) => {
            setValues((prev) => ({
              ...prev,
              currencyPair: event.target.value as string,
            }));
            setActiveStep(activeStep + 1);
          }}
        >
          {mocksCryptoCurrencies.data.currencies.fiat.map((fiatCurrency) => (
            <MenuItem key={fiatCurrency.value} value={fiatCurrency.value}>
              {fiatCurrency.label}
            </MenuItem>
          ))}
        </TextField>
      )}
    </FormControl>
  );
};
