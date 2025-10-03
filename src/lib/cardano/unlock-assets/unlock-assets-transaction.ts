import { deserializeAddress, IWallet, mConStr0, UTxO } from "@meshsdk/core";
import blueprint from "../../../../aiken-workspace/unlock-assets/plutus.json";
import {
  getScript,
  getTxBuilder,
  getWalletInfoForTx,
} from "../cardano-helpers";

/**
 * Unlock assets transaction
 * @param scriptUtxo - The script utxo
 * @param connectedWallet - The connected wallet
 * @returns The transaction hash
 */
export async function unlockAssetTransaction(
  scriptUtxo: UTxO,
  connectedWallet: IWallet
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
    .txInRedeemerValue(mConStr0([]))
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

  const signedTx = await connectedWallet.signTx(txBuilder.txHex, true);
  const txHash = await connectedWallet.submitTx(signedTx);

  return txHash;
}
