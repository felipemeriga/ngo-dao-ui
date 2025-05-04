import { WriteContractHook } from "../types/types.ts";
import { useEffect, useRef, useState } from "react";
import { useAlerts } from "../providers/AlertsProvider.tsx";
import { WagmiProvider } from "wagmi";
import { config } from "../config.ts";
import EtherScanLink from "../components/common/EtherScanLink/EtherScanLink.tsx";
import { waitForResult } from "../utils/utils.ts";
import { FieldValues, UseFormReturn } from "react-hook-form";

interface BaseInputProps<T> {
  handleAfterSubmit: () => void;
  useHook: () => WriteContractHook<T>;
  successMessage: string;
}

interface WithFormInputProps<T, F extends FieldValues>
  extends BaseInputProps<T> {
  formMethods: UseFormReturn<F>;
  transformData: (data: F) => T;
}
interface WithoutFormInputProps<T> extends BaseInputProps<T> {
  formMethods?: never;
  transformData?: never;
}

type InputProps<T, F extends FieldValues> =
  | WithFormInputProps<T, F>
  | WithoutFormInputProps<T>;

interface BaseFormResults {
  isLoading: boolean;
  hash: string | undefined;
  isConfirmed: boolean;
  isConfirming: boolean;
}

export interface WithFormResults extends BaseFormResults {
  handleSubmit: () => Promise<void>;
}

export interface WithoutFormResults<T> extends BaseFormResults {
  handleSubmit: (data: T) => Promise<void>;
}

type FormResults<T> = WithFormResults | WithoutFormResults<T>;

export const useNGOForm = <T, F extends FieldValues>({
  handleAfterSubmit,
  useHook,
  successMessage,
  formMethods,
  transformData,
}: InputProps<T, F>): FormResults<T> => {
  const [isLoading, setIsLoading] = useState(false);
  const alerts = useAlerts();
  const { write, isPending, error, hash, isConfirming, isConfirmed } =
    useHook();

  const hasHandledSubmit = useRef(false);

  useEffect(() => {
    if (hash && isConfirmed && !isPending && !hasHandledSubmit.current) {
      hasHandledSubmit.current = true;
      setIsLoading(false);
      if (formMethods) {
        formMethods.reset();
      }
      alerts({
        title: "Success",
        description: successMessage || "Successfully submitted the request...",
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

      setTimeout(() => {
        handleAfterSubmit();
      }, 100);
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
      handleAfterSubmit();
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
    formMethods,
  ]);

  const onSubmit = async (data: F | T) => {
    setIsLoading(true);
    hasHandledSubmit.current = false;

    const finalData =
      formMethods && transformData ? transformData(data as F) : (data as T);

    write(finalData);
    await waitForResult();
  };

  const baseResults: BaseFormResults = {
    isLoading,
    hash,
    isConfirmed,
    isConfirming,
  };

  if (formMethods) {
    return {
      ...baseResults,
      handleSubmit: async () => {
        return formMethods.handleSubmit((data) => onSubmit(data))();
      },
    } as WithFormResults;
  }

  return {
    ...baseResults,
    handleSubmit: async (data: T) => {
      return onSubmit(data);
    },
  } as WithoutFormResults<T>;
};
