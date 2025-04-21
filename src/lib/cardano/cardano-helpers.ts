import {
  applyParamsToScript,
  BlockfrostProvider,
  IWallet,
  MeshTxBuilder,
  serializePlutusScript,
  UTxO,
} from "@meshsdk/core";

export const BLOCKFROST_API_KEY = import.meta.env.VITE_BLOCKFROST_API_KEY || "";

const blockchainProvider = new BlockfrostProvider(BLOCKFROST_API_KEY);

export async function getWalletInfoForTx(connectedWallet: IWallet) {
  const utxos = await connectedWallet.getUtxos();
  const collateral = (await connectedWallet.getCollateral())[0];
  const walletAddress = await connectedWallet.getChangeAddress();

  if (!utxos || utxos?.length === 0) {
    throw new Error("No utxos found");
  }
  if (!collateral) {
    throw new Error("No collateral found");
  }
  if (!walletAddress) {
    throw new Error("No wallet address found");
  }
  return { utxos, collateral, walletAddress };
}

export function getScript(
  blueprintCompiledCode: string,
  params: string[] = [],
  version: "V1" | "V2" | "V3" = "V3"
) {
  const scriptCbor = applyParamsToScript(blueprintCompiledCode, params);

  const scriptAddr = serializePlutusScript(
    { code: scriptCbor, version: version },
    undefined,
    0
  ).address;

  return { scriptCbor, scriptAddr };
}

export function getTxBuilder() {
  return new MeshTxBuilder({
    fetcher: blockchainProvider,
    submitter: blockchainProvider,
  });
}

export async function getUtxoByTxHash(txHash: string): Promise<UTxO> {
  const utxos = await blockchainProvider.fetchUTxOs(txHash);
  if (utxos.length === 0) {
    throw new Error("UTxO not found");
  }
  return utxos[0];
}

export async function getScriptUtxos(scriptAddr: string): Promise<UTxO[]> {
  try {
    const utxos = await blockchainProvider.fetchAddressUTxOs(scriptAddr);

    return utxos;
  } catch (error) {
    console.error("Error fetching script UTXOs:", error);
    throw new Error(`Failed to fetch UTXOs for script address: ${scriptAddr}`);
  }
}
