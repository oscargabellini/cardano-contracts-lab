import { useWallet } from "@meshsdk/react";
import { useForm } from "@tanstack/react-form";
import { TransactionDetails } from "../../../components/features/transaction-details";
import { AlertBox } from "../../../components/ui/alert-box";
import { FormButtons } from "../../../components/ui/form-buttons";
import { InputField } from "../../../components/ui/input/input-field";
import { useToast } from "../../../components/ui/toast";
import { TransactionCard } from "../../../components/ui/transaction-card";
import { useLockAssetsWithPasswordMutation } from "../../../lib/mutations/use-lock-assets-with-password-mutation";

type LockWithPasswordCardProps = {
  onComplete: (transactionDetails: TransactionDetails) => void;
  onClose?: () => void;
};

export const LockWithPasswordCard = (props: LockWithPasswordCardProps) => {
  const { wallet } = useWallet();
  const { toast } = useToast();

  const lockAssetsWithPasswordMutation = useLockAssetsWithPasswordMutation({
    onSuccess: (data, variables) => {
      props.onComplete({
        txHash: data,
        action: "Lock Funds with Password",
        amount: variables.amount,
      });
    },
    onError: (error: any) => {
      toast({
        title: "Transaction failed",
        description: error.info || error.message,
        variant: "destructive",
      });
      console.error(error);
    },
  });

  const form = useForm({
    defaultValues: {
      amount: "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      lockAssetsWithPasswordMutation.mutateAsync({
        wallet,
        amount: +value.amount,
        password: value.password,
      });
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
                    placeholder="Enter the amount here"
                    field={field}
                    disabled={lockAssetsWithPasswordMutation.isPending}
                    autoComplete="off"
                  />
                );
              }}
            />

            <form.Field
              name="password"
              validators={{
                onSubmit: ({ value }) =>
                  !value.trim() ? "Password is required" : undefined,
              }}
              children={(field) => {
                return (
                  <InputField
                    label="Password"
                    type="password"
                    name={field.name}
                    placeholder="Enter your password here"
                    field={field}
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
                  disabled={lockAssetsWithPasswordMutation.isPending}
                  isLoading={
                    isSubmitting || lockAssetsWithPasswordMutation.isPending
                  }
                  primaryButtonChildren="Lock Funds"
                />
              )}
            />
          </div>
        </form>
      </div>
    </TransactionCard>
  );
};
