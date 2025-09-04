import { useWallet } from "@meshsdk/react";
import { useForm } from "@tanstack/react-form";
import { useState } from "react";
import { TransactionDetail } from "../../../components/features/transaction-detail";
import { TransactionDetails } from "../../../components/features/transaction-details";
import { ActionButton } from "../../../components/ui/action-button";
import { AlertBox } from "../../../components/ui/alert-box";
import { Button } from "../../../components/ui/button";
import { InputField } from "../../../components/ui/input/input-field";
import { useToast } from "../../../components/ui/toast";
import { TransactionCard } from "../../../components/ui/transaction-card";
import { WalletButton } from "../../../components/ui/wallet/wallet";
import { getUtxoByTxHash } from "../../../lib/cardano/cardano-helpers";
import { buildUnlockTx } from "../../../lib/cardano/unlock-assets/unlock-assets";

export const UnlockCard = (props: {
  onComplete: (transactionDetails: TransactionDetails) => void;
  onClose?: () => void;
}) => {
  const { connected, wallet, name: walletName } = useWallet();
  const { toast } = useToast();

  const [isTransactionDetailOpen, setIsTransactionDetailOpen] =
    useState<boolean>(false);
  const [txHash, setTxHash] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showForm, setShowForm] = useState<boolean>(true);

  const form = useForm({
    defaultValues: {
      txHash: "",
    },
    onSubmit: async ({ value }) => {
      if (isLoading) return;

      try {
        setIsLoading(true);

        const utxo = await getUtxoByTxHash(value.txHash);
        if (!utxo) {
          toast({
            title: "Transaction not found",
            description: "Please check the transaction hash and try again.",
            variant: "destructive",
          });
          return;
        }

        const unsignedTx = await buildUnlockTx(utxo, wallet);

        const signedTx = await wallet.signTx(unsignedTx, true);
        const submittedTxHash = await wallet.submitTx(signedTx);

        setTxHash(submittedTxHash);
        setIsTransactionDetailOpen(true);
        setShowForm(false);

        toast({
          title: "Transaction submitted successfully",
          description: `Funds unlocked successfully. Soon you will receive your funds back.`,
          variant: "success",
        });

        console.log("unsignedTx", unsignedTx);
        console.log("signedTx", signedTx);
        console.log("submittedTxHash", submittedTxHash);
        console.log("utxo", utxo);

        props.onComplete({
          txHash: submittedTxHash,
          action: "Unlock Funds",
          amount:
            utxo.output.amount
              .filter((asset) => asset.unit === "lovelace")
              .reduce((sum, asset) => sum + parseInt(asset.quantity), 0) /
            1000000,
        });
      } catch (error: any) {
        toast({
          title: "Transaction failed",
          description: getErrorMessage(error, walletName),
          variant: "destructive",
        });
        console.error("Unlock error:", error);
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
          Enter the transaction hash to retrieve your locked funds from the
          blockchain.
        </AlertBox>

        {showForm && (
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
                      disabled={isLoading}
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
                        isLoading={isLoading || isSubmitting}
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
        )}
      </div>
    </TransactionCard>
  );
};

const getErrorMessage = (error: any, walletName?: string) => {
  const errorInfo = error.info;
  const errorMessage = error.message;
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
        errorObj.data?.message &&
        errorObj.data.message.includes(
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
        errorObj.data?.message &&
        errorObj.data.message.includes(
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
