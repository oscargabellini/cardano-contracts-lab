import { CardanoWallet } from "@meshsdk/react";
import { useTheme } from "next-themes";
import { useToast } from "./toast";

export const WalletButton = () => {
  const { theme } = useTheme();
  const { toast } = useToast();
  return (
    <CardanoWallet
      isDark={theme === "dark"}
      label="Connect Wallet"
      onConnected={() => {
        toast({
          title: "Connected",
          description: "Cardano wallet successfully connected",
        });
      }}
    />
  );
};
