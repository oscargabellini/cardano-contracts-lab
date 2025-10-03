import { Asset, IWallet, deserializeAddress, mConStr0 } from "@meshsdk/core";
import blueprint from "../../../../aiken-workspace/unlock-with-password/plutus.json";
import { hashString } from "../../common/hash-string";
import {
  getScript,
  getTxBuilder,
  getWalletInfoForTx,
} from "../cardano-helpers";

/**
 * Lock assets with password transaction
 * @param connectedWallet - The connected wallet
 * @param assets - The assets to lock
 * @param password - The password to lock the assets
 * @returns The transaction hash
 */
export async function lockAssetsWithPasswordTransaction(
  connectedWallet: IWallet,
  assets: Asset[],
  password: string
): Promise<string> {
  const { utxos, walletAddress } = await getWalletInfoForTx(connectedWallet);
  const { scriptAddr } = getScript(blueprint.validators[0].compiledCode);

  const signerHash = deserializeAddress(walletAddress).pubKeyHash;

  const passwordHash = hashString(password);

  const txBuilder = getTxBuilder();
  await txBuilder
    .txOut(scriptAddr, assets)
    .txOutDatumHashValue(mConStr0([signerHash, passwordHash]))
    .changeAddress(walletAddress)
    .selectUtxosFrom(utxos)
    .complete();

  const signedTx = await connectedWallet.signTx(txBuilder.txHex);
  const txHash = await connectedWallet.submitTx(signedTx);

  return txHash;
}
