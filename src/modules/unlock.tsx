import { useWallet } from "@meshsdk/react";
import { Form, Formik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
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
    <div className="flex justify-center w-full">
      <Card className="w-[75%]">
        <CardHeader>
          <CardTitle>Unlock funds</CardTitle>
        </CardHeader>
        <Formik
          initialValues={{ txHash: "" }}
          onSubmit={handleUnlock}
          validationSchema={Yup.object().shape({
            txHash: Yup.string().required("Transaction hash is required"),
          })}
        >
          {(formContext) => {
            return (
              <Form>
                <CardContent>
                  <p>Unlock funds from the Cardano blockchain</p>
                  <Input
                    disabled={isLoading}
                    placeholder="Transaction hash"
                    value={formContext.values.txHash}
                    onChange={(e) =>
                      formContext.setFieldValue("txHash", e.target.value)
                    }
                  />
                </CardContent>
                <CardFooter>
                  {connected ? (
                    <Button type="submit" disabled={isLoading}>
                      {isLoading ? "Processing..." : "Unlock"}
                    </Button>
                  ) : (
                    <WalletButton />
                  )}
                </CardFooter>
              </Form>
            );
          }}
        </Formik>
        {isTransactionSubmitted && (
          <div className="mt-4">
            <p>Transaction hash: {txHash}</p>
          </div>
        )}
      </Card>
    </div>
  );
};
