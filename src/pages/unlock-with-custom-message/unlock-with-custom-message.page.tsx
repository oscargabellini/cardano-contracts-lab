import { useNavigate } from "@tanstack/react-router";
import { ArrowLeftIcon } from "lucide-react";
import { Button } from "../../components/ui/button";
import { LockCardWithCustomMessage } from "./lock-card";
import { UnlockCardWithCustomMessage } from "./unlock-card";

export const UnlockFundsWithCustomMessagePage = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto p-6">
      <Button
        variant="link"
        className="text-secondary-foreground"
        onClick={() => navigate({ to: "/" })}
      >
        <ArrowLeftIcon className="w-4 h-4" /> Select another contract
      </Button>
      <div className="flex flex-col md:grid md:grid-cols-2 gap-6 md:gap-20">
        <LockCardWithCustomMessage />
        <UnlockCardWithCustomMessage />
      </div>
    </div>
  );
};
