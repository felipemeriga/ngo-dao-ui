import { useDialog } from "./useDialog.ts";
import { useCreateProposalForm } from "../components/CreateProposalFormContent/hooks/useCreateProposalForm.ts";
import { useProposalsContext } from "../providers/ProposalsProvider.tsx";
import { useCallback } from "react";

export const useHeaderNavigation = () => {
  const { handleRefetch } = useProposalsContext();

  const [
    isCreateProposalDialogOpened,
    openCreateProposalDialog,
    closeCreateProposalDialog,
  ] = useDialog();

  // Wrap handleAfterSubmit in useCallback
  const handleAfterSubmit = useCallback(() => {
    closeCreateProposalDialog();
    handleRefetch(); // Call refetch here without entire, re-execution on every render
  }, [closeCreateProposalDialog, handleRefetch]);

  const createProposalForm = useCreateProposalForm({
    handleAfterSubmit,
  });

  return {
    isCreateProposalDialogOpened,
    openCreateProposalDialog,
    closeCreateProposalDialog: () => {
      closeCreateProposalDialog();
      // Reset form to clear any custom validations
      createProposalForm.reset();
    },
    createProposalForm,
  };
};
