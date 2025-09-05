import { useWallet } from "@meshsdk/react";
import { useForm } from "@tanstack/react-form";
import { TransactionDetails } from "../../../components/features/transaction-details";
import { ActionButton } from "../../../components/ui/action-button";
import { AlertBox } from "../../../components/ui/alert-box";
import { Button } from "../../../components/ui/button";
import { InputField } from "../../../components/ui/input/input-field";
import { useToast } from "../../../components/ui/toast";
import { TransactionCard } from "../../../components/ui/transaction-card";
import { WalletButton } from "../../../components/ui/wallet/wallet";
import { useUnlockAssetsWithPasswordMutation } from "../../../lib/mutations/use-unlock-assets-with-password-mutation";

type UnlockWithPasswordCardProps = {
  onComplete: (transactionDetails: TransactionDetails) => void;
  onClose?: () => void;
};

export const UnlockWithPasswordCard = (props: UnlockWithPasswordCardProps) => {
  const { connected, wallet, name: walletName } = useWallet();
  const { toast } = useToast();
  const unlockAssetsWithPasswordMutation = useUnlockAssetsWithPasswordMutation({
    onSuccess: (data) => {
      props.onComplete({
        txHash: data.submittedTxHash,
        action: "Unlock Funds with Password",
        amount:
          data.utxo.output.amount
            .filter((asset) => asset.unit === "lovelace")
            .reduce((sum, asset) => sum + parseInt(asset.quantity), 0) /
          1000000,
      });
    },
    onError: (error: any) => {
      toast({
        title: "Transaction failed",
        description: getErrorMessage(error, walletName),
        variant: "destructive",
      });
    },
  });

  const form = useForm({
    defaultValues: {
      txHash: "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      unlockAssetsWithPasswordMutation.mutateAsync({
        wallet,
        txHash: value.txHash,
        password: value.password,
      });
    },
  });

  return (
    <TransactionCard>
      <div className="flex flex-col gap-5">
        <AlertBox variant="info">
          Enter the transaction hash and the password to unlock your funds from
          the blockchain.
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
                    disabled={unlockAssetsWithPasswordMutation.isPending}
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
                    placeholder="Enter the password to unlock the funds"
                    field={field}
                    disabled={unlockAssetsWithPasswordMutation.isPending}
                    autoComplete="off"
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
                      isLoading={
                        unlockAssetsWithPasswordMutation.isPending ||
                        isSubmitting
                      }
                      disabled={!canSubmit}
                      variant="primary"
                    >
                      Unlock Funds
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

const getErrorMessage = (error: any, walletName?: string) => {
  const errorInfo = error?.info;
  const errorMessage = error?.message;
  let errorObj: any = {};

  if (typeof error === "string") {
    try {
      errorObj = JSON.parse(error);
    } catch (parseError) {
      console.error("Error during the parsing of the error:", parseError);
      errorObj = { message: error };
    }
  } else {
    errorObj = error;
  }

  switch (walletName) {
    case "lace":
      if (errorInfo && errorInfo.includes("MissingRequiredDatums")) {
        return "You have not the access to unlock this funds.";
      }
      if (
        errorObj?.data?.message &&
        errorObj?.data?.message?.includes(
          "The requested component has not been found."
        )
      ) {
        return "Transaction not found with the provided hash.";
      }
      return errorInfo || errorMessage || errorObj.data?.message;

    case "eternl":
      if (
        errorMessage &&
        errorMessage.includes(
          "Transaction failed because some Plutus scripts are missing their associated datums"
        )
      ) {
        return "You have not the access to unlock this funds.";
      }
      if (
        errorObj?.data?.message &&
        errorObj?.data?.message?.includes(
          "The requested component has not been found."
        )
      ) {
        return "Transaction not found with the provided hash.";
      }
      return errorMessage;

    default:
      return errorInfo || errorMessage;
  }
};
