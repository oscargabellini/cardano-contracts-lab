import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { CheckCircleIcon, CopyIcon, ExternalLinkIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Modal } from "../ui/modal/modal";
import { useToast } from "../ui/toast";

export type TransactionDetails = {
  txHash: string;
  action:
    | "Lock Funds"
    | "Unlock Funds"
    | "Lock Funds with Password"
    | "Unlock Funds with Password";
  amount: number;
};

export type TransactionDetailsModalProps = {
  transactionDetails: TransactionDetails;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export const TransactionDetailsModal = (
  props: TransactionDetailsModalProps
) => {
  const { toast } = useToast();

  return (
    <Modal open={props.open} onOpenChange={props.onOpenChange}>
      <Modal.Content className="max-h-[90vh] h-[820px] md:h-auto">
        <VisuallyHidden>
          <Modal.Header>
            <Modal.Title>Transaction Completed</Modal.Title>
          </Modal.Header>
        </VisuallyHidden>
        <div>
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-60 pointer-events-none" />
          <div className="absolute -top-2 -right-2 w-16 h-16 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-xl pointer-events-none" />

          <div className="flex flex-col items-center mb-4">
            <div className="relative mb-4">
              <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl blur-sm opacity-60" />
              <div className="relative bg-gradient-to-r from-green-500 to-emerald-600 p-3 rounded-2xl shadow-lg">
                <CheckCircleIcon className="h-5 w-5 text-white" />
              </div>
            </div>
            <p className="text-xl font-bold text-card-foreground mb-2">
              Transaction Completed
            </p>
            <div className="h-1 w-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full" />
          </div>

          <div className="space-y-4">
            <div className="flex flex-col gap-4">
              <div className="bg-secondary/50 rounded-lg p-4 border border-border">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <span className="text-sm font-medium text-muted-foreground">
                    Action
                  </span>
                </div>
                <p className="text-lg font-semibold text-card-foreground">
                  {props.transactionDetails.action}
                </p>
              </div>

              <div className="bg-secondary/50 rounded-lg p-4 border border-border">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <span className="text-sm font-medium text-muted-foreground">
                    Amount
                  </span>
                </div>
                <p className="text-lg font-semibold text-card-foreground">
                  {props.transactionDetails.amount} ADA
                </p>
              </div>
            </div>

            <div className="bg-secondary/30 rounded-lg p-4 border border-border">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 bg-primary rounded-full" />
                <span className="text-sm font-medium text-muted-foreground">
                  Transaction Hash
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <code className="flex-1 text-sm bg-background/50 rounded px-3 py-2 font-mono text-card-foreground break-all">
                  {props.transactionDetails.txHash}
                </code>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    navigator.clipboard.writeText(
                      props.transactionDetails.txHash
                    );
                    toast({
                      title: "Transaction hash copied to clipboard",
                      variant: "success",
                    });
                  }}
                >
                  <CopyIcon className="w-4 h-4 mr-2" />
                  Copy
                </Button>
              </div>
            </div>

            <div className="flex md:flex-row flex-col-reverse gap-4 pt-2 justify-end">
              <Button
                variant="secondary"
                onClick={() => {
                  props.onOpenChange(false);
                }}
              >
                Close
              </Button>
              <Button
                variant="default"
                className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
                asChild
              >
                <a
                  href={`https://preprod.cexplorer.io/tx/${props.transactionDetails.txHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2"
                >
                  <img
                    src="/logo_cex_cardano.svg"
                    alt="Cardano Explorer"
                    className="w-5 h-5"
                  />
                  View in Cardano Explorer{" "}
                  <ExternalLinkIcon className="w-5 h-5" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </Modal.Content>
    </Modal>
  );
};
