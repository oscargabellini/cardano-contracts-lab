import { useNavigate } from "@tanstack/react-router";
import { ArrowLeftIcon, LockIcon, ShieldCheck, UnlockIcon } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../components/ui/accordion";
import { Button } from "../../components/ui/button";
import { PageContainer } from "../../components/ui/page-container";
import { LockCard } from "./lock-card";
import { UnlockCard } from "./unlock-card";

export const UnlockFundsPage = () => {
  const navigate = useNavigate();

  return (
    <PageContainer>
      <Button
        size="lg"
        variant="link"
        className="text-secondary-foreground"
        onClick={() => navigate({ to: "/" })}
      >
        <ArrowLeftIcon className="w-4 h-4" /> Select another contract
      </Button>
      <div className="flex flex-col gap-6">
        <HowItWorks />
        <div className="flex flex-col md:grid md:grid-cols-2 gap-6 md:gap-20">
          <LockCard />
          <UnlockCard />
        </div>
      </div>
    </PageContainer>
  );
};

const HowItWorks = () => {
  return (
    <Accordion
      type="single"
      collapsible
      defaultValue="how-it-works"
      className="border-2 rounded-lg border-border/50 bg-gradient-to-br from-secondary/30 to-background"
    >
      <AccordionItem value="how-it-works" className="border-b-0">
        <AccordionTrigger className="px-6 py-4 hover:no-underline">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-semibold">How It Works</h2>
          </div>
        </AccordionTrigger>
        <AccordionContent className="px-6 pb-6 pt-2">
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <LockIcon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium text-lg">Lock Funds</h3>
                <p className="text-muted-foreground">
                  When you lock funds, they are securely stored in a Cardano
                  smart contract. You'll receive a unique Lock ID that you can
                  use to unlock your funds later.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <UnlockIcon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium text-lg">Unlock Funds</h3>
                <p className="text-muted-foreground">
                  To unlock your funds, simply provide the Lock ID. The smart
                  contract will verify your ownership and return the funds to
                  your wallet.
                </p>
              </div>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
