import { useDialog } from "./useDialog.ts";
import { useCreateProposalForm } from "../components/CreateProposalFormContent/hooks/useCreateProposalForm.tsx";
import { useProposalsContext } from "../providers/ProposalsProvider.tsx";
import { useCallback } from "react";
import { useDonateForm } from "../components/DonateFormContent/hooks/useDonateForm.tsx";
import {
  useNGOBalanceContext,
  useUserDonationsContext,
} from "../providers/DashboardInfoProvider.tsx";

export const useHeaderNavigation = () => {
  const { handleRefetch: handleRefetchProposals } = useProposalsContext();
  const { handleRefetch: handleRefetchNGOBalance } = useNGOBalanceContext();
  const { handleRefetch: handleRefetchUserDonations } =
    useUserDonationsContext();

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
    handleRefetchProposals();
    handleRefetchNGOBalance();
    handleRefetchUserDonations();
  }, [
    closeCreateProposalDialog,
    handleRefetchProposals,
    closeDonateDialog,
    handleRefetchNGOBalance,
    handleRefetchUserDonations,
  ]);

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
