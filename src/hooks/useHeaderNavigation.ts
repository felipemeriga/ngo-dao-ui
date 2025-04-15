import { useDialog } from "./useDialog.ts";
import { useCreateProposalForm } from "../components/CreateProposalFormContent/hooks/useCreateProposalForm.ts";

export const useHeaderNavigation = () => {
  const [
    isCreateProposalDialogOpened,
    openCreateProposalDialog,
    closeCreateProposalDialog,
  ] = useDialog();

  const createProposalForm = useCreateProposalForm({
    handleAfterSubmit: () => {
      closeCreateProposalDialog();
    },
  });

  return {
    isCreateProposalDialogOpened,
    openCreateProposalDialog,
    closeCreateProposalDialog: () => {
      closeCreateProposalDialog();

      //reset form to clear eventual custom validations
      createProposalForm.reset();
    },
    createProposalForm,
  };
};
