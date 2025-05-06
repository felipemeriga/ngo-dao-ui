# NGO DAO UI

A decentralized application (dApp) interface for managing an NGO's decentralized autonomous organization (DAO). This platform enables volunteers to contribute ETH and participate in democratic decision-making for fund allocation.

## Overview

This dApp serves as the front-end interface for an NGO DAO smart contract ([View Smart Contract Repository](https://github.com/felipemeriga/ngo-dao)), creating a complete decentralized solution for NGO fund management and decision-making.

### Core Functionality

The application enables NGO volunteers to:
- Contribute ETH to the NGO's treasury
- Create and submit funding proposals
- Participate in democratic voting on proposals
- Execute approved proposals by DAO's owner after deadline

### Key Features

- **Web3 Integration**:
    - Seamless wallet connection
    - Real-time blockchain interactions
    - Transaction status tracking

- **Proposal Management**:
    - Create detailed funding proposals
    - Set funding amounts and beneficiary addresses
    - Define voting deadlines

- **Voting System**:
    - One vote per wallet address
    - Real-time vote counting
    - Automatic status updates

- **Dashboard Analytics**:
    - Total donations tracking
    - Individual contribution history
    - Active proposal monitoring

- **Smart Contract Integration**:
    - Direct interaction with NGO DAO contract
    - Automated proposal execution
    - Secure fund management

## Technology Stack

- **Frontend Framework**: React 19.0.0
- **Type Safety**: TypeScript 5.7.2
- **Styling**:
    - Material-UI (MUI) 6.4.8
    - Tailwind CSS 3.4.10
    - Emotion for styled components
- **Blockchain Integration**:
    - Wagmi 2.14.16
    - Viem 2.27.0
- **State Management**: TanStack Query (React Query) 5.51.23
- **Build Tool**: Vite 6.2.0
- **Code Quality**:
    - ESLint 9.21.0
    - Prettier 3.5.3

## Getting Started

### Prerequisites

- Node.js (LTS version recommended)
- npm package manager
- MetaMask or another Ethereum wallet
- Access to Sepolia testnet (for development)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/felipemeriga/ngo-dao-ui.git
```

2. Install dependencies:
```bash
npm install
```

### Environment Setup

1. Create a `.env` file in the root directory
2. Configure the following variables:
```bash
VITE_CONTRACT_ADDRESS=<the-contract-address-to-interact>
VITE_SEPOLIA_RPC="<sepolia-rpc-url-for-testnet>"
```

## Usage Guide

### Wallet Connection

1. Click "Connect Wallet" in the header
2. Select your preferred wallet provider
3. Ensure you're connected to the correct network (Sepolia for testing)

### Making Donations

1. Access the dashboard
2. Enter your desired ETH amount
3. Confirm the transaction in your wallet
4. Wait for transaction confirmation

### Creating Proposals

1. Navigate to the proposals section
2. Click "Create New Proposal"
3. Fill in:
  - Proposal title
  - Detailed description
  - Beneficiary ETH address
  - Requested amount
4. Submit and confirm the transaction

### Voting Process

1. View active proposals in the dashboard
2. Click on a proposal to see details
3. Choose "Approve" or "Disapprove"
4. Confirm your vote transaction
5. Track voting progress in real-time

### Proposal Execution

- Approved proposals can be executed after the voting deadline
- Requires more "Yes" than "No" votes
- The proposals can only be executed by the DAO's owner
- Execution transfers funds automatically to the beneficiary

## Development

### Smart Contract Integration

The UI integrates with the [NGO DAO Smart Contract](https://github.com/felipemeriga/ngo-dao). Key integration points:

- Proposal creation and management
- Voting mechanism
- Fund transfer execution
- Donation handling

### Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feat/<feature-name>`)
3. Commit your changes (`git commit -m 'Add some <feature>'`)
4. Push to the branch (`git push origin feature/<feature-name>`)
5. Open a Pull Request