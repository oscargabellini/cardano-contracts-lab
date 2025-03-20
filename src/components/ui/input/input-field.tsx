import { ErrorMessage, useField } from "formik";
import { cn } from "../../../lib/utils";
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
          "py-5 pl-10 pr-4 text-sm transition-colors",
          meta.touched && meta.error
            ? "!border-destructive  focus:!ring-destructive "
            : "border border-secondary/30 dark:border-secondary/50"
        )}
        onChange={(e) => field.onChange(e)}
        onBlur={field.onBlur}
      />
      <div className="text-sm text-destructive mt-1">
        <ErrorMessage name={props.name} />
      </div>
    </div>
  );
};
