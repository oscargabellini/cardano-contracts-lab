import {
  deserializeAddress,
  IWallet,
  mConStr0,
  stringToHex,
  UTxO,
} from "@meshsdk/core";
import blueprint from "../../../../aiken-workspace/unlock-with-password/plutus.json";
import { hashString } from "../../common/hash-string";
import {
  getScript,
  getTxBuilder,
  getWalletInfoForTx,
} from "../cardano-helpers";

export async function buildUnlockTxWithPassword(
  scriptUtxo: UTxO,
  connectedWallet: IWallet,
  password: string
): Promise<string> {
  const { utxos, collateral, walletAddress } = await getWalletInfoForTx(
    connectedWallet
  );
  const { scriptCbor } = getScript(blueprint.validators[0].compiledCode);
  const signerHash = deserializeAddress(walletAddress).pubKeyHash;
  const passwordHash = hashString(password);

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
    .txInRedeemerValue(mConStr0([stringToHex(password)]))
    .txInDatumValue(mConStr0([signerHash, passwordHash]))
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
