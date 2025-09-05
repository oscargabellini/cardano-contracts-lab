import { IWallet } from "@meshsdk/core";
import { useMutation } from "@tanstack/react-query";
import { MutationCallbacks } from "../../types";
import { lockAssetTransaction } from "../cardano/unlock-assets/lock-assets-transaction";

type CreateMutationVariables = {
  amount: number;
  wallet: IWallet;
};

async function mutationFn(variables: CreateMutationVariables) {
  const txHash = await lockAssetTransaction(variables.wallet, [
    { unit: "lovelace", quantity: String(+variables.amount * 1000000) },
  ]);
  return txHash;
}

export const useLockAssetsMutation = (
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
