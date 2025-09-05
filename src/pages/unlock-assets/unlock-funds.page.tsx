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
import { LockCard } from "./components/lock-card";
import { UnlockCard } from "./components/unlock-card";

export const UnlockFundsPage = () => {
  const [transactionDetails, setTransactionDetails] =
    useState<TransactionDetails>();

  const lockInformationModal = useModal();
  const unlockInformationModal = useModal();

  const transactionDetailsModal = useModal();

  return (
    <PageContainer>
      <GoBackButton navigateto="/" className="py-6">
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
          icon={<LockIcon className="h-6 w-6 " />}
          title="Lock Funds"
          description="When you lock funds, they are securely stored in a Cardano smart contract. You'll receive a unique Transaction ID that you can use to unlock your funds later."
        />
      </Modal.Trigger>
      <Modal.Content className="max-h-[90vh] h-[550px] md:h-auto">
        <Modal.Header>
          <Modal.Title>Lock Funds</Modal.Title>
        </Modal.Header>
        <LockCard
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
          title="Unlock Funds"
          description="To unlock your funds, simply provide the Transaction ID. The smart contract will verify your ownership and return the funds to your wallet."
        />
      </Modal.Trigger>
      <Modal.Content className="max-h-[90vh] h-[550px] md:h-auto">
        <Modal.Header>
          <Modal.Title>Unlock Funds</Modal.Title>
        </Modal.Header>
        <UnlockCard
          onComplete={props.onComplete}
          onClose={() => props.onOpenChange(false)}
        />
      </Modal.Content>
    </Modal>
  );
};
