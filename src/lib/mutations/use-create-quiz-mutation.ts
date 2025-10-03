import { IWallet } from "@meshsdk/core";
import { useMutation } from "@tanstack/react-query";
import { MutationCallbacks } from "../../types";
import { createQuizTransaction } from "../cardano/quiz/create-quiz-transaction";

type CreateMutationVariables = {
  wallet: IWallet;
  question: string;
  answer: string;
  prize: string;
};

async function mutationFn(variables: CreateMutationVariables) {
  const submittedTxHash = await createQuizTransaction(
    variables.wallet,
    variables.question,
    variables.answer,
    [{ unit: "lovelace", quantity: String(+variables.prize * 1000000) }]
  );

  return { submittedTxHash };
}

export const useCreateQuizMutation = (
  callbacks?: MutationCallbacks<
    CreateMutationVariables,
    Awaited<ReturnType<typeof mutationFn>>
  >
) => {
  const mutation = useMutation({
    mutationFn,
    onSuccess: (data, variables) => {
      callbacks?.onSuccess?.(data, variables);
    },
    onError: callbacks?.onError,
    onMutate: callbacks?.onMutate,
  });

  return mutation;
};
