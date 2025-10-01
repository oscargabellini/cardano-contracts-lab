import { useWallet } from "@meshsdk/react";
import { useForm } from "@tanstack/react-form";
import { FormButtons } from "../../../components/ui/form-buttons";
import { InputField } from "../../../components/ui/input/input-field";
import { useToast } from "../../../components/ui/toast";
import { TransactionCard } from "../../../components/ui/transaction-card";
import { useCreateQuizMutation } from "../../../lib/mutations/use-create-quiz-mutation";
import { QuizTransactionDetails } from "../quiz.page";

type CreateQuizFormProps = {
  onComplete: (transactionDetails: QuizTransactionDetails) => void;
  onClose: () => void;
};

export const CreateQuizForm = (props: CreateQuizFormProps) => {
  const { wallet } = useWallet();
  const { toast } = useToast();

  const createQuizMutation = useCreateQuizMutation({
    onSuccess: (data, variables) => {
      props.onComplete({
        txHash: data,
        question: variables.question,
        answer: variables.answer,
        amount: variables.prize,
      });
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: `An error occurred while creating the quiz.`,
      });
      console.error(error);
    },
  });

  const form = useForm({
    defaultValues: {
      question: "",
      answer: "",
      prize: "",
    },
    onSubmit: async ({ value }) => {
      createQuizMutation.mutateAsync({
        wallet,
        question: value.question,
        answer: value.answer,
        prize: value.prize,
      });
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
                  disabled={createQuizMutation.isPending}
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
                  disabled={createQuizMutation.isPending}
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
                  disabled={createQuizMutation.isPending}
                />
              );
            }}
          />
          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
            children={([canSubmit, isSubmitting]) => (
              <FormButtons
                onClose={props.onClose}
                canSubmit={canSubmit}
                disabled={createQuizMutation.isPending}
                isLoading={isSubmitting || createQuizMutation.isPending}
                primaryButtonChildren="Create Quiz"
              />
            )}
          />
        </div>
      </form>
    </TransactionCard>
  );
};
