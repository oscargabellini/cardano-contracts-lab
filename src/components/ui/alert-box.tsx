import { AlertTriangleIcon, CheckCircleIcon, InfoIcon } from "lucide-react";
import React, { ReactNode } from "react";

type AlertBoxProps = {
  icon?: ReactNode;
  children: ReactNode;
  variant?: "info" | "warning" | "success";
  className?: string;
};

export const AlertBox: React.FC<AlertBoxProps> = ({
  icon,
  children,
  variant = "info",
  className = "",
}) => {
  const variantStyles = {
    info: "bg-blue-50 dark:bg-blue-950/30 border-blue-100 dark:border-blue-900/20 text-blue-700 dark:text-blue-300",
    warning:
      "bg-amber-50 dark:bg-amber-950/30 border-amber-100 dark:border-amber-900/20 text-amber-700 dark:text-amber-300",
    success:
      "bg-green-50 dark:bg-green-950/30 border-green-100 dark:border-green-900/20 text-green-700 dark:text-green-300",
  };

  const getIcon = () => {
    switch (variant) {
      case "info":
        return <InfoIcon />;

      case "warning":
        return <AlertTriangleIcon />;

      case "success":
        return <CheckCircleIcon />;
    }
  };

  return (
    <div
      className={`flex items-center p-4 rounded-lg border ${variantStyles[variant]} ${className}`}
    >
      <div className="mr-3">{icon || getIcon()}</div>
      <p className="text-sm">{children}</p>
    </div>
  );
};
