import { CopyIcon, XIcon } from "lucide-react";
import { Button } from "../ui/button";
import { useToast } from "../ui/toast";

type QuizTransactionDetailProps = {
  amount: string;
  question: string;
  answer: string;
  onCloseDetail: () => void;
  txHash: string;
};

export const QuizTransactionDetail = (props: QuizTransactionDetailProps) => {
  const { toast } = useToast();
  return (
    <div>
      <div className="bg-secondary/20 p-6 rounded-lg">
        <div className="flex justify-between items-center">
          <p className="font-medium text-base mb-3">Quiz Summary</p>
          <Button variant="secondary" size="icon" onClick={props.onCloseDetail}>
            <XIcon />
          </Button>
        </div>

        <div className="space-y-3">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Prize Amount</p>
            <p className="text-lg font-semibold text-primary">
              {props.amount} ₳
            </p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground mb-1">Question</p>
            <p className="text-base font-medium">{props.question}</p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground mb-1">Correct Answer</p>
            <p className="text-base font-medium">{props.answer}</p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground mb-1">
              Transaction Hash
            </p>
            <p className="text-base font-medium">{props.txHash}</p>
          </div>

          <div className="flex justify-between items-center mt-2">
            <Button
              variant="secondary"
              className="text-xs px-3 py-1 bg-primary/20 dark:bg-primary/40 rounded-full"
              onClick={() => {
                navigator.clipboard.writeText(props.txHash);
                toast({
                  title: "Transaction hash copied to clipboard",
                  variant: "success",
                });
              }}
            >
              Copy Hash <CopyIcon className="w-4 h-4" />
            </Button>
            <Button variant="link">
              <a
                href={`https://preprod.cexplorer.io/tx/${props.txHash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-sm text-primary/100 hover:text-primary/100 transition-colors"
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
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
