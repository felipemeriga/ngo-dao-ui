import React from "react";
import { useVotingPeriod } from "../../hooks/useNGODAO.ts";

export const ReadContractData: React.FC = () => {
  const { data, error, isLoading } = useVotingPeriod();
  if (isLoading) return <div>Loading contract data...</div>;
  if (error) return <div>Error reading contract: {error.message}</div>;

  return <div>Balance: {data?.toString()}</div>;
};
