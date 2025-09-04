import { useWallet } from "@meshsdk/react";
import { useForm } from "@tanstack/react-form";
import { ActionButton } from "../../../components/ui/action-button";
import { Button } from "../../../components/ui/button";
import { InputField } from "../../../components/ui/input/input-field";
import { useToast } from "../../../components/ui/toast";
import { TransactionCard } from "../../../components/ui/transaction-card";
import { WalletButton } from "../../../components/ui/wallet/wallet";
import { addQuestion } from "../../../lib/cardano/quiz/add-question";
import { QuizTransactionDetails } from "../quiz.page";

type AddQuestionFormProps = {
  onComplete: (transactionDetails: QuizTransactionDetails) => void;
  onClose: () => void;
};

export const AddQuestionForm = (props: AddQuestionFormProps) => {
  const { connected, wallet } = useWallet();
  const { toast } = useToast();

  const form = useForm({
    defaultValues: {
      question: "",
      answer: "",
      prize: "",
    },
    onSubmit: async ({ value }) => {
      try {
        const txHash = await addQuestion(wallet, value.question, value.answer, [
          { unit: "lovelace", quantity: String(+value.prize * 1000000) },
        ]);
        props.onComplete({
          txHash,
          question: value.question,
          answer: value.answer,
          amount: value.prize,
        });
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
    <TransactionCard>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <div className="flex flex-col gap-4">
          <form.Field
            name="question"
            validators={{
              onChange: ({ value }) =>
                !value.trim() ? "A question is required" : undefined,
            }}
            children={(field) => {
              return (
                <InputField
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
                <InputField
                  label="Answer"
                  name={field.name}
                  placeholder="Enter answer"
                  field={field}
                />
              );
            }}
          />
          <form.Field
            name="prize"
            validators={{
              onChange: ({ value }) =>
                !value.trim() ? "A prize is required" : undefined,
            }}
            children={(field) => {
              return (
                <InputField
                  label="Prize"
                  name={field.name}
                  type="number"
                  placeholder="Enter prize"
                  field={field}
                />
              );
            }}
          />
          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
            children={([canSubmit, isSubmitting]) => (
              <div className="flex flex-col-reverse md:flex-row gap-4 pt-2 w-full mt-4 justify-end">
                <Button variant="secondary" onClick={props.onClose}>
                  Close
                </Button>
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
    </TransactionCard>
  );
};
