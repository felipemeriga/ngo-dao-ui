import { useEffect, useState, useRef } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { CreateProposalForm } from "../../../types/types.ts";
import { useCreateProposal } from "../../../hooks/useNGODAO.ts";
import { weiValue } from "../../../utils/utils.ts";
import { useAlerts } from "../../../providers/AlertsProvider.tsx";

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
  const alerts = useAlerts();
  const { createProposal, isPending, error, hash, isConfirming, isConfirmed } =
    useCreateProposal();
  const methods = useForm<CreateProposalForm>({
    mode: "onChange", // Ensure validation triggers on input
    defaultValues: { value: 0, target: "", title: "", description: "" },
  });

  // Block `handleAfterSubmit` from being called multiple times
  const hasHandledSubmit = useRef(false);

  useEffect(() => {
    if (hash && isConfirmed && !isPending && !hasHandledSubmit.current) {
      hasHandledSubmit.current = true;
      handleAfterSubmit(); // Ensure it only gets executed once
      setIsLoading(false);
      methods.reset();
      alerts({
        title: "Success",
        description: "The proposal was created successfully...",
        content: `Transaction hash: ${hash}`,
        type: "Success",
      });
    }

    if (error && !hasHandledSubmit.current) {
      hasHandledSubmit.current = true;
      if (!error.message.includes("User rejected the request")) {
        console.log(error);
      }
      handleAfterSubmit(); // Ensure it only gets executed once
      setIsLoading(false);
    }
  }, [hash, error, isPending, isConfirmed, alerts, handleAfterSubmit, methods]);

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
    hasHandledSubmit.current = false; // Reset before execution
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
