import React from "react";
import {
  FormControl,
  MenuItem,
  TextField,
  Autocomplete,
  InputAdornment,
} from "@mui/material";

import { CreateLeaseForm } from "../../pages/OwnerCreateLease";
import mocksCryptoCurrencies from "../../../../mocksCryptoCurrencies.json";
import mocksTenants from "../../../../mocksTenants.json";

interface ThirdFormBlockProps {
  setValues: (value: React.SetStateAction<Partial<CreateLeaseForm>>) => void;
  values: Partial<CreateLeaseForm>;
}
export const ThirdFormBlock = ({ setValues, values }: ThirdFormBlockProps) => {
  // const allTenants = useTenants();
  const allTenants = mocksTenants.tenants; // TODO:  CHANGE

  const handleInputChange = (e: any, id: string) => {
    setValues({ ...values, [id]: e.target.value });
  };

  return (
    <FormControl
      sx={{
        width: "50%",
        margin: "auto",
        gap: "32px",
      }}
    >
      <Autocomplete
        disablePortal
        id="tenants"
        options={allTenants}
        getOptionLabel={(option) => option.handle}
        onChange={(event, newValue: any) => {
          setValues((prev) => ({
            ...prev,
            tenantId: newValue?.id as string,
          }));
        }}
        renderInput={(params: any) => {
          return <TextField {...params} label="Tenant" variant="outlined" />;
        }}
      />
      <TextField
        id="rentAmount"
        required
        label="Rent Amount"
        variant="outlined"
        type="number"
        value={values.rentAmount}
        onChange={(e: React.ChangeEvent) => handleInputChange(e, "rentAmount")}
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
        required
        id="rentPaymentInterval"
        label="Rent Interval"
        variant="outlined"
        value={values.rentPaymentInterval}
        onChange={(event) => {
          setValues((prev) => ({
            ...prev,
            rentPaymentInterval: event.target.value as string,
          }));
        }}
      >
        {mocksCryptoCurrencies.data.rentPaymentInterval.map((interval) => (
          <MenuItem key={interval.id} value={interval.value}>
            {interval.label}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        id="totalNumberOfRent"
        required
        label="Total Number Of Rents"
        variant="outlined"
        type="number"
        value={values.totalNumberOfRents}
        onChange={(e: React.ChangeEvent) =>
          handleInputChange(e, "totalNumberOfRents")
        }
      />

      <TextField
        select
        required
        id="rentPaymentLimitTime"
        label="Rent Payment Limit Time"
        variant="outlined"
        value={values.rentPaymentLimitTime}
        onChange={(event) => {
          setValues((prev) => ({
            ...prev,
            rentPaymentLimitTime: event.target.value as string,
          }));
        }}
      >
        {mocksCryptoCurrencies.data.rentPaymentLimitTime.map((interval) => (
          <MenuItem key={interval.id} value={interval.value}>
            {interval.label}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        id="startDate"
        required
        label="Starting date"
        type="date"
        value={values.startDate}
        InputLabelProps={{
          shrink: true,
        }}
        onChange={(e: React.ChangeEvent) => handleInputChange(e, "startDate")}
      />
    </FormControl>
  );
};
