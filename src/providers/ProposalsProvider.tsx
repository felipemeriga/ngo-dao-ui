import React, { createContext, useContext } from "react";
import { Proposal } from "../types/types.ts";
import { useProposals } from "../hooks/useNGODAO.ts";

interface ProposalsContextProps {
  data: readonly Proposal[] | undefined; // Array of proposals or undefined
  isLoading: boolean;
  error: any;
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

  const handleRefetch = async () => {
    const response = await refetch();
    console.log("Refetched data:", response);
  };

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
