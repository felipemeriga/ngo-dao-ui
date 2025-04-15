import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { CreateProposalForm } from "../../../types/formTypes.ts";

interface InputProps {
  handleAfterSubmit: () => void;
}

export const useCreateProposalForm = ({ handleAfterSubmit }: InputProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const methods = useForm<CreateProposalForm>({
    mode: "onChange", // Ensure validation triggers on input
    defaultValues: { value: 0, target: "" },
  });

  const onSubmit: SubmitHandler<CreateProposalForm> = (data) => {
    setIsLoading(true);
    console.log(data);
    setIsLoading(false);
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
