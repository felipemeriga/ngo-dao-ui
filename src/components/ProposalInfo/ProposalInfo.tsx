import React from "react";
import {
  FormGroupContent,
  FormWrapper,
  InlineField,
  StyledTextField,
} from "../common/Form/styles.tsx";
import { ProposalStruct } from "../../types/NGODAO.ts";

const ProposalInfo: React.FC<ProposalStruct> = ({ title }) => {
  return (
    <FormWrapper>
      <FormGroupContent display="flex">
        <InlineField cols={1}>
          <StyledTextField
            value={title}
            margin="normal"
            sx={{ minWidth: 300 }} // ensures at least 300px wide
            InputProps={{
              style: { fontSize: 18, height: 48 }, // or any size you want
            }}
            InputLabelProps={{
              sx: { fontSize: "1.5rem" }, // Adjust the font size as needed
            }}
            disabled={true}
            label="Title"
            variant="standard"
            fullWidth
          />
        </InlineField>
        {/*<InlineField cols={1}>*/}

        {/*  <StyledTextField*/}
        {/*    {...field}*/}
        {/*    margin="normal"*/}
        {/*    sx={{ minWidth: 300 }} // ensures at least 300px wide*/}
        {/*    InputProps={{*/}
        {/*      style: { fontSize: 18, height: 48 }, // or any size you want*/}
        {/*    }}*/}
        {/*    InputLabelProps={{*/}
        {/*      sx: { fontSize: "1.5rem" }, // Adjust the font size as needed*/}
        {/*    }}*/}
        {/*    label="Description"*/}
        {/*    variant="standard"*/}
        {/*    placeholder=""*/}
        {/*    fullWidth*/}
        {/*    error={!!error}*/}
        {/*    helperText={error ? error.message : null}*/}
        {/*</InlineField>*/}
        {/*<InlineField cols={1}>*/}
        {/*  <Controller*/}
        {/*    name="target"*/}
        {/*    control={control}*/}
        {/*    rules={{*/}
        {/*      required: { value: true, message: "Address is required" },*/}
        {/*      validate: {*/}
        {/*        isValidAddress: (value) => {*/}
        {/*          if (!isAddress(value)) {*/}
        {/*            return "Invalid Ethereum wallet address";*/}
        {/*          }*/}
        {/*          return true;*/}
        {/*        },*/}
        {/*      },*/}
        {/*    }}*/}
        {/*    render={({ field, fieldState: { error } }) => {*/}
        {/*      return (*/}
        {/*        <StyledTextField*/}
        {/*          {...field}*/}
        {/*          margin="normal"*/}
        {/*          sx={{ minWidth: 300 }} // ensures at least 300px wide*/}
        {/*          InputProps={{*/}
        {/*            style: { fontSize: 18, height: 48 }, // or any size you want*/}
        {/*          }}*/}
        {/*          InputLabelProps={{*/}
        {/*            sx: { fontSize: "1.5rem" }, // Adjust the font size as needed*/}
        {/*          }}*/}
        {/*          label="Address"*/}
        {/*          variant="standard"*/}
        {/*          placeholder=""*/}
        {/*          fullWidth*/}
        {/*          error={!!error}*/}
        {/*          helperText={error ? error.message : null}*/}
        {/*        />*/}
        {/*      );*/}
        {/*    }}*/}
        {/*  />*/}
        {/*</InlineField>*/}
        {/*<InlineField cols={1}>*/}
        {/*  <Controller*/}
        {/*    name="value"*/}
        {/*    control={control}*/}
        {/*    rules={{*/}
        {/*      required: { value: true, message: "Amount is required" },*/}
        {/*      validate: {*/}
        {/*        isValueValid: (value) => {*/}
        {/*          console.log("Validation triggered with value:", value); // Log every validation*/}
        {/*          console.log(data);*/}
        {/*          if (!data) {*/}
        {/*            return "Unable to fetch NGO balance";*/}
        {/*          }*/}
        {/*          if (value > Number(ethValue(data))) {*/}
        {/*            return `Entered value cannot exceed NGO balance: ${parseFloat(ethValue(data).toFixed(4))}`;*/}
        {/*          }*/}
        {/*          if (value <= 0) {*/}
        {/*            return `Value needs to be greater than 0`;*/}
        {/*          }*/}
        {/*          return true;*/}
        {/*        },*/}
        {/*      },*/}
        {/*    }}*/}
        {/*    render={({ field, fieldState: { error } }) => {*/}
        {/*      return (*/}
        {/*        <StyledTextField*/}
        {/*          {...field}*/}
        {/*          margin="normal"*/}
        {/*          sx={{ minWidth: 300 }} // ensures at least 300px wide*/}
        {/*          InputProps={{*/}
        {/*            style: { fontSize: 18, height: 48 }, // or any size you want*/}
        {/*          }}*/}
        {/*          InputLabelProps={{*/}
        {/*            sx: { fontSize: "1.5rem" }, // Adjust the font size as needed*/}
        {/*          }}*/}
        {/*          label="Amount"*/}
        {/*          type="number"*/}
        {/*          variant="standard"*/}
        {/*          placeholder=""*/}
        {/*          fullWidth*/}
        {/*          error={!!error}*/}
        {/*          helperText={error ? error.message : null}*/}
        {/*        />*/}
        {/*      );*/}
        {/*    }}*/}
        {/*  />*/}
        {/*</InlineField>*/}
      </FormGroupContent>
    </FormWrapper>
  );
};

export default ProposalInfo;
