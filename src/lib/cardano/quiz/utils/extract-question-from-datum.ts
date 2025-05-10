import { deserializeDatum, hexToString } from "@meshsdk/core";

export const extractQuestionFromDatum = (plutusData: string): string | null => {
  try {
    const datumData = deserializeDatum(plutusData);

    if (
      datumData &&
      "fields" in datumData &&
      Array.isArray(datumData.fields) &&
      datumData.fields.length >= 2
    ) {
      const secondElement = datumData.fields[1];

      if (
        secondElement &&
        typeof secondElement === "object" &&
        "bytes" in secondElement
      ) {
        return hexToString(secondElement.bytes);
      }
    }

    return null;
  } catch (error) {
    console.error("Error extracting question:", error);
    return null;
  }
};
