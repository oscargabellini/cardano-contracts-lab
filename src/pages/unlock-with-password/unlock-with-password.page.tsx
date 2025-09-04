import { ArrowLeftIcon, LockIcon, UnlockIcon } from "lucide-react";
import { useState } from "react";
import { ContractInformationCard } from "../../components/features/contract-information-card";
import {
  TransactionDetails,
  TransactionDetailsModal,
} from "../../components/features/transaction-details";
import { GoBackButton } from "../../components/ui/go-back-button";
import { Modal } from "../../components/ui/modal/modal";
import { PageContainer } from "../../components/ui/page-container";
import { useModal } from "../../hooks/use-modal";
import { LockWithPasswordCard } from "./components/lock-card";
import { UnlockWithPasswordCard } from "./components/unlock-card";

export const UnlockWithPasswordPage = () => {
  const [transactionDetails, setTransactionDetails] =
    useState<TransactionDetails>();

  const lockInformationModal = useModal();
  const unlockInformationModal = useModal();

  const transactionDetailsModal = useModal();

  return (
    <PageContainer>
      <GoBackButton navigateTo="/" className="py-6">
        <ArrowLeftIcon className="w-4 h-4" /> Select another contract
      </GoBackButton>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:grid md:grid-cols-2 gap-6 md:gap-20">
          <LockInformationModal
            onComplete={(transactionDetails: TransactionDetails) => {
              setTransactionDetails(transactionDetails);
              lockInformationModal.close();
              transactionDetailsModal.open();
            }}
            open={lockInformationModal.isOpen}
            onOpenChange={lockInformationModal.toggle}
          />
          <UnlockInformationModal
            onComplete={(transactionDetails: TransactionDetails) => {
              setTransactionDetails(transactionDetails);
              unlockInformationModal.close();
              transactionDetailsModal.open();
            }}
            open={unlockInformationModal.isOpen}
            onOpenChange={unlockInformationModal.toggle}
          />
        </div>
      </div>
      {transactionDetailsModal.isOpen && transactionDetails && (
        <TransactionDetailsModal
          transactionDetails={transactionDetails}
          open={transactionDetailsModal.isOpen}
          onOpenChange={transactionDetailsModal.toggle}
        />
      )}
    </PageContainer>
  );
};

const LockInformationModal = (props: {
  onComplete: (transactionDetails: TransactionDetails) => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  return (
    <Modal open={props.open} onOpenChange={props.onOpenChange}>
      <Modal.Trigger>
        <ContractInformationCard
          icon={<LockIcon className="h-6 w-6" />}
          title="Lock Funds with Password"
          description="When you lock funds with a password, the password is stored
                  securely in the smart contract. This adds an extra layer of
                  security to your locked funds."
        />
      </Modal.Trigger>
      <Modal.Content className="max-h-[90vh] h-[600px] md:h-auto">
        <Modal.Header>
          <Modal.Title>Lock Funds with Password</Modal.Title>
        </Modal.Header>
        <LockWithPasswordCard
          onComplete={props.onComplete}
          onClose={() => props.onOpenChange(false)}
        />
      </Modal.Content>
    </Modal>
  );
};

const UnlockInformationModal = (props: {
  onComplete: (transactionDetails: TransactionDetails) => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  return (
    <Modal open={props.open} onOpenChange={props.onOpenChange}>
      <Modal.Trigger>
        <ContractInformationCard
          icon={<UnlockIcon className="h-6 w-6" />}
          title="Unlock Funds with Password"
          description=" To unlock your funds, you need to provide both the transaction
                  hash and the password you used when locking the funds. This
                  ensures that only you can access your funds."
        />
      </Modal.Trigger>
      <Modal.Content className="max-h-[90vh] h-[600px] md:h-auto">
        <Modal.Header>
          <Modal.Title>Unlock Funds with Password</Modal.Title>
        </Modal.Header>
        <UnlockWithPasswordCard
          onComplete={props.onComplete}
          onClose={() => props.onOpenChange(false)}
        />
      </Modal.Content>
    </Modal>
  );
};
