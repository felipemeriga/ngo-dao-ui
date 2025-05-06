/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useCallback, useContext } from "react";
import { Proposal } from "../types/types.ts";
import { useProposals } from "../hooks/useNGODAO.ts";
import { ReadContractErrorType } from "viem";

interface ProposalsContextProps {
  data: readonly Proposal[] | undefined; // Array of proposals or undefined
  isLoading: boolean;
  error: ReadContractErrorType | null;
  handleRefetch: () => void;
}

// Create the context
const ProposalsContext = createContext<ProposalsContextProps | undefined>(
  undefined,
);

// Create a provider component
export const ProposalsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { data, isLoading, error, refetch } = useProposals();

  // Wrap handleRefetch in useCallback to prevent unnecessary re-creations
  const handleRefetch = useCallback(async () => {
    const response = await refetch();
    console.log("Refetched data:", response);
  }, [refetch]);

  return (
    <ProposalsContext.Provider
      value={{ data, isLoading, error, handleRefetch }}
    >
      {children}
    </ProposalsContext.Provider>
  );
};

// Custom hook to use the ProposalsContext
export const useProposalsContext = (): ProposalsContextProps => {
  const context = useContext(ProposalsContext);

  if (!context) {
    throw new Error(
      "useProposalsContext must be used within a ProposalsProvider",
    );
  }

  return context;
};
