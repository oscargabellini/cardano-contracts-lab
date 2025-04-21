import * as React from "react";
import { cn } from "../../../lib/common/utils";

type BaseInputProps = {
  label?: string;
  className?: string;
  style?: React.CSSProperties;
};

type InputProps = BaseInputProps &
  (
    | (Omit<React.ComponentProps<"input">, "type"> & {
        type?: Exclude<React.HTMLInputTypeAttribute, "textarea">;
      })
    | (Omit<React.ComponentProps<"textarea">, "type"> & {
        type: "textarea";
      })
  );

const Input = React.forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  InputProps
>(({ className, type = "text", style, label, ...props }, ref) => {
  return (
    <div>
      {label && (
        <label
          htmlFor="txHash"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          {label}
        </label>
      )}
      {type === "textarea" ? (
        <textarea
          className={cn(
            "flex min-h-28 w-full mt-0.5 rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            className
          )}
          style={{
            ...style,
            border: "0.5px solid hsl(var(--border))",
          }}
          ref={ref as React.Ref<HTMLTextAreaElement>}
          {...(props as Omit<React.ComponentProps<"textarea">, "type">)}
        />
      ) : (
        <input
          type={type}
          className={cn(
            "flex h-9 w-full mt-0.5 rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            className
          )}
          style={{
            ...style,
            border: "0.5px solid hsl(var(--border))",
          }}
          ref={ref as React.Ref<HTMLInputElement>}
          {...(props as Omit<React.ComponentProps<"input">, "type">)}
        />
      )}
    </div>
  );
});
Input.displayName = "Input";

export { Input };
