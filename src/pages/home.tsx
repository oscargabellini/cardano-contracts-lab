import { FileIcon } from "lucide-react";
import { ContractOptionCard } from "../components/features/contracts/contract-card-option";
import { contractOptions } from "../config";

export const HomePage = () => {
  return (
    <div className="container mx-auto py-10 px-4 sm:px-6">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-primary mb-3">
          Cardano Contracts Lab
        </h1>
        <p className="text-secondary-foreground max-w-2xl mx-auto">
          Explore simple Cardano blockchain smart contracts. Select a contract
          to try out.
        </p>
      </div>

      <div className="bg-primary/5 backdrop-blur-sm rounded-xl p-8 border border-primary/10 shadow-sm">
        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
          <FileIcon className="w-5 h-5" />
          Available Contracts
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {contractOptions.map((option, index) => (
            <ContractOptionCard key={index} option={option} />
          ))}
        </div>
      </div>
    </div>
  );
};
