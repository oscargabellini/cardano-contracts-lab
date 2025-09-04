import React, { ReactNode } from "react";
import { cn } from "../../lib/common/utils";

type TransactionCardProps = {
  children: ReactNode;
  className?: string;
};

export const TransactionCard: React.FC<TransactionCardProps> = ({
  children,
  className = "",
}) => {
  return (
    <div className={cn("flex flex-col gap-4 w-full", className)}>
      {children}
    </div>
  );
};
