# Cardano Contracts Lab

A web application for experimenting with smart contracts on the Cardano blockchain.

## Smart Contracts

The application includes the following smart contracts:

1. **Basic Lock/Unlock**: Simple contract to lock and unlock funds
2. **Message-Verified Unlock**: Contract that requires a specific message to unlock funds
3. **Quiz Contract**: Smart contract that handles questions and rewards for correct answers

All contracts are built using Aiken, a language designed for Cardano smart contracts.

## Technology Stack

- React 19
- TypeScript
- TanStack Router for navigation
- Tailwind CSS for styling
- Mesh SDK for Cardano blockchain integration
- Vite for development and building
- Radix UI components for accessible UI elements

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- A Cardano wallet (Lace, Eternl, etc.)
- Blockfrost API key ([Get one here](https://blockfrost.io/))

### Installation

1. Clone the repository

```bash
git clone <repository-url>
cd cardano-contracts-lab
```

2. Install dependencies

```bash
npm install
```

3. Create a `.env` file based on `.env.example`

```bash
cp .env.example .env
```

4. Add your Blockfrost API key to the `.env` file

5. Start the development server

```bash
npm run dev
```

## Building for Production

```bash
npm run build
```

The built application will be in the `dist` directory.

## Project Structure

- `aiken-workspace/`: Aiken smart contract code
- `public/`: Static assets
- `src/`: Source code
  - `assets/`: Images, fonts, and other static resources
  - `components/`: UI components
  - `config/`: Application configuration and constants
  - `hooks/`: Custom React hooks
  - `lib/`: Utilities and helpers
  - `pages/`:
  - `providers/`: React context providers

## Contribution

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source.
