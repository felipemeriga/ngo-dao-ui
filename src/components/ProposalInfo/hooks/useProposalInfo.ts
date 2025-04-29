import { useDialog } from "../../../hooks/useDialog.ts";
import { Proposal } from "../../../types/types.ts";
import { useVoted } from "../../../hooks/useNGODAO.ts";
import { useEffect, useMemo, useState } from "react";

export const useProposalInfo = () => {
  const [proposal, setSelectedProposal] = useState<Proposal | null>(null);

  const [
    isProposalInfoDialogOpened,
    openProposalInfoDialog,
    closeProposalInfoDialog,
  ] = useDialog();

  // Determine `proposalId`; cache it using `useMemo`
  const proposalId = useMemo(() => {
    return proposal?.id !== null && proposal?.id !== undefined
      ? BigInt(proposal.id)
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
    ],
  );
};
