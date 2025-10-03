import { useWallet } from "@meshsdk/react";
import { useForm } from "@tanstack/react-form";
import { VestingTransactionDetails } from "../../components/features/vest-transaction-detail";
import { AlertBox } from "../../components/ui/alert-box";
import { FormButtons } from "../../components/ui/form-buttons";
import { InputField } from "../../components/ui/input/input-field";
import { useToast } from "../../components/ui/toast/hooks/use-toast";
import { TransactionCard } from "../../components/ui/transaction-card";
import { useUnvestingMutation } from "../../lib/mutations/use-unvesting-mutation";

type UnvestingFormProps = {
  onComplete: (transactionDetails: VestingTransactionDetails) => void;
  onClose?: () => void;
};
export const UnvestingForm = (props: UnvestingFormProps) => {
  const { wallet } = useWallet();
  const { toast } = useToast();

  const unvestingMutation = useUnvestingMutation({
    onSuccess: (data) => {
      props.onComplete({
        txHash: data.submittedTxHash,
        action: "Unvest Funds",
        amount:
          data.utxo.output.amount
            .filter((asset) => asset.unit === "lovelace")
            .reduce((sum, asset) => sum + parseInt(asset.quantity), 0) /
          1000000,
        unlockDate: data.unlockDate,
      });
    },
    onError: (error) => {
      console.error("🔵 error", error);
      toast({
        title: "Transaction failed",
        description: getErrorMessage(error),
        variant: "destructive",
      });
    },
  });

  const form = useForm({
    defaultValues: {
      txHash: "",
    },
    onSubmit: async ({ value }) => {
      unvestingMutation.mutate({
        wallet,
        txHash: value.txHash,
      });
    },
  });

  return (
    <TransactionCard>
      <div className="flex flex-col gap-5">
        <AlertBox variant="info">
          Enter the transaction hash to unvest your funds from the blockchain.
        </AlertBox>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="flex flex-col h-full"
        >
          <div className="flex flex-col gap-4">
            <form.Field
              name="txHash"
              validators={{
                onSubmit: ({ value }) =>
                  !value.trim() ? "Transaction hash is required" : undefined,
              }}
              children={(field) => {
                return (
                  <InputField
                    label="Transaction Hash"
                    name={field.name}
                    placeholder="Enter the transaction hash here..."
                    field={field}
                    disabled={unvestingMutation.isPending}
                    autoComplete="off"
                  />
                );
              }}
            />

            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
              children={([canSubmit, isSubmitting]) => (
                <FormButtons
                  onClose={props.onClose}
                  canSubmit={canSubmit}
                  disabled={unvestingMutation.isPending}
                  isLoading={isSubmitting || unvestingMutation.isPending}
                  primaryButtonChildren="Unvest Funds"
                />
              )}
            />
          </div>
        </form>
      </div>
    </TransactionCard>
  );
};

const getErrorMessage = (error: any) => {
  if (
    error.message &&
    error.message.includes(
      "The transaction is outside of its validity interval"
    )
  ) {
    return "You cannot unvest your funds yet. Please wait until the unlock date.";
  }
  if (error.name && error.name.includes("TxSignError")) {
    return "You have not the access to unvest this funds.";
  }
  if (
    error.message &&
    error.message.includes("trying to spend have already been spent")
  ) {
    return "Those funds have already been unvested.";
  }
  return "An error occurred while processing your transaction. Please try again.";
};
