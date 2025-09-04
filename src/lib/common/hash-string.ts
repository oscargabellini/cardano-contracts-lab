import { blake2b } from "blakejs";

export const hashString = (string: string) => {
  const inputBytes = new TextEncoder().encode(string);
  const hashBytes = blake2b(inputBytes, undefined, 32);
  return Buffer.from(hashBytes).toString("hex").toUpperCase();
};
