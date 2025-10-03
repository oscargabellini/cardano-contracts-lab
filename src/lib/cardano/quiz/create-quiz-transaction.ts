import { Asset, mConStr0 } from "@meshsdk/core";
import { blake2b } from "blakejs";
import blueprint from "../../../../aiken-workspace/quiz/plutus.json";
import {
  getScript,
  getTxBuilder,
  getWalletInfoForTx,
} from "../cardano-helpers";

/**
 * Create quiz transaction
 * @param connectedWallet - The connected wallet
 * @param question - The question
 * @param answer - The answer
 * @param assets - The assets
 * @returns The transaction hash
 */

export async function createQuizTransaction(
  connectedWallet: any,
  question: string,
  answer: string,
  assets: Asset[]
): Promise<string> {
  const { utxos, walletAddress } = await getWalletInfoForTx(connectedWallet);
  const { scriptAddr } = getScript(blueprint.validators[0].compiledCode);

  const answerBytes = new TextEncoder().encode(answer);
  const hashBytes = blake2b(answerBytes, undefined, 32);
  const answerHash = Buffer.from(hashBytes).toString("hex").toUpperCase();

  const txBuilder = getTxBuilder();
  await txBuilder
    .txOut(scriptAddr, assets)
    .txOutInlineDatumValue(mConStr0([answerHash, question]))
    .changeAddress(walletAddress)
    .selectUtxosFrom(utxos)
    .complete();

  const signedTx = await connectedWallet.signTx(txBuilder.txHex);
  const txHash = await connectedWallet.submitTx(signedTx);

  return txHash;
}
