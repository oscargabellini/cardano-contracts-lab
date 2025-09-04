import { useWallet } from "@meshsdk/react";
import { useForm } from "@tanstack/react-form";
import { useState } from "react";
import { TransactionDetail } from "../../../components/features/transaction-detail";
import { ActionButton } from "../../../components/ui/action-button";
import { AlertBox } from "../../../components/ui/alert-box";
import { InputField } from "../../../components/ui/input/input-field";
import { useToast } from "../../../components/ui/toast";
import { TransactionCard } from "../../../components/ui/transaction-card";
import { WalletButton } from "../../../components/ui/wallet/wallet";
import { lockAsset } from "../../../lib/cardano/unlock-with-password/lock-assets";

export const LockWithPasswordCard = () => {
  const { connected, wallet } = useWallet();
  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isTransactionDetailOpen, setIsTransactionDetailOpen] =
    useState<boolean>(false);
  const [showForm, setShowForm] = useState<boolean>(true);

  const [txHash, setTxHash] = useState<string>("");

  const form = useForm({
    defaultValues: {
      amount: "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      try {
        setIsLoading(true);

        const txHash = await lockAsset(
          wallet,
          [{ unit: "lovelace", quantity: String(+value.amount * 1000000) }],
          value.password
        );

        setTxHash(txHash);

        toast({
          title: "Transaction submitted successfully",
          variant: "success",
        });

        setIsTransactionDetailOpen(true);
        setShowForm(false);
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
    <TransactionCard
      isTransactionDetailOpen={isTransactionDetailOpen}
      transactionDetail={
        <TransactionDetail
          txHash={txHash}
          onCloseDetail={() => {
            setIsTransactionDetailOpen(false);
            setShowForm(true);
            form.reset();
          }}
        />
      }
    >
      <div className="flex flex-col gap-5">
        <AlertBox variant="info">
          Enter the amount of ADA you want to lock on the blockchain.
        </AlertBox>

        {showForm && (
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
                      disabled={isLoading}
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
                  <div className="flex justify-end w-full mt-4">
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
        )}
      </div>
    </TransactionCard>
  );
};
