import { type WriteContractErrorType } from "@wagmi/core";
import { QueryObserverResult } from "@tanstack/react-query";
import { ReadContractErrorType } from "viem";

export interface CreateProposalForm {
  title: string;
  description: string;
  target: string;
  value: number;
  data: string;
}

export interface CreateProposal {
  title: string;
  description: string;
  target: string;
  value: bigint;
  data: string;
}

export interface DonateForm {
  value: number;
}

export interface Donate {
  value: bigint;
}

export interface Vote {
  proposalId: `0x${string}`;
  vote: boolean;
}

export interface Proposal {
  id: `0x${string}`;
  title: string;
  description: string;
  target: `0x${string}`; // Ethereum address
  value: bigint;
  data: `0x${string}`; // Hexadecimal data
  deadline: bigint;
  yesVotes: bigint;
  noVotes: bigint;
  executed: boolean;
}

export interface WriteContractHook<T> {
  hash: string | undefined;
  error: WriteContractErrorType | null;
  isPending: boolean;
  isConfirming: boolean;
  isConfirmed: boolean;
  write: (data: T) => void;
}

export interface HookBase {
  isLoading: boolean;
  isError: boolean;
  data: bigint | undefined;
}

export interface HookInfo extends HookBase {
  handleRefetch?: () => void;
}

export interface HookContext extends HookBase {
  refetch: () => Promise<QueryObserverResult<bigint, ReadContractErrorType>>;
}
