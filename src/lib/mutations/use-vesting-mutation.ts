import { IWallet } from "@meshsdk/core";
import { useMutation } from "@tanstack/react-query";
import { MutationCallbacks } from "../../types";
import { vestingAssetsTransaction } from "../cardano/vesting/vesting-assets";

type CreateMutationVariables = {
  amount: number;
  wallet: IWallet;
  unlockDate: string;
};

async function mutationFn(variables: CreateMutationVariables) {
  const submittedTxHash = await vestingAssetsTransaction(
    variables.wallet,
    [{ unit: "lovelace", quantity: String(+variables.amount * 1000000) }],
    variables.unlockDate
  );

  return { submittedTxHash };
}

export const useVestingMutation = (
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
