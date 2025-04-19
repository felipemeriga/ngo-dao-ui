import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { CreateProposalForm } from "../../../types/formTypes.ts";
import { useCreateProposal } from "../../../hooks/useNGODAO.ts";
import { weiValue } from "../../../utils/utils.ts";

interface InputProps {
  handleAfterSubmit: () => void;
}

interface FormResults {
  isLoading: boolean;
  hash: string;
  isConfirmed: boolean;
  isConfirming: boolean;
}

export const useCreateProposalForm = ({ handleAfterSubmit }: InputProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { createProposal, isPending, error, hash, isConfirming, isConfirmed } =
    useCreateProposal();

  useEffect(() => {
    if (hash && isConfirmed && !isPending) {
      handleAfterSubmit();
      setIsLoading(false);
    }

    if (error) {
      if (!error.message.includes("User rejected the request")) {
        console.log(error);
      }
      handleAfterSubmit();
      setIsLoading(false);
    }
  }, [hash, error, isPending, isConfirmed]);

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

    // Wait for the proposal submission to complete or an error to occur
    await waitForResult();
  };

  return {
    formMethods: methods,
    handleSubmit: () => {
      return methods.handleSubmit((data) => onSubmit(data))();
    },
    reset: () => methods.reset(),
    formResults: {
      isLoading,
      hash,
      isConfirmed,
      isConfirming,
    } as FormResults,
  };
};
