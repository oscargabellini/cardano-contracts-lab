import { CardanoWallet, useWallet } from "@meshsdk/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import { useToast } from "./toast";

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
        <DropdownMenuTrigger className="inline-flex items-center justify-center rounded-full min-w-[200px] text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-9 px-4 py-2 bg-gradient-to-r from-[#5600ff] via-[#6c0aff] to-[#5200bc] text-white transition-opacity duration-300 ease-in-out">
          ₳ {balance}
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
    <div className="[&_.mesh-inline-flex]:inline-flex [&_.mesh-inline-flex]:items-center [&_.mesh-inline-flex]:justify-center [&_.mesh-inline-flex]:rounded-full [&_.mesh-inline-flex]:min-w-[200px] [&_.mesh-inline-flex]:text-sm [&_.mesh-inline-flex]:font-medium [&_.mesh-inline-flex]:focus-visible:outline-none [&_.mesh-inline-flex]:focus-visible:ring-2 [&_.mesh-inline-flex]:focus-visible:ring-purple-500 [&_.mesh-inline-flex]:focus-visible:ring-offset-2 [&_.mesh-inline-flex]:disabled:pointer-events-none [&_.mesh-inline-flex]:disabled:opacity-50 [&_.mesh-inline-flex]:h-9 [&_.mesh-inline-flex]:px-4 [&_.mesh-inline-flex]:py-2 [&_.mesh-inline-flex]:bg-gradient-to-r [&_.mesh-inline-flex]:from-[#5600ff] [&_.mesh-inline-flex]:via-[#6c0aff] [&_.mesh-inline-flex]:to-[#5200bc] [&_.mesh-inline-flex]:text-white [&_.mesh-inline-flex]:transition-opacity [&_.mesh-inline-flex]:duration-300 [&_.mesh-inline-flex]:ease-in-out">
      <CardanoWallet
        isDark={resolvedTheme === "dark"}
        onConnected={onConnected}
      />
    </div>
  );
};
