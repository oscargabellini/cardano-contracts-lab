import { Asset, IWallet, deserializeAddress, mConStr0 } from "@meshsdk/core";
import blueprint from "../../../../aiken-workspace/vesting/plutus.json";
import {
  getScript,
  getTxBuilder,
  getWalletInfoForTx,
} from "../cardano-helpers";

export async function vestingAssetsTransaction(
  connectedWallet: IWallet,
  assets: Asset[],
  unlockDate: string
): Promise<string> {
  const { utxos, walletAddress } = await getWalletInfoForTx(connectedWallet);
  const { scriptAddr } = getScript(blueprint.validators[0].compiledCode);

  const signerHash = deserializeAddress(walletAddress).pubKeyHash;

  const unlockTime = Math.floor(new Date(unlockDate).setHours(0, 0, 0) / 1000);

  const txBuilder = getTxBuilder();

  await txBuilder
    .txOut(scriptAddr, assets)
    .txOutInlineDatumValue(mConStr0([signerHash, unlockTime]))
    .changeAddress(walletAddress)
    .selectUtxosFrom(utxos)
    .complete();

  const signedTx = await connectedWallet.signTx(txBuilder.txHex);
  const txHash = await connectedWallet.submitTx(signedTx);

  return txHash;
}
