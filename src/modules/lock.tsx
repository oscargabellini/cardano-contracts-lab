import { useWallet } from "@meshsdk/react";
import { Form, Formik } from "formik";
import { LockIcon } from "lucide-react";
import { useState } from "react";
import * as Yup from "yup";
import { ActionButton } from "../components/action-button";
import { AlertBox } from "../components/info-box";
import { TransactionCard } from "../components/transaction-card";
import { TransactionDetail } from "../components/transaction-detail";
import { Input } from "../components/ui/input";
import { useToast } from "../components/ui/toast";
import { WalletButton } from "../components/ui/wallet";
import { lockAsset } from "../lib/lock-assets";

type LockFormValues = {
  amount: string;
};

export const Lock = () => {
  const { connected, wallet } = useWallet();
  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isTransactionSubmitted, setIsTransactionSubmitted] =
    useState<boolean>(false);

  const [txHash, setTxHash] = useState<string>("");

  const handleLock = async (values: LockFormValues) => {
    try {
      setIsLoading(true);
      const txHash = await lockAsset(wallet, [
        { unit: "lovelace", quantity: String(+values.amount * 1000000) },
      ]);
      setTxHash(txHash);

      toast({
        title: "Transaction submitted successfully",
        variant: "success",
      });

      setIsTransactionSubmitted(true);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <TransactionCard
      title="Lock Funds"
      icon={
        <LockIcon className="w-5 h-5 text-purple-700 dark:text-purple-400" />
      }
      isTransactionSubmitted={isTransactionSubmitted}
      transactionDetail={<TransactionDetail txHash={txHash} />}
    >
      <div className="flex flex-col gap-5">
        <AlertBox variant="info">
          Enter the amount of ADA you want to lock on the Cardano blockchain.
        </AlertBox>

        <Formik
          enableReinitialize
          initialValues={{
            amount: "",
          }}
          onSubmit={(values) => {
            handleLock(values);
          }}
          validationSchema={Yup.object().shape({
            amount: Yup.number().required("Amount is required"),
          })}
        >
          {(formContext) => {
            const hasError =
              formContext.touched.amount && formContext.errors.amount;

            return (
              <>
                <Form>
                  <div className="space-y-2">
                    <Input
                      label="Amount"
                      id="amount"
                      disabled={isLoading}
                      type="number"
                      placeholder="Enter the amount here..."
                      className={`py-5 pl-10 pr-4 font-mono text-sm ${
                        hasError
                          ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                          : "border-gray-300 dark:border-gray-700"
                      }`}
                      value={formContext.values.amount}
                      onChange={(e) =>
                        formContext.setFieldValue("amount", e.target.value)
                      }
                      onBlur={formContext.handleBlur("amount")}
                    />
                    {hasError && (
                      <p className="text-sm text-red-600 dark:text-red-400 mt-1">
                        {formContext.errors.amount}
                      </p>
                    )}
                  </div>
                  <div className="flex justify-end w-full mt-4">
                    {connected ? (
                      <ActionButton
                        type="submit"
                        isLoading={isLoading}
                        variant="primary"
                      >
                        Lock Funds
                      </ActionButton>
                    ) : (
                      <WalletButton />
                    )}
                  </div>
                </Form>
              </>
            );
          }}
        </Formik>
      </div>
    </TransactionCard>
  );
};
