import { IWallet } from "@meshsdk/core";
import { useMutation } from "@tanstack/react-query";
import { lockAsset } from "../../../lib/cardano/unlock-assets/lock-assets";
import { MutationCallbacks } from "../../../types";

type CreateMutationVariables = {
  amount: number;
  wallet: IWallet;
};

async function mutationFn(variables: CreateMutationVariables) {
  const txHash = await lockAsset(variables.wallet, [
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
