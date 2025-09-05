import { IWallet } from "@meshsdk/core";
import { useMutation } from "@tanstack/react-query";
import { lockAssetsWithPassword } from "../../../lib/cardano/unlock-with-password/lock-assets";
import { MutationCallbacks } from "../../../types";

type CreateMutationVariables = {
  amount: number;
  wallet: IWallet;
  password: string;
};

async function mutationFn(variables: CreateMutationVariables) {
  const txHash = await lockAssetsWithPassword(
    variables.wallet,
    [{ unit: "lovelace", quantity: String(+variables.amount * 1000000) }],
    variables.password
  );
  return txHash;
}

export const useLockAssetsWithPasswordMutation = (
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
