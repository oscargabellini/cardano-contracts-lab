import { useWallet } from "@meshsdk/react";
import { useForm } from "@tanstack/react-form";
import { CheckCircle } from "lucide-react";
import { useState } from "react";
import { TransactionDetail } from "../../../components/features/transaction-detail";
import { ActionButton } from "../../../components/ui/action-button";
import { InputFieldTanstack } from "../../../components/ui/input/input-field";
import { useToast } from "../../../components/ui/toast";
import { TransactionCard } from "../../../components/ui/transaction-card";
import { WalletButton } from "../../../components/ui/wallet";
import { getUtxoByTxHash } from "../../../lib/cardano/cardano-helpers";
import { addAnswer } from "../../../lib/cardano/quiz/add-answer";

type AnswerCardProps = {
  question: string;
  questionHash: string;
};

export const AddAnswerForm = (props: AnswerCardProps) => {
  const { connected, wallet } = useWallet();
  const { toast } = useToast();

  const [txHash, setTxHash] = useState<string>("");
  const [isTransactionDetailOpen, setIsTransactionDetailOpen] =
    useState<boolean>(false);

  const form = useForm({
    defaultValues: {
      answer: "",
    },
    onSubmit: async ({ value }) => {
      try {
        const utxo = await getUtxoByTxHash(props.questionHash);
        if (!utxo) {
          toast({
            title: "Transaction not found",
            description: "Please check the transaction hash and try again.",
            variant: "destructive",
          });
          return;
        }
        const buildAnswerTx = await addAnswer(utxo, wallet, value.answer);

        const signedTx = await wallet.signTx(buildAnswerTx, true);
        const txHash = await wallet.submitTx(signedTx);
        setTxHash(txHash);
        setIsTransactionDetailOpen(true);
        toast({
          variant: "success",
          title: "Correct answer",
          description: `You answered correctly!`,
        });
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: getQuizErrorMessage(error),
        });
        console.error(error);
      }
    },
  });
  return (
    <TransactionCard
      title="Answer Question"
      icon={<CheckCircle className="h-4 w-4" />}
      isTransactionDetailOpen={isTransactionDetailOpen}
      transactionDetail={
        <TransactionDetail
          txHash={txHash}
          onCloseDetail={() => setIsTransactionDetailOpen(false)}
        />
      }
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <p className="text-lg font-semibold mb-4">{props.question}</p>
        <form.Field
          name="answer"
          validators={{
            onChange: ({ value }) =>
              !value.trim() ? "An answer is required" : undefined,
            onChangeAsync: async ({ value }) => {
              return (
                value.includes("error") && 'No "error" allowed in first name'
              );
            },
          }}
          children={(field) => {
            return (
              <InputFieldTanstack
                label="Answer"
                name={field.name}
                placeholder="Enter answer"
                field={field}
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
                  isLoading={isSubmitting}
                  disabled={!canSubmit}
                  variant="primary"
                >
                  Answer
                </ActionButton>
              ) : (
                <WalletButton />
              )}
            </div>
          )}
        />
      </form>
    </TransactionCard>
  );
};

const getQuizErrorMessage = (error: any) => {
  const containsPattern = (errorStr: string, patterns: string[]) => {
    return patterns.some((pattern) => errorStr.includes(pattern));
  };

  let errorString = "";
  if (typeof error === "string") {
    errorString = error;
  } else if (error && error.message) {
    errorString = error.message;
  } else if (error && typeof error === "object") {
    errorString = JSON.stringify(error);
  }

  const incorrectAnswerPatterns = [
    "PlutusFailure",
    "The machine terminated because of an error",
  ];

  const alreadySpentPatterns = [
    "BadInputsUTxO",
    "ExtraneousScriptWitnessesUTXOW",
    "ExtraRedeemers",
    "ValueNotConservedUTxO",
  ];

  if (containsPattern(errorString, incorrectAnswerPatterns)) {
    return "You answered incorrectly! Try with another answer.";
  }

  if (containsPattern(errorString, alreadySpentPatterns)) {
    return "This question has already been answered or is no longer available. Please refresh the page to see the latest available questions.";
  }

  return "An error occurred while processing your transaction. Please try again.";
};
