import { IWallet } from "@meshsdk/core";
import { useMutation } from "@tanstack/react-query";
import { MutationCallbacks } from "../../types";
import { getUtxoByTxHash } from "../cardano/cardano-helpers";
import { submitAnswerTransaction } from "../cardano/quiz/submit-answer-transaction";

type CreateMutationVariables = {
  answer: string;
  wallet: IWallet;
  txHash: string;
};

async function mutationFn(variables: CreateMutationVariables) {
  const utxo = await getUtxoByTxHash(variables.txHash);
  if (!utxo) {
    throw new Error("Transaction not found");
  }

  const submittedTxHash = await submitAnswerTransaction(
    utxo,
    variables.wallet,
    variables.answer
  );
  return { submittedTxHash, utxo };
}

export const useSubmitAnswerMutation = (
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
