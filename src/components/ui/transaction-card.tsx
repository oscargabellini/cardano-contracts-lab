import React, { ReactNode } from "react";
import { cn } from "../../lib/common/utils";

type TransactionCardProps = {
  children: ReactNode;
  isTransactionDetailOpen?: boolean;
  transactionDetail?: ReactNode;
  className?: string;
};

export const TransactionCard: React.FC<TransactionCardProps> = ({
  children,
  isTransactionDetailOpen,
  transactionDetail,
  className = "",
}) => {
  return (
    <div className={cn("flex flex-col gap-4 w-full", className)}>
      {/* <Card className={`w-full border overflow-hidden shadow-md ${className}`}>
        <CardHeader className="bg-primary/10">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-full bg-primary/80 dark:bg-primary/50 text-primary-foreground">
              {icon}
            </div>
            <CardTitle className="text-xl font-medium">{title}</CardTitle>
          </div>
        </CardHeader>

        <CardContent className="pt-6 pb-8">{children}</CardContent>

        {isTransactionDetailOpen && transactionDetail}
      </Card> */}
      {children}
      {isTransactionDetailOpen && transactionDetail}
    </div>
  );
};
