import { useEffect, useRef, useState } from "react";
import { useAlerts } from "../../../providers/AlertsProvider.tsx";
import { SubmitHandler, useForm } from "react-hook-form";
import { DonateForm } from "../../../types/types.ts";
import { useDonate } from "../../../hooks/useNGODAO.ts";
import { WagmiProvider } from "wagmi";
import { config } from "../../../config.ts";
import EtherScanLink from "../../common/EtherScanLink/EtherScanLink.tsx";
import { waitForResult, weiValue } from "../../../utils/utils.ts";

interface InputProps {
  handleAfterSubmit: () => void;
}

interface FormResults {
  isLoading: boolean;
  hash: string;
  isConfirmed: boolean;
  isConfirming: boolean;
}

export const useDonateForm = ({ handleAfterSubmit }: InputProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const alerts = useAlerts();
  const { donate, isPending, error, hash, isConfirming, isConfirmed } =
    useDonate();

  const methods = useForm<DonateForm>({
    mode: "onChange", // Ensure validation triggers on input
    defaultValues: { value: 0.1 },
  });

  // Block `handleAfterSubmit` from being called multiple times
  const hasHandledSubmit = useRef(false);

  useEffect(() => {
    if (hash && isConfirmed && !isPending && !hasHandledSubmit.current) {
      hasHandledSubmit.current = true;
      handleAfterSubmit(); // Ensure it only gets executed once
      setIsLoading(false);
      methods.reset();
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
  }, [hash, error, isPending, isConfirmed, alerts, handleAfterSubmit, methods]);

  const onSubmit: SubmitHandler<DonateForm> = async (formData) => {
    setIsLoading(true);
    hasHandledSubmit.current = false; // Reset before execution
    const wei = weiValue(formData.value);

    donate(wei);

    // Wait for the proposal submission to complete or an error to occur
    await waitForResult();
  };

  return {
    formMethods: methods,
    handleSubmit: () => {
      return methods.handleSubmit((data) => onSubmit(data))();
    },
    reset: () => methods.reset(),
    formResults: {
      isLoading,
      hash,
      isConfirmed,
      isConfirming,
    } as FormResults,
  };
};
