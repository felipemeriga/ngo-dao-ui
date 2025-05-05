import { useDialog } from "./useDialog.ts";
import { useCreateProposalForm } from "../components/CreateProposalFormContent/hooks/useCreateProposalForm.tsx";
import { useProposalsContext } from "../providers/ProposalsProvider.tsx";
import { useCallback } from "react";
import { useDonateForm } from "../components/DonateFormContent/hooks/useDonateForm.tsx";

export const useHeaderNavigation = () => {
  const { handleRefetch } = useProposalsContext();

  const [
    isCreateProposalDialogOpened,
    openCreateProposalDialog,
    closeCreateProposalDialog,
  ] = useDialog();

  const [isDonateDialogOpened, openDonateDialog, closeDonateDialog] =
    useDialog();

  // Wrap handleAfterSubmit in useCallback
  const handleAfterSubmit = useCallback(() => {
    closeCreateProposalDialog();
    closeDonateDialog();
    handleRefetch(); // Call refetch here without entire, re-execution on every render
  }, [closeCreateProposalDialog, handleRefetch, closeDonateDialog]);

  const createProposalForm = useCreateProposalForm({
    handleAfterSubmit,
  });

  const donateProposalForm = useDonateForm({
    handleAfterSubmit,
  });

  return {
    createProposalForm: {
      action: "Create",
      title: "Create Proposal",
      isCreateProposalDialogOpened,
      openCreateProposalDialog,
      closeCreateProposalDialog: () => {
        closeCreateProposalDialog();
        // Reset form to clear any custom validations
        createProposalForm.formMethods.reset();
      },
      form: createProposalForm,
    },
    donateForm: {
      action: "Donate",
      title: "Donate to NGO",
      isDonateDialogOpened,
      openDonateDialog,
      closeDonateDialog: () => {
        closeDonateDialog();
        // Reset form to clear any custom validations
        donateProposalForm.formMethods.reset();
      },
      form: donateProposalForm,
    },
  };
};
