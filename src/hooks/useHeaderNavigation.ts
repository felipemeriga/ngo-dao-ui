import { useDialog } from "./useDialog.ts";
import { useCreateProposalForm } from "../components/CreateProposalFormContent/hooks/useCreateProposalForm.ts";
import { useProposalsContext } from "../providers/ProposalsProvider.tsx";

export const useHeaderNavigation = () => {
  const { handleRefetch } = useProposalsContext();

  const [
    isCreateProposalDialogOpened,
    openCreateProposalDialog,
    closeCreateProposalDialog,
  ] = useDialog();

  const createProposalForm = useCreateProposalForm({
    handleAfterSubmit: () => {
      closeCreateProposalDialog();
      createProposalForm.reset();
      handleRefetch();
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
