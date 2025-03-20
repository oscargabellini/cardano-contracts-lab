import { useWallet } from "@meshsdk/react";
import { Form, Formik } from "formik";
import { LockIcon } from "lucide-react";
import { useState } from "react";
import * as Yup from "yup";
import { TransactionDetail } from "../../components/features/transaction-detail";
import { ActionButton } from "../../components/ui/action-button";
import { AlertBox } from "../../components/ui/alert-box";
import { InputField } from "../../components/ui/input/input-field";
import { useToast } from "../../components/ui/toast";
import { TransactionCard } from "../../components/ui/transaction-card";
import { WalletButton } from "../../components/ui/wallet";
import { lockAsset } from "../../lib/cardano/unlock-with-custom-message/lock-assets";

type LockFormValues = {
  amount: number;
  message: string;
};

export const LockCardWithCustomMessage = () => {
  const { connected, wallet } = useWallet();
  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isTransactionDetailOpen, setIsTransactionDetailOpen] =
    useState<boolean>(false);

  const [txHash, setTxHash] = useState<string>("");

  const handleLock = async (values: LockFormValues) => {
    try {
      setIsLoading(true);

      const txHash = await lockAsset(
        wallet,
        [{ unit: "lovelace", quantity: String(values.amount * 1000000) }],
        values.message
      );

      setTxHash(txHash);

      toast({
        title: "Transaction submitted successfully",
        variant: "success",
      });

      setIsTransactionDetailOpen(true);
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
  };

  return (
    <TransactionCard
      title="Lock Funds"
      icon={<LockIcon className="w-5 h-5 text-primary/100" />}
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
          Enter the amount of ADA you want to lock on the blockchain.
        </AlertBox>

        <Formik
          enableReinitialize
          initialValues={{
            amount: 0,
            message: "",
          }}
          onSubmit={(values, formContext) => {
            handleLock(values);
            formContext.resetForm();
          }}
          validationSchema={Yup.object().shape({
            amount: Yup.number()
              .required("Amount is required")
              .min(2, "Amount must be greater than or equal to 2"),
            message: Yup.string().required("Message is required"),
          })}
        >
          {() => {
            return (
              <>
                <Form>
                  <div className="flex flex-col gap-2">
                    <InputField
                      name="amount"
                      id="amount"
                      label="Amount"
                      type="number"
                      placeholder="Enter the amount here"
                      disabled={isLoading}
                      autoComplete="off"
                    />
                    <InputField
                      name="message"
                      id="message"
                      label="Message"
                      placeholder="Enter your message here"
                      autoComplete="off"
                    />
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
