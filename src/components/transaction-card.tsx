import React, { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

type TransactionCardProps = {
  title: string;
  icon: ReactNode;
  children: ReactNode;
  isTransactionDetailOpen?: boolean;
  transactionDetail?: ReactNode;
  className?: string;
};

export const TransactionCard: React.FC<TransactionCardProps> = ({
  title,
  icon,
  children,
  isTransactionDetailOpen,
  transactionDetail,
  className = "",
}) => {
  return (
    <div className="flex justify-center w-full my-8">
      <Card className={`w-[75%] border overflow-hidden shadow-md ${className}`}>
        <CardHeader className="bg-gradient-to-r from-primary/20 to-primary/10 border-b ">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/20 dark:bg-primary/30 rounded-full">
              {icon}
            </div>
            <CardTitle className="text-xl text-primary-foreground">
              {title}
            </CardTitle>
          </div>
        </CardHeader>

        <CardContent className="pt-6 pb-8">{children}</CardContent>

        {isTransactionDetailOpen && transactionDetail}
      </Card>
    </div>
  );
};
