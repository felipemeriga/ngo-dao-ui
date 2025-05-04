import { WriteContractHook } from "../types/types.ts";
import { useEffect, useRef, useState } from "react";
import { useAlerts } from "../providers/AlertsProvider.tsx";
import { WagmiProvider } from "wagmi";
import { config } from "../config.ts";
import EtherScanLink from "../components/common/EtherScanLink/EtherScanLink.tsx";
import { waitForResult } from "../utils/utils.ts";

interface InputProps<T> {
  handleAfterSubmit: () => void;
  useHook: () => WriteContractHook<T>;
  successMessage: string;
}

interface FormResults<T> {
  isLoading: boolean;
  hash: string | undefined;
  isConfirmed: boolean;
  isConfirming: boolean;
  handleSubmit: (data: T) => void;
}

export const useNGOForm = <T,>({
  handleAfterSubmit,
  useHook,
  successMessage,
}: InputProps<T>): FormResults<T> => {
  const [isLoading, setIsLoading] = useState(false);
  const alerts = useAlerts();
  const { write, isPending, error, hash, isConfirming, isConfirmed } =
    useHook();

  // Block `handleAfterSubmit` from being called multiple times
  const hasHandledSubmit = useRef(false);

  useEffect(() => {
    if (hash && isConfirmed && !isPending && !hasHandledSubmit.current) {
      hasHandledSubmit.current = true;
      handleAfterSubmit(); // Ensure it only gets executed once
      setIsLoading(false);
      alerts({
        title: "Success",
        description: "Successfully submitted the request...",
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
        alerts({
          title: "Error",
          description: `There was an error in the request: ${error.message.split("\n")[0]}`,
          type: "Error",
        });
      }
      handleAfterSubmit(); // Ensure it only gets executed once
      setIsLoading(false);
    }
  }, [
    hash,
    error,
    isPending,
    isConfirmed,
    alerts,
    handleAfterSubmit,
    successMessage,
  ]);

  const onSubmit = async (data: T) => {
    setIsLoading(true);
    hasHandledSubmit.current = false; // Reset before execution

    write(data);

    // Wait for the proposal submission to complete or an error to occur
    await waitForResult();
  };

  return {
    handleSubmit: (data: T) => {
      onSubmit(data);
    },
    isLoading,
    hash,
    isConfirmed,
    isConfirming,
  };
};
