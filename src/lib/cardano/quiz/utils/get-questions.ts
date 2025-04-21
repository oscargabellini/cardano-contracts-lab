import { UTxO } from "@meshsdk/core";
import { getScriptUtxos } from "../../cardano-helpers";
import { extractQuestionFromDatum } from "./extract-question-from-datum";

export type Question = {
  id: string;
  utxo: UTxO;
  question: string | null;
  value: string;
  valueFormatted: string;
};

export const getAvailableQuestions = async (
  scriptAddr: string
): Promise<Question[] | null> => {
  try {
    const scriptUtxos = await getScriptUtxos(scriptAddr);

    const availableQuizzes = scriptUtxos
      .filter((utxo) => utxo.output.plutusData)
      .map((utxo) => {
        if (!utxo.output.plutusData) {
          return null;
        }
        const question = extractQuestionFromDatum(utxo.output.plutusData);

        const lovelaceValue =
          utxo.output.amount.find((asset) => asset.unit === "lovelace")
            ?.quantity || "0";

        return {
          id: `${utxo.input.txHash}`,
          utxo: utxo,
          question: question,
          value: lovelaceValue,
          valueFormatted: `${parseInt(lovelaceValue) / 1000000} ₳`,
        };
      });

    return availableQuizzes.filter(
      (quiz) => quiz?.question !== null
    ) as Question[];
  } catch (error) {
    console.error("Error fetching quiz questions:", error);
    return [];
  }
};
