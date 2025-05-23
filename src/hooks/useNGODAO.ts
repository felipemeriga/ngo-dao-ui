/* eslint-disable react-hooks/rules-of-hooks */
// useNGODAO.ts
import {
  useReadContract,
  useAccount,
  useWaitForTransactionReceipt,
  useWriteContract,
  usePublicClient,
} from "wagmi";
import { NGODAO__factory } from "../types";
import {
  CreateProposal,
  Donate,
  Vote,
  WriteContractHook,
} from "../types/types.ts";

const contractConfig = {
  address: import.meta.env.VITE_CONTRACT_ADDRESS as `0x${string}`,
  abi: NGODAO__factory.abi,
};

export const useProposals = () => {
  return useReadContract({
    address: contractConfig.address as `0x${string}`,
    abi: contractConfig.abi,
    functionName: "getAllProposals",
  });
};

export const useVotingPeriod = () => {
  return useReadContract({
    address: contractConfig.address as `0x${string}`,
    abi: NGODAO__factory.abi,
    functionName: "votingPeriod",
  });
};

export const useTotalDonations = () => {
  return useReadContract({
    address: contractConfig.address as `0x${string}`,
    abi: NGODAO__factory.abi,
    functionName: "totalDonations",
  });
};

export const useDonations = () => {
  const { address } = useAccount();
  const walletAddress = address || ("" as `0x${string}`); // Use an empty string if

  return useReadContract({
    address: contractConfig.address as `0x${string}`,
    abi: contractConfig.abi,
    functionName: "donations",
    args: [walletAddress], // Pass the donor address to the mapping
  });
};

export const useContractOwner = (): boolean => {
  const { address: connectedAddress } = useAccount();
  if (!connectedAddress) {
    return false;
  }

  const {
    data: contractOwner,
    error,
    isLoading,
  } = useReadContract({
    address: contractConfig.address as `0x${string}`,
    abi: contractConfig.abi,
    functionName: "owner",
  });
  if (!isLoading && !error) {
    return connectedAddress === contractOwner;
  }

  return false;
};

export const useVoted = (proposalId: `0x${string}` | null) => {
  const { address } = useAccount(); // The voter's wallet/account
  const voterAddress = address || ("" as `0x${string}`);

  // Provide stable fallback arguments
  const safeProposalId = proposalId ?? ("0x0" as `0x${string}`);
  const shouldFetch = proposalId !== null;

  // Always call the hook, but use valid placeholder arguments
  const result = useReadContract({
    address: contractConfig.address as `0x${string}`,
    abi: contractConfig.abi,
    functionName: "voted",
    args: [safeProposalId, voterAddress], // Stable arguments for invalid/placeholder IDs
  });

  // Return additional state indicating whether fetch should have occurred
  return {
    ...result,
    shouldFetch,
  };
};

export const useDonate = (): WriteContractHook<Donate> => {
  // Hook for writing to the contract
  const {
    data: donationTxHash,
    error,
    isPending,
    writeContract,
  } = useWriteContract();

  // Hook to track transaction confirmation state
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash: donationTxHash,
    });

  // Function to trigger the donation transaction
  const write = (donate: Donate) => {
    writeContract({
      abi: NGODAO__factory.abi,
      address: contractConfig.address as `0x${string}`,
      functionName: "donate",
      args: [],
      value: donate.value,
    });
  };

  return {
    hash: donationTxHash,
    write, // Function to trigger the donation
    isPending, // Transaction submission state
    isConfirming, // Transaction confirmation in-progress
    isConfirmed, // Transaction successfully confirmed
    error, // Error in case the transaction fails
  };
};

export const useCreateProposal = (): WriteContractHook<CreateProposal> => {
  const { data: hash, error, isPending, writeContract } = useWriteContract();

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  const write = ({ title, description, target, value }: CreateProposal) => {
    writeContract({
      abi: NGODAO__factory.abi,
      address: contractConfig.address as `0x${string}`,
      functionName: "createProposal",
      args: [title, description, target as `0x${string}`, value, "0x"],
    });
  };

  return {
    hash,
    error,
    isPending,
    isConfirming,
    isConfirmed,
    write,
  };
};

export const useVote = (): WriteContractHook<Vote> => {
  const { data: hash, error, isPending, writeContract } = useWriteContract();

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  const vote = ({ proposalId, vote }: Vote) => {
    writeContract({
      abi: NGODAO__factory.abi,
      address: contractConfig.address as `0x${string}`,
      functionName: "vote",
      args: [proposalId, vote],
    });
  };

  return {
    hash,
    error,
    isPending,
    isConfirming,
    isConfirmed,
    write: vote,
  };
};

export const useExecute = (): WriteContractHook<`0x${string}`> => {
  const { data: hash, error, isPending, writeContract } = useWriteContract();

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  const execute = (proposalId: `0x${string}`) => {
    writeContract({
      abi: NGODAO__factory.abi,
      address: contractConfig.address as `0x${string}`,
      functionName: "executeProposal",
      args: [proposalId],
    });
  };

  return {
    hash,
    error,
    isPending,
    isConfirming,
    isConfirmed,
    write: execute,
  };
};

export const useEtherScanLink = (
  address: string,
  isTransaction: boolean,
): string | null => {
  const publicClient = usePublicClient();
  const chainId = publicClient?.chain.id; // Get current chain ID

  // Define EtherScanLink base URLs mapped by chainId
  const etherScanBaseUrls: { [networkId: number]: string } = {
    1: "https://etherscan.io", // Ethereum Mainnet
    137: "https://polygonscan.com", // Polygon Mainnet
    11155111: "https://sepolia.etherscan.io", // Sepolia
    // Add more as needed
  };

  const baseUrl = chainId ? etherScanBaseUrls[chainId] : null;
  const type = isTransaction ? "tx" : "address";

  // Return the full EtherScan link if the chain is supported, otherwise null
  return baseUrl ? `${baseUrl}/${type}/${address}` : null;
};
