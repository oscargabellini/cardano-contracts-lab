import { useNavigate } from "@tanstack/react-router";
import {
  ArrowLeftIcon,
  MessageSquareLock,
  ShieldCheck,
  UnlockIcon,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../components/ui/accordion";
import { Button } from "../../components/ui/button";
import { PageContainer } from "../../components/ui/page-container";
import { LockCardWithCustomMessage } from "./lock-card";
import { UnlockCardWithCustomMessage } from "./unlock-card";

export const UnlockFundsWithCustomMessagePage = () => {
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
          <LockCardWithCustomMessage />
          <UnlockCardWithCustomMessage />
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
                <MessageSquareLock className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium text-lg">Lock with Message</h3>
                <p className="text-muted-foreground">
                  When you lock funds with a message, the message is stored
                  securely in the smart contract. This adds an extra layer of
                  security to your locked funds.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <UnlockIcon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium text-lg">Unlock with Message</h3>
                <p className="text-muted-foreground">
                  To unlock your funds, you need to provide both the Lock ID and
                  the exact message you used when locking the funds. This
                  ensures that only you can access your funds.
                </p>
              </div>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
