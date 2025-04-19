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
  title: string;
  description: string;
  target: string;
  value: bigint;
  data: string;
}

export function useCreateProposal() {
  const { data: hash, error, isPending, writeContract } = useWriteContract();

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  const createProposal = ({ title, description, target, value }: Proposal) => {
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
}

// const provider = new ethers.providers.JsonRpcProvider(
//   "https://eth-sepolia.g.alchemy.com/v2/d6TNNGOzxR3s4w8iYyWkER1C2R0mTldx",
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
