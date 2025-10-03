import { IWallet } from "@meshsdk/core";
import { useMutation } from "@tanstack/react-query";
import { MutationCallbacks } from "../../types";
import { lockAssetsWithPasswordTransaction } from "../cardano/unlock-with-password/lock-assets-with-password-transaction";

type CreateMutationVariables = {
  amount: number;
  wallet: IWallet;
  password: string;
};

async function mutationFn(variables: CreateMutationVariables) {
  const submittedTxHash = await lockAssetsWithPasswordTransaction(
    variables.wallet,
    [{ unit: "lovelace", quantity: String(+variables.amount * 1000000) }],
    variables.password
  );
  return { submittedTxHash };
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
