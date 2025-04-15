// useNGODAO.ts
import {
  useReadContract,
  useAccount,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import { NGODAO__factory } from "../types";

const contractConfig = {
  address: "0xe65920D17678aaC3C51bEbf713F2B0e2bFaa34Fa",
  abi: NGODAO__factory.abi,
};

export function useVotingPeriod() {
  return useReadContract({
    address: contractConfig.address as `0x${string}`,
    abi: NGODAO__factory.abi,
    functionName: "votingPeriod",
  });
}

export function useTotalDonations() {
  return useReadContract({
    address: contractConfig.address as `0x${string}`,
    abi: NGODAO__factory.abi,
    functionName: "totalDonations",
  });
}

// Add a new function for the public mapping donations
export function useDonations() {
  const { address } = useAccount();
  const walletAddress = address || ("" as `0x${string}`); // Use an empty string if

  return useReadContract({
    address: contractConfig.address as `0x${string}`,
    abi: contractConfig.abi,
    functionName: "donations",
    args: [walletAddress], // Pass the donor address to the mapping
  });
}

export interface Proposal {
  description: string;
  target: string;
  value: bigint;
  data: string;
}

export function useCreateProposal() {
  const { writeContract, data, error, isPending } = useWriteContract();
  const {
    data: receipt,
    isLoading,
    isSuccess,
  } = useWaitForTransactionReceipt({ hash: data });

  const createProposal = ({ description, target, value, data }: Proposal) => {
    writeContract({
      abi: NGODAO__factory.abi,
      address: contractConfig.address as `0x${string}`,
      functionName: "createProposal",
      args: [
        description,
        target as `0x${string}`,
        value,
        data as `0x${string}`,
      ],
    });
  };

  return {
    data,
    error,
    isPending,
    isSuccess,
    receipt,
    isLoading,
    createProposal,
  };
}
