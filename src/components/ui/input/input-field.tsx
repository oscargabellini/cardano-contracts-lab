import { AnyFieldApi } from "@tanstack/react-form";
import { cn } from "../../../lib/common/utils";
import { Input } from "./input";

type InputFieldProps = {
  label: string;
  name: string;
  placeholder: string;
  field: AnyFieldApi;
  validate?: boolean;
} & React.ComponentProps<typeof Input>;

export const InputField = (props: InputFieldProps) => {
  const { label, name, placeholder, field, ...rest } = props;

  return (
    <>
      <div>
        <Input
          label={label}
          type={props.type || "text"}
          placeholder={placeholder}
          {...rest}
          onChange={(e: any) => field.handleChange(e.target.value)}
          className={cn(
            "py-2 pl-2 pr-2 text-sm transition-colors",
            field.state.meta.isTouched && field.state.meta.errors.length
              ? "!border-destructive !border-2  focus:!ring-destructive "
              : "border border-secondary/30 dark:border-secondary/50"
          )}
        />

        <>
          {field.state.meta.isTouched && field.state.meta.errors.length ? (
            <div className="text-sm text-destructive mt-1">
              {field.state.meta.errors.join(",")}
            </div>
          ) : null}
          {props.validate && field.state.meta.isValidating
            ? "Validating..."
            : null}
        </>
      </div>
    </>
  );
};
