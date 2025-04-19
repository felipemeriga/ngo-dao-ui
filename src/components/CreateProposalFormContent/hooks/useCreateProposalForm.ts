import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { CreateProposalForm } from "../../../types/formTypes.ts";
import { useCreateProposal } from "../../../hooks/useNGODAO.ts";
import { weiValue } from "../../../utils/utils.ts";

interface InputProps {
  handleAfterSubmit: () => void;
}

export const useCreateProposalForm = ({ handleAfterSubmit }: InputProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    createProposal,
    data,
    error,
    isPending,
    receipt,
    isSuccess,
    isLoading: isLoadingTx,
  } = useCreateProposal();

  const methods = useForm<CreateProposalForm>({
    mode: "onChange", // Ensure validation triggers on input
    defaultValues: { value: 0, target: "" },
  });

  async function waitForResult(): Promise<void> {
    return new Promise((resolve) => {
      // Wait for 5 seconds (5000 milliseconds)
      setTimeout(() => {
        resolve(); // Resolve the promise after the timeout
      }, 5000);
    });
  }

  const onSubmit: SubmitHandler<CreateProposalForm> = async (formData) => {
    setIsLoading(true);
    const wei = weiValue(formData.value);

    createProposal({
      title: formData.title,
      description: formData.description,
      target: formData.target,
      value: wei,
      data: formData.data,
    });

    console.log(isPending, isSuccess, isLoadingTx, receipt, error, data);
    // Wait for the proposal submission to complete or an error to occur
    await waitForResult();

    debugger;
    setIsLoading(false);

    if (error) {
      console.error("Error creating proposal:", error);
    } else if (data) {
      console.log("Proposal created successfully:", data);
      console.log("Receipt:", receipt);
    }

    handleAfterSubmit();
  };

  return {
    formMethods: methods,
    handleSubmit: () => {
      return methods.handleSubmit((data) => onSubmit(data))();
    },
    reset: () => methods.reset(),
    isLoading,
  };
};
