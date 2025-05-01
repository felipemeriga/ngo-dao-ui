import { useEffect, useRef, useState } from "react";
import { useAlerts } from "../../../providers/AlertsProvider.tsx";
import { useExecute } from "../../../hooks/useNGODAO.ts";
import { WagmiProvider } from "wagmi";
import { config } from "../../../config.ts";
import EtherScanLink from "../../common/EtherScanLink/EtherScanLink.tsx";
import { waitForResult } from "../../../utils/utils.ts";

interface InputProps {
  handleAfterSubmit: () => void;
}

interface FormResults {
  isLoading: boolean;
  hash: string;
  isConfirmed: boolean;
  isConfirming: boolean;
}

export const useExecuteForm = ({ handleAfterSubmit }: InputProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const alerts = useAlerts();
  const { execute, isPending, error, hash, isConfirming, isConfirmed } =
    useExecute();

  // Block `handleAfterSubmit` from being called multiple times
  const hasHandledSubmit = useRef(false);

  useEffect(() => {
    if (hash && isConfirmed && !isPending && !hasHandledSubmit.current) {
      hasHandledSubmit.current = true;
      handleAfterSubmit(); // Ensure it only gets executed once
      setIsLoading(false);
      alerts({
        title: "Success",
        description: "You have successfully executed the proposal...",
        content: (
          <WagmiProvider config={config}>
            <EtherScanLink
              showAddress={false}
              walletAddress={hash as string}
              isTransaction={true}
            />
          </WagmiProvider>
        ),
        type: "Success",
      });
    }

    if (error && !hasHandledSubmit.current) {
      hasHandledSubmit.current = true;
      if (!error.message.includes("User rejected the request")) {
        console.log(error);
      }
      handleAfterSubmit(); // Ensure it only gets executed once
      setIsLoading(false);
    }
  }, [hash, error, isPending, isConfirmed, alerts, handleAfterSubmit]);

  const onSubmit = async (data: `0x${string}`) => {
    setIsLoading(true);
    hasHandledSubmit.current = false; // Reset before execution

    execute(data);

    // Wait for the proposal submission to complete or an error to occur
    await waitForResult();
  };

  return {
    handleSubmit: (data: `0x${string}`) => {
      onSubmit(data);
    },
    formResults: {
      isLoading,
      hash,
      isConfirmed,
      isConfirming,
    } as FormResults,
  };
};
