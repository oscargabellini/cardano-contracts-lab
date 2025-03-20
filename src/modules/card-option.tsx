import { useNavigate } from "@tanstack/react-router";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { ContractOption } from "../config/contract-options";

interface ContractCardProps {
  option: ContractOption;
}

export const ContractCard = ({ option }: ContractCardProps) => {
  const navigate = useNavigate();

  return (
    <Card
      className="cursor-pointer hover:shadow-md transition-shadow hover:bg-primary/10"
      onClick={() => navigate({ to: option.navigateTo })}
    >
      <CardHeader>
        <CardTitle>{option.title}</CardTitle>
      </CardHeader>
      <CardContent className="text-sm text-secondary-foreground">
        <CardDescription>{option.description}</CardDescription>
      </CardContent>
    </Card>
  );
};
