import { AnyFieldApi } from "@tanstack/react-form";
import { ErrorMessage, useField } from "formik";
import { cn } from "../../../lib/common/utils";
import { Input } from "./input";

type InputFieldProps = {
  name: string;
  label: string;
  type?: "text" | "number";
  placeholder: string;
} & React.ComponentProps<typeof Input>;

export const InputField = (props: InputFieldProps) => {
  const [field, meta] = useField(props);
  return (
    <div>
      <Input
        type={props.type || "text"}
        {...props}
        {...field}
        className={cn(
          "py-1 pl-1 pr-1 text-sm transition-colors",
          meta.touched && meta.error
            ? "!border-destructive  focus:!ring-destructive "
            : "border border-secondary/30 dark:border-secondary/50"
        )}
        onChange={(e: any) => field.onChange(e)}
        onBlur={field.onBlur}
      />
      <div className="text-sm text-destructive mt-1">
        <ErrorMessage name={props.name} />
      </div>
    </div>
  );
};

type InputFieldTanstackProps = {
  label: string;
  name: string;
  placeholder: string;
  field: AnyFieldApi;
  validate?: boolean;
} & React.ComponentProps<typeof Input>;

export const InputFieldTanstack = (props: InputFieldTanstackProps) => {
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
              ? "!border-destructive  focus:!ring-destructive "
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
