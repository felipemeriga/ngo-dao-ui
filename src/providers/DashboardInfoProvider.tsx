/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useCallback, useContext } from "react";
import { useDonations, useTotalDonations } from "../hooks/useNGODAO.ts";
import { HookContext } from "../types/types.ts";

interface DashboardInfoContextProps {
  data: bigint | undefined;
  isLoading: boolean;
  isError: boolean;
  handleRefetch: () => void;
}

function createDashboardProvider(
  useHook: () => HookContext,
  contextName: string,
) {
  const Context = createContext<DashboardInfoContextProps | undefined>(
    undefined,
  );

  const Provider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { data, isLoading, isError, refetch } = useHook();

    const handleRefetch = useCallback(async () => {
      await refetch();
    }, [refetch]);

    return (
      <Context.Provider value={{ data, isLoading, isError, handleRefetch }}>
        {children}
      </Context.Provider>
    );
  };

  const useContextHook = (): DashboardInfoContextProps => {
    const context = useContext(Context);
    if (!context) {
      throw new Error(`${contextName} must be used within its Provider`);
    }
    return context;
  };

  return { Provider, useContextHook };
}

// Create separate providers and hooks while reusing the creation logic
const NGOBalance = createDashboardProvider(useTotalDonations, "NGOBalance");
const UserDonations = createDashboardProvider(useDonations, "UserDonations");

// Export the providers and hooks separately
export const NGOBalanceProvider = NGOBalance.Provider;
export const UserDonationsProvider = UserDonations.Provider;
export const useNGOBalanceContext = NGOBalance.useContextHook;
export const useUserDonationsContext = UserDonations.useContextHook;
