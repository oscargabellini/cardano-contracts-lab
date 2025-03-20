import { ContractOptionCard } from "../components/features/contracts/contract-card-option";
import { contractOptions } from "../config/contract-options";

export const HomePage = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Select a contract</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {contractOptions.map((option, index) => (
          <ContractOptionCard key={index} option={option} />
        ))}
      </div>
    </div>
  );
};
