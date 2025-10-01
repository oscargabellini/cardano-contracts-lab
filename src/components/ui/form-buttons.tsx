import { useWallet } from "@meshsdk/react";
import { ReactNode } from "react";
import { ActionButton } from "./action-button";
import { Button } from "./button";
import { WalletButton } from "./wallet/wallet";

type FormButtonsProps = {
  onClose?: () => void;
  canSubmit: boolean;
  disabled?: boolean;
  isLoading?: boolean;
  primaryButtonChildren: ReactNode;
};

export const FormButtons = (props: FormButtonsProps) => {
  const { connected } = useWallet();

  return (
    <div className="flex flex-col-reverse md:flex-row gap-4 w-full mt-4 justify-end">
      {props.onClose && (
        <Button
          variant="secondary"
          onClick={props.onClose}
          disabled={props.disabled}
          type="button"
        >
          Close
        </Button>
      )}
      {connected ? (
        <ActionButton
          type="submit"
          isLoading={props.isLoading}
          disabled={!props.canSubmit}
          variant="primary"
        >
          {props.primaryButtonChildren}
        </ActionButton>
      ) : (
        <WalletButton />
      )}
    </div>
  );
};
