import { useNavigate } from "@tanstack/react-router";
import { ContractOption } from "../../../config/contract-options";
import { Button } from "../../ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../ui/card";

interface ContractOptionCardProps {
  contract: ContractOption;
}

export const ContractOptionCard = ({ contract }: ContractOptionCardProps) => {
  const navigate = useNavigate();

  return (
    <Card
      key={contract.title}
      className="flex flex-col card-hover border-2 border-border/50 cursor-pointer"
      onClick={() => navigate({ to: contract.navigateTo })}
    >
      <CardHeader>
        <div className="flex justify-center mb-4 bg-primary/10 p-4 rounded-full w-20 h-20 mx-auto">
          {contract.icon}
        </div>
        <CardTitle className="text-xl">{contract.title}</CardTitle>
        <CardDescription className="text-base">
          {contract.description}
        </CardDescription>
      </CardHeader>
      <CardFooter className="mt-auto pt-6">
        <Button
          size="lg"
          className="w-full"
          onClick={() => navigate({ to: contract.navigateTo })}
        >
          Try it out
        </Button>
      </CardFooter>
    </Card>
  );
};
