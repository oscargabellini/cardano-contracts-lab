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
    <>
      <Input
        type={props.type || "text"}
        {...props}
        {...field}
        className={cn(
          "py-5 pl-10 pr-4 text-sm transition-colors",
          meta.touched && meta.error
            ? "!border-red-300  focus:!ring-red-300 "
            : "border border-gray-300 dark:border-gray-700"
        )}
        onChange={(e) => field.onChange(e)}
        onBlur={field.onBlur}
      />
      <div className="text-sm text-red-600 dark:text-red-400 mt-1">
        <ErrorMessage name={props.name} />
      </div>
    </>
  );
};
