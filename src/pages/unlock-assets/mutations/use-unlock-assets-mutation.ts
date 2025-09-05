import { IWallet } from "@meshsdk/core";
import { useMutation } from "@tanstack/react-query";
import { getUtxoByTxHash } from "../../../lib/cardano/cardano-helpers";
import { buildUnlockTx } from "../../../lib/cardano/unlock-assets/unlock-assets";
import { MutationCallbacks } from "../../../types";

type UnlockMutationVariables = {
  txHash: string;
  wallet: IWallet;
};

async function mutationFn(variables: UnlockMutationVariables) {
  const utxo = await getUtxoByTxHash(variables.txHash);
  if (!utxo) {
    throw new Error("Transaction not found");
  }

  const unsignedTx = await buildUnlockTx(utxo, variables.wallet);
  const signedTx = await variables.wallet.signTx(unsignedTx, true);
  const submittedTxHash = await variables.wallet.submitTx(signedTx);

  return { submittedTxHash, utxo };
}

export const useUnlockAssetsMutation = (
  callbacks?: MutationCallbacks<
    UnlockMutationVariables,
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
