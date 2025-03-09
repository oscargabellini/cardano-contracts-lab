import * as React from "react";
import { cn } from "../../../lib/utils";

const Input = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<"input"> & { label?: string }
>(({ className, type, style, label, ...props }, ref) => {
  return (
    <>
      {label && (
        <label
          htmlFor="txHash"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          {label}
        </label>
      )}
      <input
        type={type}
        className={cn(
          "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        )}
        style={{
          ...style,
          border: "0.5px solid hsl(var(--border))",
          padding: "10px",
        }}
        ref={ref}
        {...props}
      />
    </>
  );
});
Input.displayName = "Input";

export { Input };
