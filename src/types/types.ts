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

export interface Proposal {
  id: bigint;
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
