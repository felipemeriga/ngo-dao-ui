import { useDialog } from "../../../hooks/useDialog.ts";
import { Proposal } from "../../../types/types.ts";
import { useVoted } from "../../../hooks/useNGODAO.ts";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useVoteForm } from "./useVoteForm.tsx";
import { useExecuteForm } from "./useExecuteForm.tsx";

export const useProposalInfo = (handleRefetch: () => void) => {
  const [proposal, setSelectedProposal] = useState<Proposal | null>(null);

  const [
    isProposalInfoDialogOpened,
    openProposalInfoDialog,
    closeProposalInfoDialogBase,
  ] = useDialog();

  // Wrap closeProposalInfoDialog to reset both states
  const closeProposalInfoDialog = useCallback(() => {
    closeProposalInfoDialogBase();
    setSelectedProposal(null);
  }, [closeProposalInfoDialogBase]);

  // Wrap handleAfterSubmit in useCallback
  const handleAfterSubmit = useCallback(() => {
    closeProposalInfoDialog();
    handleRefetch(); // Call refetch here without entire, re-execution on every render
  }, [closeProposalInfoDialog, handleRefetch]);

  const voteForm = useVoteForm({
    handleAfterSubmit,
  });

  const executeForm = useExecuteForm({
    handleAfterSubmit,
  });

  // Determine `proposalId`; cache it using `useMemo`
  const proposalId = useMemo(() => {
    return proposal?.id !== null && proposal?.id !== undefined
      ? (proposal.id as `0x${string}`)
      : null;
  }, [proposal]);

  // Call `useVoted` consistently and safely
  const {
    data: rawHasVoted,
    isLoading: isVotedLoading,
    error: isVotedError,
    shouldFetch,
  } = useVoted(proposalId);

  // Store fetched voting status in state, update reactively using `useEffect`
  const [hasVoted, setHasVoted] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    // Apply fetched data only when appropriate
    if (shouldFetch && rawHasVoted !== undefined) {
      setHasVoted(rawHasVoted);
    }
  }, [rawHasVoted, shouldFetch]); // React when fetched data or fetch conditions change

  // Return stable, memoized state
  return useMemo(
    () => ({
      proposal,
      setSelectedProposal,
      hasVoted,
      isVotedLoading,
      isVotedError,
      isProposalInfoDialogOpened,
      openProposalInfoDialog,
      closeProposalInfoDialog,
      voteForm,
      executeForm,
    }),
    [
      proposal,
      setSelectedProposal,
      hasVoted,
      isVotedLoading,
      isVotedError,
      isProposalInfoDialogOpened,
      openProposalInfoDialog,
      closeProposalInfoDialog,
      voteForm,
      executeForm,
    ],
  );
};
