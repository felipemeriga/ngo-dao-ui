import React from "react";
import {
  FormGroupContent,
  FormWrapper,
  InlineField,
  StyledTextField,
} from "../common/Form/styles";
import { Controller, useFormContext } from "react-hook-form";
import { DonateForm } from "../../types/types.ts";
import { useAccount, useBalance } from "wagmi";
import { ethValue } from "../../utils/utils.ts";

const DonateFormContent: React.FC = () => {
  const { address } = useAccount(); // Get the current wallet address

  const { data } = useBalance({
    address: address, // Provide the connected wallet address
  });

  const { control } = useFormContext<DonateForm>();

  return (
    <FormWrapper>
      <FormGroupContent display="flex">
        <InlineField cols={1}>
          <Controller
            name="value"
            control={control}
            rules={{
              required: { value: true, message: "Amount is required" },
              validate: {
                isValueValid: (value) => {
                  if (!data) {
                    return "Unable to fetch wallet balance";
                  }
                  if (value > Number(data.formatted)) {
                    return `Entered value cannot exceed wallet balance: ${parseFloat(data.formatted).toFixed(4)}`;
                  }
                  if (value <= 0) {
                    return `Value needs to be greater than 0`;
                  }
                  return true;
                },
              },
            }}
            render={({ field, fieldState: { error } }) => {
              return (
                <StyledTextField
                  {...field}
                  margin="normal"
                  sx={{ minWidth: 300 }} // ensures at least 300px wide
                  InputProps={{
                    style: { fontSize: 18, height: 48 }, // or any size you want
                  }}
                  InputLabelProps={{
                    sx: { fontSize: "1.5rem" }, // Adjust the font size as needed
                  }}
                  label="Amount"
                  type="number"
                  variant="standard"
                  placeholder=""
                  fullWidth
                  error={!!error}
                  helperText={error ? error.message : null}
                />
              );
            }}
          />
        </InlineField>
      </FormGroupContent>
    </FormWrapper>
  );
};

export default DonateFormContent;
