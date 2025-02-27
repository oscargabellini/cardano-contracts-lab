import { useWallet } from "@meshsdk/react";
import { Form, Formik } from "formik";
import { UnlockIcon } from "lucide-react";
import { useState } from "react";
import * as Yup from "yup";
import { ActionButton } from "../components/action-button";
import { AlertBox } from "../components/info-box";
import { TransactionCard } from "../components/transaction-card";
import { TransactionDetail } from "../components/transaction-detail";
import { Input } from "../components/ui/input";
import { WalletButton } from "../components/ui/wallet";
import { getUtxoByTxHash } from "../lib/common";
import { buildUnlockTx } from "../lib/unlock-assets";

export const Unlock = () => {
  const { connected, wallet } = useWallet();

  const [isTransactionSubmitted, setIsTransactionSubmitted] =
    useState<boolean>(false);
  const [txHash, setTxHash] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleUnlock = async (values: { txHash: string }) => {
    if (isLoading) return;

    try {
      setIsLoading(true);

      const utxo = await getUtxoByTxHash(values.txHash);
      if (!utxo) {
        throw new Error("UTxO not found");
      }

      const unsignedTx = await buildUnlockTx(utxo, wallet, "Hello, World!");

      const signedTx = await wallet.signTx(unsignedTx, true);
      const txHash = await wallet.submitTx(signedTx);

      setTxHash(txHash);
      setIsTransactionSubmitted(true);
    } catch (error) {
      console.error("Unlock error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <TransactionCard
      title="Unlock Funds"
      icon={
        <UnlockIcon className="w-5 h-5 text-purple-700 dark:text-purple-400" />
      }
      isTransactionSubmitted={isTransactionSubmitted}
      transactionDetail={<TransactionDetail txHash={txHash} />}
    >
      <Formik
        initialValues={{ txHash: "" }}
        onSubmit={handleUnlock}
        validationSchema={Yup.object().shape({
          txHash: Yup.string().required("Transaction hash is required"),
        })}
      >
        {(formContext) => {
          const hasError =
            formContext.touched.txHash && formContext.errors.txHash;

          return (
            <Form className="flex flex-col h-full">
              <div className="flex flex-col gap-5">
                <AlertBox variant="info">
                  Enter the transaction hash to retrieve your locked funds from
                  the Cardano blockchain.
                </AlertBox>

                <div className="space-y-2">
                  <Input
                    id="txHash"
                    label="Transaction Hash"
                    disabled={isLoading}
                    placeholder="Enter the transaction hash here..."
                    className={`py-5 pl-10 pr-4 font-mono text-sm ${
                      hasError
                        ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                        : "border-gray-300 dark:border-gray-700"
                    }`}
                    // value={formContext.values.txHash}
                    onChange={(e) =>
                      formContext.setFieldValue("txHash", e.target.value)
                    }
                    onBlur={formContext.handleBlur("txHash")}
                  />

                  {hasError && (
                    <p className="text-sm text-red-600 dark:text-red-400 mt-1">
                      {formContext.errors.txHash}
                    </p>
                  )}
                </div>
              </div>
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
    </TransactionCard>
  );
};
