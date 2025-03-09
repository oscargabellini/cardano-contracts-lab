import { AlertTriangleIcon, CheckCircleIcon, InfoIcon } from "lucide-react";
import { TOAST_REMOVE_DELAY, useToast } from "./hooks/use-toast";
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "./toast";

const iconMap = {
  default: <InfoIcon className="h-7 w-7" />,
  destructive: <AlertTriangleIcon className="h-7 w-7 text-white" />,
  success: <CheckCircleIcon className="h-7 w-7 text-primary/100" />,
};

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider duration={TOAST_REMOVE_DELAY}>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props}>
            <div className="flex gap-4">
              {iconMap[props.variant || "default"]}
              <div className="grid gap-1">
                {title && <ToastTitle>{title}</ToastTitle>}
                {description && (
                  <ToastDescription>{description}</ToastDescription>
                )}
              </div>
            </div>

            {action}
            <ToastClose />
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}
