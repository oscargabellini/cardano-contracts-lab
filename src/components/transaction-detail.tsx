import { CopyIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useToast } from "./ui/toast";

type TransactionDetailProps = {
  txHash: string;
};

export const TransactionDetail = ({ txHash }: TransactionDetailProps) => {
  const { toast } = useToast();
  return (
    <div className="mx-6 mb-4 p-5 rounded-lg border border-purple-200 bg-white/50 shadow-sm dark:bg-slate-900/60 dark:border-purple-900/30">
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-purple-900 dark:text-purple-300">
            Transaction Details
          </p>
          <Button
            variant="outline"
            className="text-xs px-3 py-1 rounded-full bg-purple-100 text-purple-700 hover:bg-purple-200 transition-colors dark:bg-purple-900/40 dark:text-purple-300 dark:hover:bg-purple-800/60"
            onClick={() => {
              navigator.clipboard.writeText(txHash);
              toast({
                title: "Transaction hash copied to clipboard",
                variant: "success",
              });
            }}
          >
            Copy Hash <CopyIcon className="w-4 h-4" />
          </Button>
        </div>

        <div className="p-3 bg-purple-50/80 rounded-md dark:bg-purple-950/30 border border-purple-100 dark:border-purple-900/20">
          <p className="text-xs text-purple-800 dark:text-purple-400 font-mono break-all">
            {txHash}
          </p>
        </div>

        <a
          href={`https://preprod.cexplorer.io/tx/${txHash}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-sm text-purple-700 dark:text-purple-400 hover:text-purple-900 dark:hover:text-purple-300 transition-colors mt-1 self-end"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4"
            viewBox="0 0 16.67 18"
          >
            <g transform="matrix(1 0 0 1 7.41 9.76)">
              <g>
                <g transform="matrix(1 0 0 1 0.86 -0.8)" id="Vrstva_1">
                  <path
                    style={{ fill: "currentColor" }}
                    transform="translate(-10.86, -12.2)"
                    d="M 10.86 19.8 a 7.6 7.6 0 1 1 7.6 -7.6 A 7.6 7.6 0 0 1 10.86 19.8 Z"
                  />
                </g>
                <g transform="matrix(1 0 0 1 0.81 -1.08)" id="Vrstva_1">
                  <path
                    style={{ fill: "white" }}
                    transform="translate(-10.81, -11.92)"
                    d="M 8.46 13.2 h -0.8 c -0.3 0 -0.4 -0.1 -0.4 -0.4 a 0.43 0.43 0 0 1 0.4 -0.4 h 0.9 a 0.35 0.35 0 0 0 0.2 -0.1 a 1.42 1.42 0 0 0 0.2 -0.6 h -0.7 a 0.4 0.4 0 1 1 0 -0.8 h 0.8 c 0.1 0 0.2 0 0.2 -0.1 A 23.29 23.29 0 0 0 10.36 8 a 0.1 0.1 0 0 1 0.1 -0.1 c 0.1 -0.2 0.2 -0.3 0.4 -0.3 s 0.3 0.1 0.4 0.3 c 0.2 0.6 0.4 1.1 0.6 1.7 c 0.2 0.4 0.3 0.8 0.5 1.2 c 0 0.1 0.1 0.1 0.2 0.1 h 0.8 a 0.37 0.37 0 0 1 0.4 0.4 a 0.43 0.43 0 0 1 -0.4 0.4 h -0.7 a 4.88 4.88 0 0 0 0.3 0.7 a 0.35 0.35 0 0 0 0.2 0.1 h 0.9 c 0.1 0 0.3 0.1 0.3 0.2 a 0.6 0.6 0 0 1 -0.1 0.4 a 0.37 0.37 0 0 1 -0.3 0.1 h -0.8 a 3.55 3.55 0 0 0 0.4 0.9 l 0.6 1.5 c 0.1 0.3 0.1 0.5 -0.2 0.6 s -0.4 0 -0.5 -0.3 c -0.3 -0.9 -0.7 -1.7 -1 -2.6 c -0.1 -0.2 -0.1 -0.2 -0.3 -0.2 H 9.26 c -0.2 0 -0.2 0 -0.3 0.2 a 18.61 18.61 0 0 1 -1 2.5 c -0.1 0.2 -0.2 0.3 -0.4 0.3 a 0.27 0.27 0 0 1 -0.3 -0.3 a 0.37 0.37 0 0 1 0.1 -0.3 c 0.3 -0.7 0.5 -1.4 0.8 -2.1 C 8.36 13.4 8.36 13.3 8.46 13.2 Z m 1 -0.8 h 2.7 c -0.1 -0.2 -0.2 -0.5 -0.3 -0.7 a 0.35 0.35 0 0 0 -0.2 -0.1 H 9.86 c -0.1 0 -0.1 0 -0.2 0.1 A 1.45 1.45 0 0 1 9.46 12.4 Z m 2.2 -1.5 c -0.3 -0.7 -0.5 -1.3 -0.8 -2 c -0.3 0.7 -0.5 1.3 -0.8 2 Z"
                  />
                </g>
              </g>
            </g>
          </svg>
          View in Cardano Explorer
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-3 h-3"
          >
            <path d="M7 7h10v10" />
            <path d="M7 17 17 7" />
          </svg>
        </a>
      </div>
    </div>
  );
};
