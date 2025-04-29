import { useEffect, useRef, useState } from "react";
import { useAlerts } from "../../../providers/AlertsProvider.tsx";
import { useVote } from "../../../hooks/useNGODAO.ts";
import { WagmiProvider } from "wagmi";
import { config } from "../../../config.ts";
import EtherScanLink from "../../common/EtherScanLink/EtherScanLink.tsx";
import { Vote } from "../../../types/types.ts";
import { waitForResult } from "../../../utils/utils.ts";

interface InputProps {
  handleAfterSubmit: () => void;
}

export const useVoteForm = ({ handleAfterSubmit }: InputProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const alerts = useAlerts();
  const { vote, isPending, error, hash, isConfirming, isConfirmed } = useVote();

  // Block `handleAfterSubmit` from being called multiple times
  const hasHandledSubmit = useRef(false);

  useEffect(() => {
    if (hash && isConfirmed && !isPending && !hasHandledSubmit.current) {
      hasHandledSubmit.current = true;
      handleAfterSubmit(); // Ensure it only gets executed once
      setIsLoading(false);
      alerts({
        title: "Success",
        description: "You have successfully donated to the NGO...",
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

  const onSubmit = async (data: Vote) => {
    setIsLoading(true);
    hasHandledSubmit.current = false; // Reset before execution

    vote(data);

    // Wait for the proposal submission to complete or an error to occur
    await waitForResult();
  };

  return {
    handleSubmit: (data: Vote) => {
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
