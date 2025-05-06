import { useExecute } from "../../../hooks/useNGODAO.ts";
import { useNGOForm } from "../../../hooks/useNGOForm.tsx";

export const useExecuteForm = ({
  handleAfterSubmit,
}: {
  handleAfterSubmit: () => void;
}) => {
  return useNGOForm<`0x${string}`>({
    handleAfterSubmit,
    useHook: useExecute, // Pass the specific hook
    successMessage: "You have successfully executed the proposal...",
  });
};
