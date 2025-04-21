import { useNavigate } from "@tanstack/react-router";
import { ArrowLeftIcon } from "lucide-react";
import { Button } from "../../components/ui/button";
import { PageContainer } from "../../components/ui/page-container";
import { LockCard } from "./lock-card";
import { UnlockCard } from "./unlock-card";

export const UnlockFundsPage = () => {
  const navigate = useNavigate();

  return (
    <PageContainer>
      <Button
        variant="link"
        className="text-secondary-foreground"
        onClick={() => navigate({ to: "/" })}
      >
        <ArrowLeftIcon className="w-4 h-4" /> Select another contract
      </Button>
      <div className="flex flex-col md:grid md:grid-cols-2 gap-6 md:gap-20">
        <LockCard />
        <UnlockCard />
      </div>
    </PageContainer>
  );
};
