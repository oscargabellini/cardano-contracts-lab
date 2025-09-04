import { FileIcon } from "lucide-react";
import { ContractOptionCard } from "../components/features/contracts/contract-card-option";
import { contractOptions } from "../config";

export const HomePage = () => {
  return (
    <div className="container mx-auto py-6 px-4 sm:px-6">
      <div className="text-center mb-12">
        <h1 className="md:text-4xl text-3xl font-bold text-primary mb-3">
          Cardano Contracts Lab
        </h1>
      </div>
      <div className="mb-6 md:mb-12 flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <div className="rounded-lg bg-primary/10 p-2">
            <FileIcon className="h-6 w-6 text-primary" />
          </div>
          <h2 className="md:text-2xl text-xl font-semibold">
            Available Contracts
          </h2>
        </div>
        <p className="md:text-base text-sm text-secondary-foreground">
          Explore simple Cardano blockchain smart contracts. <br />
          Select a contract to try out.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {contractOptions.map((contract, index) => (
          <ContractOptionCard key={index} contract={contract} />
        ))}
      </div>
    </div>
  );
};
