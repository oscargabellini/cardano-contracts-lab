import { useNavigate } from "@tanstack/react-router";
import { ContractOption } from "../../../config/contract-options";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../ui/card";

interface ContractOptionCardProps {
  option: ContractOption;
}

export const ContractOptionCard = ({ option }: ContractOptionCardProps) => {
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
