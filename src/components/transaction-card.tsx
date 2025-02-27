import React, { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

type TransactionCardProps = {
  title: string;
  icon: ReactNode;
  children: ReactNode;
  isTransactionSubmitted?: boolean;
  transactionDetail?: ReactNode;
  className?: string;
};

export const TransactionCard: React.FC<TransactionCardProps> = ({
  title,
  icon,
  children,
  isTransactionSubmitted,
  transactionDetail,
  className = "",
}) => {
  return (
    <div className="flex justify-center w-full my-8">
      <Card
        className={`w-[75%] border border-purple-100 dark:border-purple-900/30 overflow-hidden shadow-md ${className}`}
      >
        <CardHeader className="bg-gradient-to-r from-purple-50 to-white dark:from-purple-950/30 dark:to-slate-900/60 border-b border-purple-100 dark:border-purple-900/20">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/40 rounded-full">
              {icon}
            </div>
            <CardTitle className="text-xl text-purple-900 dark:text-purple-300">
              {title}
            </CardTitle>
          </div>
        </CardHeader>

        <CardContent className="pt-6 pb-8">{children}</CardContent>

        {isTransactionSubmitted && transactionDetail}
      </Card>
    </div>
  );
};
