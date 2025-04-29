// useNGODAO.ts
import {
  useReadContract,
  useAccount,
  useWaitForTransactionReceipt,
  useWriteContract,
  usePublicClient,
} from "wagmi";
import { NGODAO__factory } from "../types";
import { CreateProposal } from "../types/types.ts";

const contractConfig = {
  address: "0xe53f2315Ae1fbFd91250de7199b21AF4F0b968A2",
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

export const useVoted = (proposalId: bigint | null) => {
  const { address } = useAccount(); // The voter's wallet/account
  const voterAddress = address || ("" as `0x${string}`);

  // Provide stable fallback arguments
  const safeProposalId = proposalId ?? BigInt(0); // Use `BigInt(0)` when proposalId is invalid
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

export const useCreateProposal = () => {
  const { data: hash, error, isPending, writeContract } = useWriteContract();

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  const createProposal = ({
    title,
    description,
    target,
    value,
  }: CreateProposal) => {
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
    createProposal,
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

// const provider = new ethers.providers.JsonRpcProvider(
//   "",
// ); // Replace with your provider
// const signer = provider.getSigner(); // Ensure the wallet is properly funded
//
// debugger;
// const contract = new ethers.Contract(
//   "0xe65920D17678aaC3C51bEbf713F2B0e2bFaa34Fa",
//   NGODAO__factory.abi,
//   signer,
// );
//
// const testTx = async () => {
//   try {
//     const tx = await contract.createProposal(
//       "Proposal Title",
//       "Proposal Description",
//       "0x41ff68675f8460C6e08312843DA47E9975Edbfcb",
//       BigInt(1000),
//       "",
//     );
//     console.log("Transaction submitted: ", tx);
//   } catch (error: any) {
//     console.error("Transaction Error:", error);
//   }
// };
// testTx();

// const provider = new ethers.providers.JsonRpcProvider(
//   "",
// );
// // Replace with the private key of the account you want to use for signing:
// const signer = new ethers.Wallet(
//   "", // Replace with your private key securely
//   provider,
// );
//
// const contract = NGODAO__factory.connect(
//   "0xe65920D17678aaC3C51bEbf713F2B0e2bFaa34Fa",
//   signer, // Use the signer instead of the provider
// );
//
// async function testCreatingProposal() {
//   const contractTransaction = await contract.createProposal(
//     "Proposal Title",
//     "Proposal Description",
//     "0x41ff68675f8460C6e08312843DA47E9975Edbfcb",
//     BigInt(1000), // Correct BigNumberish
//     "0x", // Correct replacement for empty data
//   );
//   console.log("Contract transaction: ", contractTransaction);
// }

// testCreatingProposal();
