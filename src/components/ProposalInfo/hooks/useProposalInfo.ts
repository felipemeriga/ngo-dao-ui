import { useDialog } from "../../../hooks/useDialog.ts";
import { useState } from "react";
import { Proposal } from "../../../types/types.ts";

export const useProposalInfo = () => {
  const [proposal, setSelectedProposal] = useState<Proposal | null>(null);

  const submitVote = (approve: boolean) => {};

  const [
    isProposalInfoDialogOpened,
    openProposalInfolDialog,
    closeProposalInfoDialog,
  ] = useDialog();

  return {
    proposal,
    isProposalInfoDialogOpened,
    openProposalInfolDialog,
    closeProposalInfoDialog,
    setSelectedProposal,
  };
};
