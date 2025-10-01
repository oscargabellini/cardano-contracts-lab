import { useWallet } from "@meshsdk/react";
import { useForm } from "@tanstack/react-form";
import { FormButtons } from "../../../components/ui/form-buttons";
import { InputField } from "../../../components/ui/input/input-field";
import { useToast } from "../../../components/ui/toast";
import { TransactionCard } from "../../../components/ui/transaction-card";
import { useSubmitAnswerMutation } from "../../../lib/mutations/use-submit-answer-mutation";

export type AnswerDetails = {
  amount: string;
  question: string;
  answer: string;
  txHash: string;
};

type AnswerCardProps = {
  question: string;
  questionHash: string;
  onCorrectAnswer: (txHash: string, answer: string) => void;
  onClose: () => void;
};

export const AnswerQuizForm = (props: AnswerCardProps) => {
  const { wallet } = useWallet();
  const { toast } = useToast();

  const submitAnswerMutation = useSubmitAnswerMutation({
    onSuccess: (data, variables) => {
      props.onCorrectAnswer(data.submittedTxHash, variables.answer);
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: getQuizErrorMessage(error),
      });
    },
  });

  const form = useForm({
    defaultValues: {
      answer: "",
    },
    onSubmit: async ({ value }) => {
      submitAnswerMutation.mutateAsync({
        answer: value.answer,
        wallet,
        txHash: props.questionHash,
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
              <InputField
                label="Answer"
                name={field.name}
                placeholder="Enter answer"
                field={field}
                disabled={submitAnswerMutation.isPending}
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
              disabled={submitAnswerMutation.isPending}
              isLoading={isSubmitting || submitAnswerMutation.isPending}
              primaryButtonChildren="Answer"
            />
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
