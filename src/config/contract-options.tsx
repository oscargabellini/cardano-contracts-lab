import { FileQuestionIcon, KeyIcon, MessageSquareLock } from "lucide-react";

export type ContractOption = {
  title: string;
  description: string;
  navigateTo: string;
  icon: React.ReactNode;
};

export const contractOptions: ContractOption[] = [
  {
    title: "Basic Asset Unlock",
    description:
      "Secure your ADA with a signature-based unlock mechanism that only you can access",
    navigateTo: "/unlock-funds",
    icon: <KeyIcon className="w-10 h-10 text-primary" />,
  },
  {
    title: "Message-Verified Unlock",
    description:
      "Enhanced security: lock your ADA with a custom message that must be provided exactly to release funds",
    navigateTo: "/unlock-funds-with-custom-message",
    icon: <MessageSquareLock className="w-10 h-10 text-primary" />,
  },
  {
    title: "Quiz",
    description:
      "A smart contract that enables on-chain quiz games where users can lock ADA as prizes, create questions with hashed answers, and reward correct submissions with the locked funds.",
    navigateTo: "/quiz",
    icon: <FileQuestionIcon className="w-10 h-10 text-primary" />,
  },
];
