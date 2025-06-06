/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PayableOverrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
} from "./common";

export type ProposalStruct = {
  id: BytesLike;
  title: string;
  description: string;
  target: string;
  value: BigNumberish;
  data: BytesLike;
  deadline: BigNumberish;
  yesVotes: BigNumberish;
  noVotes: BigNumberish;
  executed: boolean;
};

export type ProposalStructOutput = [
  string,
  string,
  string,
  string,
  BigNumber,
  string,
  BigNumber,
  BigNumber,
  BigNumber,
  boolean,
] & {
  id: string;
  title: string;
  description: string;
  target: string;
  value: BigNumber;
  data: string;
  deadline: BigNumber;
  yesVotes: BigNumber;
  noVotes: BigNumber;
  executed: boolean;
};

export interface NGODAOInterface extends utils.Interface {
  functions: {
    "UPGRADE_INTERFACE_VERSION()": FunctionFragment;
    "clearProposals()": FunctionFragment;
    "createProposal(string,string,address,uint256,bytes)": FunctionFragment;
    "donate()": FunctionFragment;
    "donations(address)": FunctionFragment;
    "executeProposal(bytes16)": FunctionFragment;
    "getAllProposals()": FunctionFragment;
    "initialize(uint256)": FunctionFragment;
    "owner()": FunctionFragment;
    "proposalIds(uint256)": FunctionFragment;
    "proposals(bytes16)": FunctionFragment;
    "proxiableUUID()": FunctionFragment;
    "renounceOwnership()": FunctionFragment;
    "totalDonations()": FunctionFragment;
    "transferOwnership(address)": FunctionFragment;
    "upgradeToAndCall(address,bytes)": FunctionFragment;
    "vote(bytes16,bool)": FunctionFragment;
    "voted(bytes16,address)": FunctionFragment;
    "votingPeriod()": FunctionFragment;
    "withdrawAll()": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "UPGRADE_INTERFACE_VERSION"
      | "clearProposals"
      | "createProposal"
      | "donate"
      | "donations"
      | "executeProposal"
      | "getAllProposals"
      | "initialize"
      | "owner"
      | "proposalIds"
      | "proposals"
      | "proxiableUUID"
      | "renounceOwnership"
      | "totalDonations"
      | "transferOwnership"
      | "upgradeToAndCall"
      | "vote"
      | "voted"
      | "votingPeriod"
      | "withdrawAll",
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "UPGRADE_INTERFACE_VERSION",
    values?: undefined,
  ): string;
  encodeFunctionData(
    functionFragment: "clearProposals",
    values?: undefined,
  ): string;
  encodeFunctionData(
    functionFragment: "createProposal",
    values: [string, string, string, BigNumberish, BytesLike],
  ): string;
  encodeFunctionData(functionFragment: "donate", values?: undefined): string;
  encodeFunctionData(functionFragment: "donations", values: [string]): string;
  encodeFunctionData(
    functionFragment: "executeProposal",
    values: [BytesLike],
  ): string;
  encodeFunctionData(
    functionFragment: "getAllProposals",
    values?: undefined,
  ): string;
  encodeFunctionData(
    functionFragment: "initialize",
    values: [BigNumberish],
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "proposalIds",
    values: [BigNumberish],
  ): string;
  encodeFunctionData(
    functionFragment: "proposals",
    values: [BytesLike],
  ): string;
  encodeFunctionData(
    functionFragment: "proxiableUUID",
    values?: undefined,
  ): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined,
  ): string;
  encodeFunctionData(
    functionFragment: "totalDonations",
    values?: undefined,
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [string],
  ): string;
  encodeFunctionData(
    functionFragment: "upgradeToAndCall",
    values: [string, BytesLike],
  ): string;
  encodeFunctionData(
    functionFragment: "vote",
    values: [BytesLike, boolean],
  ): string;
  encodeFunctionData(
    functionFragment: "voted",
    values: [BytesLike, string],
  ): string;
  encodeFunctionData(
    functionFragment: "votingPeriod",
    values?: undefined,
  ): string;
  encodeFunctionData(
    functionFragment: "withdrawAll",
    values?: undefined,
  ): string;

  decodeFunctionResult(
    functionFragment: "UPGRADE_INTERFACE_VERSION",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: "clearProposals",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: "createProposal",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(functionFragment: "donate", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "donations", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "executeProposal",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: "getAllProposals",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(functionFragment: "initialize", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "proposalIds",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(functionFragment: "proposals", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "proxiableUUID",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: "totalDonations",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: "upgradeToAndCall",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(functionFragment: "vote", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "voted", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "votingPeriod",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: "withdrawAll",
    data: BytesLike,
  ): Result;

  events: {
    "DonationReceived(address,uint256)": EventFragment;
    "Initialized(uint64)": EventFragment;
    "OwnershipTransferred(address,address)": EventFragment;
    "ProposalCreated(bytes16,string,string,address,uint256,uint256)": EventFragment;
    "ProposalExecuted(bytes16,bool)": EventFragment;
    "Upgraded(address)": EventFragment;
    "VoteCast(bytes16,address,bool)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "DonationReceived"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Initialized"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "ProposalCreated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "ProposalExecuted"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Upgraded"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "VoteCast"): EventFragment;
}

export interface DonationReceivedEventObject {
  donor: string;
  amount: BigNumber;
}
export type DonationReceivedEvent = TypedEvent<
  [string, BigNumber],
  DonationReceivedEventObject
>;

export type DonationReceivedEventFilter =
  TypedEventFilter<DonationReceivedEvent>;

export interface InitializedEventObject {
  version: BigNumber;
}
export type InitializedEvent = TypedEvent<[BigNumber], InitializedEventObject>;

export type InitializedEventFilter = TypedEventFilter<InitializedEvent>;

export interface OwnershipTransferredEventObject {
  previousOwner: string;
  newOwner: string;
}
export type OwnershipTransferredEvent = TypedEvent<
  [string, string],
  OwnershipTransferredEventObject
>;

export type OwnershipTransferredEventFilter =
  TypedEventFilter<OwnershipTransferredEvent>;

export interface ProposalCreatedEventObject {
  proposalId: string;
  title: string;
  description: string;
  target: string;
  value: BigNumber;
  deadline: BigNumber;
}
export type ProposalCreatedEvent = TypedEvent<
  [string, string, string, string, BigNumber, BigNumber],
  ProposalCreatedEventObject
>;

export type ProposalCreatedEventFilter = TypedEventFilter<ProposalCreatedEvent>;

export interface ProposalExecutedEventObject {
  proposalId: string;
  success: boolean;
}
export type ProposalExecutedEvent = TypedEvent<
  [string, boolean],
  ProposalExecutedEventObject
>;

export type ProposalExecutedEventFilter =
  TypedEventFilter<ProposalExecutedEvent>;

export interface UpgradedEventObject {
  implementation: string;
}
export type UpgradedEvent = TypedEvent<[string], UpgradedEventObject>;

export type UpgradedEventFilter = TypedEventFilter<UpgradedEvent>;

export interface VoteCastEventObject {
  proposalId: string;
  voter: string;
  support: boolean;
}
export type VoteCastEvent = TypedEvent<
  [string, string, boolean],
  VoteCastEventObject
>;

export type VoteCastEventFilter = TypedEventFilter<VoteCastEvent>;

export interface NGODAO extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: NGODAOInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined,
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>,
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>,
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    UPGRADE_INTERFACE_VERSION(overrides?: CallOverrides): Promise<[string]>;

    clearProposals(
      overrides?: Overrides & { from?: string },
    ): Promise<ContractTransaction>;

    createProposal(
      _title: string,
      _description: string,
      _target: string,
      _value: BigNumberish,
      _data: BytesLike,
      overrides?: Overrides & { from?: string },
    ): Promise<ContractTransaction>;

    donate(
      overrides?: PayableOverrides & { from?: string },
    ): Promise<ContractTransaction>;

    donations(arg0: string, overrides?: CallOverrides): Promise<[BigNumber]>;

    executeProposal(
      proposalId: BytesLike,
      overrides?: Overrides & { from?: string },
    ): Promise<ContractTransaction>;

    getAllProposals(
      overrides?: CallOverrides,
    ): Promise<[ProposalStructOutput[]]>;

    initialize(
      _votingPeriod: BigNumberish,
      overrides?: Overrides & { from?: string },
    ): Promise<ContractTransaction>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    proposalIds(
      arg0: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<[string]>;

    proposals(
      arg0: BytesLike,
      overrides?: CallOverrides,
    ): Promise<
      [
        string,
        string,
        string,
        string,
        BigNumber,
        string,
        BigNumber,
        BigNumber,
        BigNumber,
        boolean,
      ] & {
        id: string;
        title: string;
        description: string;
        target: string;
        value: BigNumber;
        data: string;
        deadline: BigNumber;
        yesVotes: BigNumber;
        noVotes: BigNumber;
        executed: boolean;
      }
    >;

    proxiableUUID(overrides?: CallOverrides): Promise<[string]>;

    renounceOwnership(
      overrides?: Overrides & { from?: string },
    ): Promise<ContractTransaction>;

    totalDonations(overrides?: CallOverrides): Promise<[BigNumber]>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string },
    ): Promise<ContractTransaction>;

    upgradeToAndCall(
      newImplementation: string,
      data: BytesLike,
      overrides?: PayableOverrides & { from?: string },
    ): Promise<ContractTransaction>;

    vote(
      proposalId: BytesLike,
      support: boolean,
      overrides?: Overrides & { from?: string },
    ): Promise<ContractTransaction>;

    voted(
      arg0: BytesLike,
      arg1: string,
      overrides?: CallOverrides,
    ): Promise<[boolean]>;

    votingPeriod(overrides?: CallOverrides): Promise<[BigNumber]>;

    withdrawAll(
      overrides?: Overrides & { from?: string },
    ): Promise<ContractTransaction>;
  };

  UPGRADE_INTERFACE_VERSION(overrides?: CallOverrides): Promise<string>;

  clearProposals(
    overrides?: Overrides & { from?: string },
  ): Promise<ContractTransaction>;

  createProposal(
    _title: string,
    _description: string,
    _target: string,
    _value: BigNumberish,
    _data: BytesLike,
    overrides?: Overrides & { from?: string },
  ): Promise<ContractTransaction>;

  donate(
    overrides?: PayableOverrides & { from?: string },
  ): Promise<ContractTransaction>;

  donations(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

  executeProposal(
    proposalId: BytesLike,
    overrides?: Overrides & { from?: string },
  ): Promise<ContractTransaction>;

  getAllProposals(overrides?: CallOverrides): Promise<ProposalStructOutput[]>;

  initialize(
    _votingPeriod: BigNumberish,
    overrides?: Overrides & { from?: string },
  ): Promise<ContractTransaction>;

  owner(overrides?: CallOverrides): Promise<string>;

  proposalIds(arg0: BigNumberish, overrides?: CallOverrides): Promise<string>;

  proposals(
    arg0: BytesLike,
    overrides?: CallOverrides,
  ): Promise<
    [
      string,
      string,
      string,
      string,
      BigNumber,
      string,
      BigNumber,
      BigNumber,
      BigNumber,
      boolean,
    ] & {
      id: string;
      title: string;
      description: string;
      target: string;
      value: BigNumber;
      data: string;
      deadline: BigNumber;
      yesVotes: BigNumber;
      noVotes: BigNumber;
      executed: boolean;
    }
  >;

  proxiableUUID(overrides?: CallOverrides): Promise<string>;

  renounceOwnership(
    overrides?: Overrides & { from?: string },
  ): Promise<ContractTransaction>;

  totalDonations(overrides?: CallOverrides): Promise<BigNumber>;

  transferOwnership(
    newOwner: string,
    overrides?: Overrides & { from?: string },
  ): Promise<ContractTransaction>;

  upgradeToAndCall(
    newImplementation: string,
    data: BytesLike,
    overrides?: PayableOverrides & { from?: string },
  ): Promise<ContractTransaction>;

  vote(
    proposalId: BytesLike,
    support: boolean,
    overrides?: Overrides & { from?: string },
  ): Promise<ContractTransaction>;

  voted(
    arg0: BytesLike,
    arg1: string,
    overrides?: CallOverrides,
  ): Promise<boolean>;

  votingPeriod(overrides?: CallOverrides): Promise<BigNumber>;

  withdrawAll(
    overrides?: Overrides & { from?: string },
  ): Promise<ContractTransaction>;

  callStatic: {
    UPGRADE_INTERFACE_VERSION(overrides?: CallOverrides): Promise<string>;

    clearProposals(overrides?: CallOverrides): Promise<void>;

    createProposal(
      _title: string,
      _description: string,
      _target: string,
      _value: BigNumberish,
      _data: BytesLike,
      overrides?: CallOverrides,
    ): Promise<string>;

    donate(overrides?: CallOverrides): Promise<void>;

    donations(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

    executeProposal(
      proposalId: BytesLike,
      overrides?: CallOverrides,
    ): Promise<void>;

    getAllProposals(overrides?: CallOverrides): Promise<ProposalStructOutput[]>;

    initialize(
      _votingPeriod: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<void>;

    owner(overrides?: CallOverrides): Promise<string>;

    proposalIds(arg0: BigNumberish, overrides?: CallOverrides): Promise<string>;

    proposals(
      arg0: BytesLike,
      overrides?: CallOverrides,
    ): Promise<
      [
        string,
        string,
        string,
        string,
        BigNumber,
        string,
        BigNumber,
        BigNumber,
        BigNumber,
        boolean,
      ] & {
        id: string;
        title: string;
        description: string;
        target: string;
        value: BigNumber;
        data: string;
        deadline: BigNumber;
        yesVotes: BigNumber;
        noVotes: BigNumber;
        executed: boolean;
      }
    >;

    proxiableUUID(overrides?: CallOverrides): Promise<string>;

    renounceOwnership(overrides?: CallOverrides): Promise<void>;

    totalDonations(overrides?: CallOverrides): Promise<BigNumber>;

    transferOwnership(
      newOwner: string,
      overrides?: CallOverrides,
    ): Promise<void>;

    upgradeToAndCall(
      newImplementation: string,
      data: BytesLike,
      overrides?: CallOverrides,
    ): Promise<void>;

    vote(
      proposalId: BytesLike,
      support: boolean,
      overrides?: CallOverrides,
    ): Promise<void>;

    voted(
      arg0: BytesLike,
      arg1: string,
      overrides?: CallOverrides,
    ): Promise<boolean>;

    votingPeriod(overrides?: CallOverrides): Promise<BigNumber>;

    withdrawAll(overrides?: CallOverrides): Promise<void>;
  };

  filters: {
    "DonationReceived(address,uint256)"(
      donor?: string | null,
      amount?: null,
    ): DonationReceivedEventFilter;
    DonationReceived(
      donor?: string | null,
      amount?: null,
    ): DonationReceivedEventFilter;

    "Initialized(uint64)"(version?: null): InitializedEventFilter;
    Initialized(version?: null): InitializedEventFilter;

    "OwnershipTransferred(address,address)"(
      previousOwner?: string | null,
      newOwner?: string | null,
    ): OwnershipTransferredEventFilter;
    OwnershipTransferred(
      previousOwner?: string | null,
      newOwner?: string | null,
    ): OwnershipTransferredEventFilter;

    "ProposalCreated(bytes16,string,string,address,uint256,uint256)"(
      proposalId?: BytesLike | null,
      title?: null,
      description?: null,
      target?: null,
      value?: null,
      deadline?: null,
    ): ProposalCreatedEventFilter;
    ProposalCreated(
      proposalId?: BytesLike | null,
      title?: null,
      description?: null,
      target?: null,
      value?: null,
      deadline?: null,
    ): ProposalCreatedEventFilter;

    "ProposalExecuted(bytes16,bool)"(
      proposalId?: BytesLike | null,
      success?: null,
    ): ProposalExecutedEventFilter;
    ProposalExecuted(
      proposalId?: BytesLike | null,
      success?: null,
    ): ProposalExecutedEventFilter;

    "Upgraded(address)"(implementation?: string | null): UpgradedEventFilter;
    Upgraded(implementation?: string | null): UpgradedEventFilter;

    "VoteCast(bytes16,address,bool)"(
      proposalId?: BytesLike | null,
      voter?: string | null,
      support?: null,
    ): VoteCastEventFilter;
    VoteCast(
      proposalId?: BytesLike | null,
      voter?: string | null,
      support?: null,
    ): VoteCastEventFilter;
  };

  estimateGas: {
    UPGRADE_INTERFACE_VERSION(overrides?: CallOverrides): Promise<BigNumber>;

    clearProposals(
      overrides?: Overrides & { from?: string },
    ): Promise<BigNumber>;

    createProposal(
      _title: string,
      _description: string,
      _target: string,
      _value: BigNumberish,
      _data: BytesLike,
      overrides?: Overrides & { from?: string },
    ): Promise<BigNumber>;

    donate(
      overrides?: PayableOverrides & { from?: string },
    ): Promise<BigNumber>;

    donations(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

    executeProposal(
      proposalId: BytesLike,
      overrides?: Overrides & { from?: string },
    ): Promise<BigNumber>;

    getAllProposals(overrides?: CallOverrides): Promise<BigNumber>;

    initialize(
      _votingPeriod: BigNumberish,
      overrides?: Overrides & { from?: string },
    ): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    proposalIds(
      arg0: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<BigNumber>;

    proposals(arg0: BytesLike, overrides?: CallOverrides): Promise<BigNumber>;

    proxiableUUID(overrides?: CallOverrides): Promise<BigNumber>;

    renounceOwnership(
      overrides?: Overrides & { from?: string },
    ): Promise<BigNumber>;

    totalDonations(overrides?: CallOverrides): Promise<BigNumber>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string },
    ): Promise<BigNumber>;

    upgradeToAndCall(
      newImplementation: string,
      data: BytesLike,
      overrides?: PayableOverrides & { from?: string },
    ): Promise<BigNumber>;

    vote(
      proposalId: BytesLike,
      support: boolean,
      overrides?: Overrides & { from?: string },
    ): Promise<BigNumber>;

    voted(
      arg0: BytesLike,
      arg1: string,
      overrides?: CallOverrides,
    ): Promise<BigNumber>;

    votingPeriod(overrides?: CallOverrides): Promise<BigNumber>;

    withdrawAll(overrides?: Overrides & { from?: string }): Promise<BigNumber>;
  };

  populateTransaction: {
    UPGRADE_INTERFACE_VERSION(
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;

    clearProposals(
      overrides?: Overrides & { from?: string },
    ): Promise<PopulatedTransaction>;

    createProposal(
      _title: string,
      _description: string,
      _target: string,
      _value: BigNumberish,
      _data: BytesLike,
      overrides?: Overrides & { from?: string },
    ): Promise<PopulatedTransaction>;

    donate(
      overrides?: PayableOverrides & { from?: string },
    ): Promise<PopulatedTransaction>;

    donations(
      arg0: string,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;

    executeProposal(
      proposalId: BytesLike,
      overrides?: Overrides & { from?: string },
    ): Promise<PopulatedTransaction>;

    getAllProposals(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    initialize(
      _votingPeriod: BigNumberish,
      overrides?: Overrides & { from?: string },
    ): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    proposalIds(
      arg0: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;

    proposals(
      arg0: BytesLike,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;

    proxiableUUID(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    renounceOwnership(
      overrides?: Overrides & { from?: string },
    ): Promise<PopulatedTransaction>;

    totalDonations(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string },
    ): Promise<PopulatedTransaction>;

    upgradeToAndCall(
      newImplementation: string,
      data: BytesLike,
      overrides?: PayableOverrides & { from?: string },
    ): Promise<PopulatedTransaction>;

    vote(
      proposalId: BytesLike,
      support: boolean,
      overrides?: Overrides & { from?: string },
    ): Promise<PopulatedTransaction>;

    voted(
      arg0: BytesLike,
      arg1: string,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;

    votingPeriod(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    withdrawAll(
      overrides?: Overrides & { from?: string },
    ): Promise<PopulatedTransaction>;
  };
}
