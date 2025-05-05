import { useForm } from "react-hook-form";
import { CreateProposal, CreateProposalForm } from "../../../types/types.ts";
import { useCreateProposal } from "../../../hooks/useNGODAO.ts";
import { weiValue } from "../../../utils/utils.ts";
import { useNGOForm, WithFormResults } from "../../../hooks/useNGOForm.tsx";

export const useCreateProposalForm = ({
  handleAfterSubmit,
}: {
  handleAfterSubmit: () => void;
}) => {
  const formMethods = useForm<CreateProposalForm>({
    mode: "onChange", // Ensure validation triggers on input
    defaultValues: { value: 0, target: "", title: "", description: "" },
  });
  const ngoForm = useNGOForm<CreateProposal, CreateProposalForm>({
    handleAfterSubmit,
    useHook: useCreateProposal,
    successMessage: "You have successfully submitted a proposal...",
    formMethods,
    transformData: (formData: CreateProposalForm) => {
      const wei = weiValue(formData.value);
      return {
        title: formData.title,
        description: formData.description,
        target: formData.target,
        value: wei,
        data: formData.data,
      } as CreateProposal;
    },
  }) as WithFormResults;

  return {
    formMethods,
    ...ngoForm,
  };
};
