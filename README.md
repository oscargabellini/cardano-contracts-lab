# Cardano Locker

A web application for locking and unlocking funds on the Cardano blockchain using smart contracts.

## Features

- Connect to Cardano wallets (Lace, Eternl, etc.)
- Lock funds on the Cardano blockchain
- Unlock funds using transaction hash verification
- Lock funds with custom messages for enhanced security
- Modern UI with dark/light theme support

## Smart Contracts

The application includes two main smart contracts:

1. **Basic Lock/Unlock**: Simple contract to lock and unlock funds
2. **Custom Message Lock/Unlock**: Contract that requires a specific message to unlock funds

All contracts are built using Aiken, a language designed for Cardano smart contracts.

## Technology Stack

- React 19
- TypeScript
- TanStack Router for navigation
- Tailwind CSS for styling
- Mesh SDK for Cardano blockchain integration
- Vite for development and building

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- A Cardano wallet (Lace, Eternl, etc.)

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

4. Start the development server

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
    - `common/`: Shared components like layout, navbar
    - `features/`: Feature-specific components
    - `ui/`: Reusable UI elements (buttons, cards, inputs)
  - `config/`: Application configuration and constants
  - `hooks/`: Custom React hooks
  - `lib/`: Utilities and helpers
    - `cardano/`: Cardano blockchain interaction code
    - `utils/`: General utility functions
  - `pages/`: Application pages
    - `home/`: Home page
    - `lock/`: Lock funds pages
    - `unlock/`: Unlock funds pages
  - `providers/`: React context providers
  - `styles/`: Global styles
  - `types/`: TypeScript type definitions

## Contribution

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source.
