import {
  deserializeAddress,
  IWallet,
  mConStr0,
  stringToHex,
  UTxO,
} from "@meshsdk/core";
import blueprint from "../../aiken-workspace/plutus.json";
import { getScript, getTxBuilder, getWalletInfoForTx } from "./common";

export async function buildUnlockTx(
  scriptUtxo: UTxO,
  connectedWallet: IWallet,
  message: string
): Promise<string> {
  const { utxos, collateral, walletAddress } = await getWalletInfoForTx(
    connectedWallet
  );
  const { scriptCbor } = getScript(blueprint.validators[0].compiledCode);
  const signerHash = deserializeAddress(walletAddress).pubKeyHash;

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
    .txInRedeemerValue(mConStr0([stringToHex(message)]))
    .txInDatumValue(mConStr0([signerHash]))
    .requiredSignerHash(signerHash)
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
