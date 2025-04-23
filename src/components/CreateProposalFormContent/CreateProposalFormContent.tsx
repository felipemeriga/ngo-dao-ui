import React from "react";
import {
  FormGroupContent,
  FormWrapper,
  InlineField,
  StyledTextField,
} from "../common/Form/styles";
import { Controller, useFormContext } from "react-hook-form";
import { CreateProposalForm } from "../../types/types.ts";
import { useAccount, useBalance } from "wagmi";
import { isAddress } from "@ethersproject/address";

const CreateProposalFormContent: React.FC = () => {
  // Get the connected account
  const { address } = useAccount();

  // Use `useBalance` to fetch the ETH balance of the connected wallet
  const { data } = useBalance({
    address, // The wallet address to fetch the balance for
  });

  const { control } = useFormContext<CreateProposalForm>();

  // // Trigger validation when wallet balance updates
  // useEffect(() => {
  //   if (data?.value) {
  //     trigger("value"); // Force revalidate "value" field
  //   }
  // }, [data?.value, trigger]);

  return (
    <FormWrapper>
      <FormGroupContent display="flex">
        <InlineField cols={1}>
          <Controller
            name="title"
            control={control}
            rules={{
              required: { value: true, message: "Title is required" },
              validate: {
                isValidDescription: (value) => {
                  if (value.length < 5) {
                    return "The title must be at least 5 characters long";
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
                  label="Title"
                  variant="standard"
                  placeholder=""
                  fullWidth
                  error={!!error}
                  helperText={error ? error.message : null}
                />
              );
            }}
          />
          <Controller
            name="description"
            control={control}
            rules={{
              required: { value: true, message: "Description is required" },
              validate: {
                isValidDescription: (value) => {
                  if (value.length < 50) {
                    return "The description must be at least 50 characters long";
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
                  label="Description"
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
        <InlineField cols={1}>
          <Controller
            name="target"
            control={control}
            rules={{
              required: { value: true, message: "Address is required" },
              validate: {
                isValidAddress: (value) => {
                  if (!isAddress(value)) {
                    return "Invalid Ethereum wallet address";
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
                  label="Address"
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
        <InlineField cols={1}>
          <Controller
            name="value"
            control={control}
            rules={{
              required: { value: true, message: "Amount is required" },
              validate: {
                isValueValid: (value) => {
                  console.log("Validation triggered with value:", value); // Log every validation
                  console.log(data);
                  if (!data) {
                    return "Unable to fetch wallet balance";
                  }
                  if (value > Number(data?.formatted)) {
                    return `Entered value cannot exceed wallet balance: ${parseFloat(Number(data?.formatted).toFixed(4))}`;
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

export default CreateProposalFormContent;
