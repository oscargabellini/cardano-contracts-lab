import { XIcon } from "lucide-react";
import { Button } from "../ui/button";

type QuizTransactionDetailProps = {
  amount: string;
  question: string;
  answer: string;
  onCloseDetail: () => void;
  txHash: string;
};

export const QuizTransactionDetail = (props: QuizTransactionDetailProps) => {
  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="text-base font-medium text-primary dark:text-primary-foreground ">
          Transaction Details
        </p>

        <div className="flex justify-end">
          <Button variant="secondary" size="icon" onClick={props.onCloseDetail}>
            <XIcon />
          </Button>
        </div>
      </div>
      <div className="bg-secondary/20 p-4 rounded-lg border">
        <p className="font-medium text-base mb-3">Quiz Summary</p>

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
        </div>
      </div>
    </div>
  );
};
