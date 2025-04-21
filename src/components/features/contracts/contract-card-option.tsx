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
      className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:bg-primary/5 border-primary/10"
      onClick={() => navigate({ to: option.navigateTo })}
    >
      <CardHeader className="pb-2 flex flex-row items-center gap-4">
        <div className="p-3 rounded-full bg-primary/80 dark:bg-primary/50 text-primary-foreground">
          {option.icon}
        </div>
        <div>
          <CardTitle className="text-xl font-semibold">
            {option.title}
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="pt-3 pb-5">
        <CardDescription className="text-sm text-secondary-foreground leading-relaxed">
          {option.description}
        </CardDescription>
      </CardContent>
    </Card>
  );
};
