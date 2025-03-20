export type ContractOption = {
  title: string;
  description: string;
  navigateTo: string;
};

export const contractOptions: ContractOption[] = [
  {
    title: "Unlock Funds",
    description:
      "Simple contract to unlock your funds to the blockchain Cardano",
    navigateTo: "/unlock-funds",
  },
  {
    title: "Unlock Funds with Custom Message",
    description:
      "Simple contract to unlock your funds to the blockchain Cardano with a custom message",
    navigateTo: "/unlock-funds-with-custom-message",
  },
];
