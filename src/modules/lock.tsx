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
import { lockAsset } from "../lib/lock-assets";

type LockFormValues = {
  amount: string;
};

export const Lock = () => {
  const { connected, wallet } = useWallet();

  const [isTransactionSubmitted, setIsTransactionSubmitted] =
    useState<boolean>(false);

  const [txHash, setTxHash] = useState<string>("");

  const handleLock = async (values: LockFormValues) => {
    const txHash = await lockAsset(wallet, [
      { unit: "lovelace", quantity: String(+values.amount * 1000000) },
    ]);
    setTxHash(txHash);

    setIsTransactionSubmitted(true);
  };

  return (
    <div className="flex justify-center w-full">
      <Card className="w-[75%]">
        <CardHeader>
          <CardTitle>Lock funds</CardTitle>
        </CardHeader>

        <Formik
          enableReinitialize
          initialValues={{
            amount: "",
          }}
          onSubmit={(values) => {
            console.log(values);
            handleLock(values);
          }}
          validationSchema={Yup.object().shape({
            amount: Yup.number().required("Amount is required"),
          })}
        >
          {(formContext) => {
            return (
              <>
                <Form>
                  <CardContent>
                    <p>Lock funds to the Cardano blockchain</p>
                    <Input
                      placeholder="Select ADA amount"
                      type="number"
                      className="mt-2"
                      style={{
                        marginTop: "10px",
                      }}
                      onChange={(e) => {
                        formContext.setFieldValue("amount", e.target.value);
                      }}
                    />
                  </CardContent>
                  <CardFooter>
                    {connected ? (
                      <Button type="submit">Lock</Button>
                    ) : (
                      <WalletButton />
                    )}
                  </CardFooter>
                </Form>
              </>
            );
          }}
        </Formik>
        {isTransactionSubmitted && (
          <div className="mt-4">
            <p>Transaction submitted successfully</p>
            <p>Tx Hash: {txHash}</p>
          </div>
        )}
      </Card>
    </div>
  );
};
