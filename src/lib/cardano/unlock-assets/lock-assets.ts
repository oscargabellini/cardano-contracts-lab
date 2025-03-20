import { Asset, deserializeAddress, mConStr0 } from "@meshsdk/core";
import blueprint from "../../../../aiken-workspace/unlock-assets/plutus.json";
import {
  getScript,
  getTxBuilder,
  getWalletInfoForTx,
} from "../cardano-helpers";

export async function lockAsset(
  connectedWallet: any,
  assets: Asset[]
): Promise<string> {
  const { utxos, walletAddress } = await getWalletInfoForTx(connectedWallet);
  const { scriptAddr } = getScript(blueprint.validators[0].compiledCode);

  const signerHash = deserializeAddress(walletAddress).pubKeyHash;

  const txBuilder = getTxBuilder();
  await txBuilder
    .txOut(scriptAddr, assets)
    .txOutDatumHashValue(mConStr0([signerHash]))
    .changeAddress(walletAddress)
    .selectUtxosFrom(utxos)
    .complete();

  const signedTx = await connectedWallet.signTx(txBuilder.txHex);
  const txHash = await connectedWallet.submitTx(signedTx);
  return txHash;
}
