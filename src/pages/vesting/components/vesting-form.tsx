import { useWallet } from "@meshsdk/react";
import { useForm } from "@tanstack/react-form";
import { VestingTransactionDetails } from "../../../components/features/vest-transaction-detail";
import { AlertBox } from "../../../components/ui/alert-box";
import { DatePickerField } from "../../../components/ui/date-picker/date-picker-field";
import { FormButtons } from "../../../components/ui/form-buttons";
import { InputField } from "../../../components/ui/input/input-field";
import { useToast } from "../../../components/ui/toast/hooks/use-toast";
import { TransactionCard } from "../../../components/ui/transaction-card";
import { useVestingMutation } from "../../../lib/mutations/use-vesting-mutation";

type VestingFormProps = {
  onComplete: (transactionDetails: VestingTransactionDetails) => void;
  onClose?: () => void;
};

export const VestingForm = (props: VestingFormProps) => {
  const { wallet } = useWallet();
  const { toast } = useToast();

  const vestingMutation = useVestingMutation({
    onSuccess: (data, variables) => {
      props.onComplete({
        txHash: data.submittedTxHash,
        action: "Vest Funds",
        amount: variables.amount,
        unlockDate: variables.unlockDate,
      });
    },
    onError: () => {
      toast({
        title: "Transaction failed",
        description:
          "An error occurred while processing your transaction. Please try again.",
        variant: "destructive",
      });
    },
  });

  const form = useForm({
    defaultValues: {
      amount: "",
      unlockDate: "",
    },
    onSubmit: async ({ value }) => {
      vestingMutation.mutateAsync({
        amount: +value.amount,
        wallet,
        unlockDate: value.unlockDate,
      });
    },
  });

  return (
    <TransactionCard>
      <div className="flex flex-col gap-5">
        <AlertBox variant="info">
          Enter the amount of ADA you want to vest and the date you want to
          unlock the funds.
        </AlertBox>
      </div>
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
                  disabled={vestingMutation.isPending}
                  autoComplete="off"
                />
              );
            }}
          />
          <form.Field
            name="unlockDate"
            validators={{
              onSubmit: ({ value }) =>
                !value.trim() ? "Unlock date is required" : undefined,
            }}
            children={(field) => {
              return (
                <DatePickerField
                  name={field.name}
                  field={field}
                  label="Unlock date"
                  className="w-full"
                  value={
                    field.state.value ? new Date(field.state.value) : undefined
                  }
                  onChange={(date) => {
                    field.handleChange(date ? date.toISOString() : "");
                  }}
                  placeholder="Select unlock date"
                  disabled={vestingMutation.isPending}
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
                isLoading={isSubmitting || vestingMutation.isPending}
                primaryButtonChildren="Vest Funds"
              />
            )}
          />
        </div>
      </form>
    </TransactionCard>
  );
};
