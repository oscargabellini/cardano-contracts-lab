import { ContractOptionCard } from "../components/features/contracts/contract-card-option";
import { contractOptions } from "../config";

export const HomePage = () => {
  return (
    <div className="container mx-auto py-6 px-4 sm:px-6">
      <div className="text-center mb-7">
        <h1 className="md:text-4xl text-3xl font-bold text-primary">
          Cardano Contracts Lab
        </h1>
      </div>
      <div className="mb-6 md:mb-12 flex flex-col gap-4">
        <h2 className="md:text-xl text-xl font-semibold">
          Explore simple Cardano blockchain smart contracts.
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {contractOptions.map((contract, index) => (
          <ContractOptionCard key={index} contract={contract} />
        ))}
      </div>
    </div>
  );
};
