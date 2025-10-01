import { CardanoWallet, useWallet } from "@meshsdk/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../dropdown-menu";
import { useToast } from "../toast";
import "./wallet.css";

export const WalletButton = () => {
  const { resolvedTheme } = useTheme();
  const { toast } = useToast();
  const { wallet: connectedWallet, disconnect, address } = useWallet();
  const [balance, setBalance] = useState<string>("0");
  const [isConnected, setIsConnected] = useState<boolean>(false);

  const getBalance = async () => {
    if (isConnected) {
      const balance = await connectedWallet.getBalance();
      const lovelaceAmount =
        balance.find((asset) => asset.unit === "lovelace")?.quantity || "0";
      const adaAmount = (parseInt(lovelaceAmount) / 1000000).toFixed(2);
      setBalance(adaAmount);
    }
  };

  useEffect(() => {
    getBalance();
  }, [isConnected]);

  const onConnected = () => {
    toast({
      title: "Connected",
      description: "Cardano wallet successfully connected",
      variant: "success",
    });
    setIsConnected(true);
  };

  const onDisconnected = () => {
    disconnect();
    toast({
      title: "Disconnected",
      description: "Cardano wallet successfully disconnected",
      variant: "success",
    });
    setIsConnected(false);
  };

  if (isConnected) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger className="inline-flex items-center justify-center rounded-full text-sm font-medium h-9 px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 transition-colors">
          {balance} ₳
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            onClick={() => navigator.clipboard.writeText(address)}
          >
            Copy Address
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onDisconnected}>
            Disconnect Wallet
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <div className="custom-wallet-wrapper">
      <CardanoWallet
        isDark={resolvedTheme === "dark"}
        onConnected={onConnected}
        persist={true}
      />
    </div>
  );
};
