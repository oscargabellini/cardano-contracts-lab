export const extractQuestionFromDatum = (plutusData: string): string | null => {
  try {
    if (!plutusData.startsWith("d8799f")) {
      return null;
    }

    const content = plutusData.substring(6, plutusData.length - 2);

    const parts = content.split(/(?=58)/);

    if (parts.length >= 2) {
      const questionPart = parts[parts.length - 1];

      if (questionPart.startsWith("58")) {
        const lengthHex = questionPart.substring(2, 4);
        const length = parseInt(lengthHex, 16);

        const hexQuestion = questionPart.substring(4, 4 + length * 2);
        const question = hexToString(hexQuestion);

        return question;
      }
    }

    return null;
  } catch (error) {
    console.error("Error extracting question:", error);
    return null;
  }
};

const hexToString = (hex: string): string => {
  let str = "";
  for (let i = 0; i < hex.length; i += 2) {
    const charCode = parseInt(hex.substring(i, i + 2), 16);
    str += String.fromCharCode(charCode);
  }
  return str;
};
