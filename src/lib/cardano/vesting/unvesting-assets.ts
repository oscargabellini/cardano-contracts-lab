import {
  deserializeAddress,
  deserializeDatum,
  IWallet,
  mConStr0,
  SLOT_CONFIG_NETWORK,
  unixTimeToEnclosingSlot,
  UTxO,
} from "@meshsdk/core";
import blueprint from "../../../../aiken-workspace/vesting/plutus.json";
import {
  getScript,
  getTxBuilder,
  getWalletInfoForTx,
} from "../cardano-helpers";

/**
 * Unvesting assets transaction
 * @param scriptUtxo - The script utxo
 * @param connectedWallet - The connected wallet
 * @returns The transaction hash
 */

export async function unvestingAssetsTransaction(
  scriptUtxo: UTxO,
  connectedWallet: IWallet
): Promise<{ txHash: string; unlockDate: string }> {
  const { utxos, collateral, walletAddress } = await getWalletInfoForTx(
    connectedWallet
  );
  const { scriptCbor } = getScript(blueprint.validators[0].compiledCode);
  const signerHash = deserializeAddress(walletAddress).pubKeyHash;

  if (!scriptUtxo.output.plutusData) {
    throw new Error("Script utxo has no plutus data");
  }

  const datum = deserializeDatum(scriptUtxo.output.plutusData);

  const unlockDate = getDateFromUnixTime(Number(datum.fields[1].int));

  const invalidBefore =
    unixTimeToEnclosingSlot(
      Number(datum.fields[1].int) * 1000,
      SLOT_CONFIG_NETWORK.preprod
    ) + 1;

  const txBuilder = getTxBuilder();
  await txBuilder
    .spendingPlutusScript("V3")
    .txIn(
      scriptUtxo.input.txHash,
      scriptUtxo.input.outputIndex,
      scriptUtxo.output.amount,
      scriptUtxo.output.address
    )
    .txInInlineDatumPresent()
    .txInRedeemerValue(mConStr0([]))
    .txInScript(scriptCbor)
    .txOut(walletAddress, scriptUtxo.output.amount)
    .txInCollateral(
      collateral.input.txHash,
      collateral.input.outputIndex,
      collateral.output.amount,
      collateral.output.address
    )
    .invalidBefore(invalidBefore)
    .requiredSignerHash(signerHash)
    .changeAddress(walletAddress)
    .selectUtxosFrom(utxos)
    .complete();

  const signedTx = await connectedWallet.signTx(txBuilder.txHex, true);

  const txHash = await connectedWallet.submitTx(signedTx);

  return { txHash, unlockDate };
}

const getDateFromUnixTime = (unixTime: number) => {
  return new Date(unixTime * 1000).toISOString();
};
