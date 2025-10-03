import { IWallet } from "@meshsdk/core";
import { useMutation } from "@tanstack/react-query";
import { MutationCallbacks } from "../../types";
import { getUtxoByTxHash } from "../cardano/cardano-helpers";
import { unvestingAssetsTransaction } from "../cardano/vesting/unvesting-assets";

type CreateMutationVariables = {
  txHash: string;
  wallet: IWallet;
};

async function mutationFn(variables: CreateMutationVariables) {
  const utxo = await getUtxoByTxHash(variables.txHash);
  if (!utxo) {
    throw new Error("Transaction not found");
  }

  const { txHash: submittedTxHash, unlockDate } =
    await unvestingAssetsTransaction(utxo, variables.wallet);

  return { submittedTxHash, utxo, unlockDate };
}

export const useUnvestingMutation = (
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
    retry: false,
  });

  return mutation;
};
