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
