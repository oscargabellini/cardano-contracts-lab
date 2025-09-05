import { IWallet } from "@meshsdk/core";
import { useMutation } from "@tanstack/react-query";
import { getUtxoByTxHash } from "../../../lib/cardano/cardano-helpers";
import { buildUnlockTxWithPassword } from "../../../lib/cardano/unlock-with-password/unlock-assets";
import { MutationCallbacks } from "../../../types";

type CreateMutationVariables = {
  wallet: IWallet;
  password: string;
  txHash: string;
};

async function mutationFn(variables: CreateMutationVariables) {
  const utxo = await getUtxoByTxHash(variables.txHash);
  if (!utxo) {
    throw new Error("Transaction not found");
  }
  const unsignedTx = await buildUnlockTxWithPassword(
    utxo,
    variables.wallet,
    variables.password
  );
  const signedTx = await variables.wallet.signTx(unsignedTx, true);
  const submittedTxHash = await variables.wallet.submitTx(signedTx);
  return { submittedTxHash, utxo };
}

export const useUnlockAssetsWithPasswordMutation = (
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
