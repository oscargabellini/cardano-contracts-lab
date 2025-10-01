import { AnyFieldApi } from "@tanstack/react-form";
import { cn } from "../../../lib/common/utils";
import { DatePicker } from "./date-picker";

type DatePickerFieldProps = {
  label: string;
  name: string;
  placeholder: string;
  field: AnyFieldApi;
  validate?: boolean;
} & React.ComponentProps<typeof DatePicker>;

export const DatePickerField = (props: DatePickerFieldProps) => {
  const { label, name, placeholder, field, disabled, ...rest } = props;

  return (
    <>
      <div>
        <DatePicker
          label={label}
          placeholder={placeholder}
          disabled={disabled}
          {...rest}
          onChange={(date: Date | undefined) =>
            field.handleChange(date ? date.toISOString() : "")
          }
          className={cn(
            "text-sm transition-colors rounded-md border border-secondary/30 dark:border-secondary/50",
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
