import { useNavigate } from "@tanstack/react-router";
import { cn } from "../../lib/common/utils";
import { Button, ButtonProps } from "./button";

type GoBackButtonProps = {
  navigateTo: string;
} & ButtonProps;

export const GoBackButton = (props: GoBackButtonProps) => {
  const navigate = useNavigate();

  return (
    <Button
      {...props}
      variant="link"
      onClick={() => navigate({ to: props.navigateTo })}
      className={cn("text-secondary-foreground text-lg py-3", props.className)}
    >
      {props.children}
    </Button>
  );
};
