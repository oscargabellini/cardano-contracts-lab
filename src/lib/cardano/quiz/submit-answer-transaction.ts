import { IWallet, mConStr0, stringToHex, UTxO } from "@meshsdk/core";
import blueprint from "../../../../aiken-workspace/quiz/plutus.json";
import {
  getScript,
  getTxBuilder,
  getWalletInfoForTx,
} from "../cardano-helpers";

export async function submitAnswerTransaction(
  scriptUtxo: UTxO,
  connectedWallet: IWallet,
  answer: string
): Promise<string> {
  const { utxos, collateral, walletAddress } = await getWalletInfoForTx(
    connectedWallet
  );
  const { scriptCbor } = getScript(blueprint.validators[0].compiledCode);

  if (!scriptUtxo.output.plutusData) {
    throw new Error("Script utxo has no plutus data");
  }

  const txBuilder = getTxBuilder();
  await txBuilder
    .spendingPlutusScript("V3")
    .txIn(
      scriptUtxo.input.txHash,
      scriptUtxo.input.outputIndex,
      scriptUtxo.output.amount,
      scriptUtxo.output.address
    )
    .txInScript(scriptCbor)
    .txInRedeemerValue(mConStr0([stringToHex(answer)]))
    .txInInlineDatumPresent()
    .changeAddress(walletAddress)
    .txInCollateral(
      collateral.input.txHash,
      collateral.input.outputIndex,
      collateral.output.amount,
      collateral.output.address
    )
    .selectUtxosFrom(utxos)
    .complete();

  return txBuilder.txHex;
}
