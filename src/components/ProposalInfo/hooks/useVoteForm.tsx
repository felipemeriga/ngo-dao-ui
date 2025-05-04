import { useVote } from "../../../hooks/useNGODAO.ts";
import { Vote } from "../../../types/types.ts";
import { useNGOForm } from "../../../hooks/useNGOForm.tsx";

export const useVoteForm = ({
  handleAfterSubmit,
}: {
  handleAfterSubmit: () => void;
}) => {
  return useNGOForm<Vote>({
    handleAfterSubmit,
    useHook: useVote, // Pass the specific hook
    successMessage: "You have successfully voted for the proposal...",
  });
};
