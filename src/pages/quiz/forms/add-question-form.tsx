import { useWallet } from "@meshsdk/react";
import { useForm } from "@tanstack/react-form";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import { QuizTransactionDetail } from "../../../components/features/quiz-transaction-detail";
import { ActionButton } from "../../../components/ui/action-button";
import { InputFieldTanstack } from "../../../components/ui/input/input-field";
import { useToast } from "../../../components/ui/toast";
import { TransactionCard } from "../../../components/ui/transaction-card";
import { WalletButton } from "../../../components/ui/wallet";
import { addQuestion } from "../../../lib/cardano/quiz/add-question";

export const AddQuestionForm = () => {
  const { connected, wallet } = useWallet();
  const { toast } = useToast();

  const [txHash, setTxHash] = useState<string>("");
  const [isTransactionDetailOpen, setIsTransactionDetailOpen] =
    useState<boolean>(false);

  const [showForm, setShowForm] = useState<boolean>(true);

  const form = useForm({
    defaultValues: {
      question: "",
      answer: "",
      amount: "",
    },
    onSubmit: async ({ value }) => {
      try {
        const txHash = await addQuestion(wallet, value.question, value.answer, [
          { unit: "lovelace", quantity: String(+value.amount * 1000000) },
        ]);
        setTxHash(txHash);
        setIsTransactionDetailOpen(true);
        toast({
          variant: "success",
          title: "Question added",
          description: `Question added successfully`,
        });
        setShowForm(false);
      } catch (error) {
        console.error(error);
        toast({
          variant: "destructive",
          title: "Error",
          description: `An error occurred while adding the question.`,
        });
      }
    },
  });
  return (
    <div className="mt-7">
      <TransactionCard
        title="Create a Quiz"
        icon={<PlusCircle className="h-4 w-4" />}
        isTransactionDetailOpen={isTransactionDetailOpen}
        transactionDetail={
          <QuizTransactionDetail
            amount={form.getFieldValue("amount")}
            question={form.getFieldValue("question")}
            answer={form.getFieldValue("answer")}
            txHash={txHash}
            onCloseDetail={() => {
              setIsTransactionDetailOpen(false);
              setShowForm(true);
              form.reset();
            }}
          />
        }
      >
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
                  onChange: ({ value }) =>
                    !value.trim() ? "An amount is required" : undefined,
                }}
                children={(field) => {
                  return (
                    <InputFieldTanstack
                      label="Amount"
                      name={field.name}
                      type="number"
                      placeholder="Enter amount of ADA"
                      field={field}
                    />
                  );
                }}
              />
              <form.Field
                name="question"
                validators={{
                  onChange: ({ value }) =>
                    !value.trim() ? "A question is required" : undefined,
                }}
                children={(field) => {
                  return (
                    <InputFieldTanstack
                      label="Question"
                      name={field.name}
                      type="textarea"
                      placeholder="Enter question"
                      field={field}
                    />
                  );
                }}
              />
              <form.Field
                name="answer"
                validators={{
                  onChange: ({ value }) =>
                    !value.trim() ? "An answer is required" : undefined,
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
                        Create Quiz
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
      </TransactionCard>
    </div>
  );
};
