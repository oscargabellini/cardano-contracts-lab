import { useWallet } from "@meshsdk/react";
import { Form, Formik } from "formik";
import { UnlockIcon } from "lucide-react";
import { useState } from "react";
import * as Yup from "yup";
import { TransactionDetail } from "../../components/features/transaction-detail";
import { ActionButton } from "../../components/ui/action-button";
import { AlertBox } from "../../components/ui/alert-box";
import { InputField } from "../../components/ui/input/input-field";
import { toast } from "../../components/ui/toast";
import { TransactionCard } from "../../components/ui/transaction-card";
import { WalletButton } from "../../components/ui/wallet";
import { getUtxoByTxHash } from "../../lib/cardano/cardano-helpers";
import { buildUnlockTx } from "../../lib/cardano/unlock-assets/unlock-assets";

export const UnlockCard = () => {
  const { connected, wallet, name: walletName } = useWallet();

  const [isTransactionDetailOpen, setIsTransactionDetailOpen] =
    useState<boolean>(false);
  const [txHash, setTxHash] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleUnlock = async (values: { txHash: string }) => {
    if (isLoading) return;

    try {
      setIsLoading(true);

      const utxo = await getUtxoByTxHash(values.txHash);
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
      const txHash = await wallet.submitTx(signedTx);

      setTxHash(txHash);
      setIsTransactionDetailOpen(true);

      toast({
        title: "Transaction submitted successfully",
        description: `Funds unlocked successfully. Soon you will receive your funds back.`,
        variant: "success",
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
  };

  return (
    <TransactionCard
      title="Unlock Funds"
      icon={<UnlockIcon className="w-4 h-4" />}
      isTransactionDetailOpen={isTransactionDetailOpen}
      transactionDetail={
        <TransactionDetail
          txHash={txHash}
          onCloseDetail={() => setIsTransactionDetailOpen(false)}
        />
      }
    >
      <div className="flex flex-col gap-5">
        <AlertBox variant="info">
          Enter the transaction hash to retrieve your locked funds from the
          blockchain.
        </AlertBox>
        <Formik
          initialValues={{ txHash: "" }}
          onSubmit={(values, formContext) => {
            handleUnlock(values);
            formContext.resetForm();
          }}
          validationSchema={Yup.object().shape({
            txHash: Yup.string().required("Transaction hash is required"),
          })}
        >
          {() => {
            return (
              <Form className="flex flex-col h-full">
                <InputField
                  name="txHash"
                  id="txHash"
                  label="Transaction Hash"
                  disabled={isLoading}
                  placeholder="Enter the transaction hash here..."
                  autoComplete="off"
                />
                <div className="flex justify-end w-full mt-4">
                  {connected ? (
                    <ActionButton
                      type="submit"
                      isLoading={isLoading}
                      variant="primary"
                    >
                      Unlock Funds
                    </ActionButton>
                  ) : (
                    <WalletButton />
                  )}
                </div>
              </Form>
            );
          }}
        </Formik>
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
        errorObj.data.message &&
        errorObj.data.message.includes(
          "The requested component has not been found."
        )
      ) {
        return "Transaction not found with the provided hash.";
      }
      return errorInfo || errorMessage || errorObj.data.message;

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
        errorObj.data.message &&
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
