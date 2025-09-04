import { useWallet } from "@meshsdk/react";
import { useForm } from "@tanstack/react-form";
import { useState } from "react";
import { TransactionDetails } from "../../../components/features/transaction-details";
import { ActionButton } from "../../../components/ui/action-button";
import { AlertBox } from "../../../components/ui/alert-box";
import { Button } from "../../../components/ui/button";
import { InputField } from "../../../components/ui/input/input-field";
import { useToast } from "../../../components/ui/toast";
import { TransactionCard } from "../../../components/ui/transaction-card";
import { WalletButton } from "../../../components/ui/wallet/wallet";
import { lockAsset } from "../../../lib/cardano/unlock-assets/lock-assets";

export const LockCard = (props: {
  onComplete: (transactionDetails: TransactionDetails) => void;
  onClose?: () => void;
}) => {
  const { connected, wallet } = useWallet();
  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm({
    defaultValues: {
      amount: "",
    },
    onSubmit: async ({ value }) => {
      try {
        setIsLoading(true);
        const txHash = await lockAsset(wallet, [
          { unit: "lovelace", quantity: String(+value.amount * 1000000) },
        ]);

        props.onComplete({
          txHash,
          action: "Lock Funds",
          amount: +value.amount,
        });
      } catch (error: any) {
        toast({
          title: "Transaction failed",
          description: error.info || error.message,
          variant: "destructive",
        });
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <TransactionCard>
      <div className="flex flex-col gap-5">
        <AlertBox variant="info">
          Enter the amount of ADA you want to lock on the blockchain.
        </AlertBox>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <div className="flex flex-col gap-4">
            <form.Field
              name="amount"
              validators={{
                onSubmit: ({ value }) => {
                  if (!value.trim()) return "Amount is required";
                  const numValue = Number(value);
                  if (numValue < 2)
                    return "Amount must be greater than or equal to 2";
                  return undefined;
                },
              }}
              children={(field) => {
                return (
                  <InputField
                    label="Amount"
                    name={field.name}
                    type="number"
                    placeholder="Enter the amount here..."
                    field={field}
                    disabled={isLoading}
                  />
                );
              }}
            />

            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
              children={([canSubmit, isSubmitting]) => (
                <div className="flex flex-col-reverse md:flex-row gap-4 pt-2 w-full mt-4 justify-end">
                  {props.onClose && (
                    <Button variant="secondary" onClick={props.onClose}>
                      Close
                    </Button>
                  )}
                  {connected ? (
                    <ActionButton
                      type="submit"
                      isLoading={isLoading || isSubmitting}
                      disabled={!canSubmit}
                      variant="primary"
                    >
                      Lock Funds
                    </ActionButton>
                  ) : (
                    <WalletButton />
                  )}
                </div>
              )}
            />
          </div>
        </form>
      </div>
    </TransactionCard>
  );
};
