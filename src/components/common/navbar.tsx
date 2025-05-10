import { SunIcon } from "@radix-ui/react-icons";
import { Monitor, MoonStar } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { WalletButton } from "../ui/wallet/wallet";

export function Navbar() {
  const { setTheme, theme } = useTheme();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className=" px-4 flex h-14 items-center">
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="flex items-center gap-2">
            <WalletButton />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="icon" className="rounded-full w-fit px-5">
                  {theme === "dark" ? (
                    <MoonStar className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
                  ) : theme === "light" ? (
                    <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
                  ) : (
                    <Monitor className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
                  )}
                  <span className="sr-only">Toggle theme</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme("light")}>
                  Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                  Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                  System
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}
