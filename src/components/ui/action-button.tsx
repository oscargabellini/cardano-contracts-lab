import React, { ReactNode } from "react";
import { Button } from "./button";

type ActionButtonProps = {
  type?: "button" | "submit" | "reset";
  isLoading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  children: ReactNode;
  loadingText?: string;
  icon?: ReactNode;
  variant?: "default" | "primary" | "secondary" | "destructive" | "outline";
  className?: string;
};

export const ActionButton: React.FC<ActionButtonProps> = ({
  type = "button",
  isLoading = false,
  disabled = false,
  onClick,
  children,
  loadingText = "Processing...",
  icon,
  variant = "primary",
  className = "",
}) => {
  return (
    <Button
      type={type}
      disabled={isLoading || disabled}
      onClick={onClick}
      variant={variant}
      className={`relative overflow-hidden group ${className}`}
    >
      {isLoading ? (
        <div className="flex items-center gap-2">
          <LoadingIcon />
          {loadingText}
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <span>{children}</span>
          {icon && icon}
        </div>
      )}
    </Button>
  );
};

const LoadingIcon = () => {
  return (
    <svg
      className="animate-spin h-4 w-4 text-white"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  );
};
