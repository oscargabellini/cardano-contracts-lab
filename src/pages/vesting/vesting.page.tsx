import { ArrowLeftIcon, LockIcon, UnlockIcon } from "lucide-react";
import { useState } from "react";
import { ContractInformationCard } from "../../components/features/contract-information-card";
import {
  VestingTransactionDetails,
  VestingTransactionDetailsModal,
} from "../../components/features/vest-transaction-detail";
import { GoBackButton } from "../../components/ui/go-back-button";
import { Modal } from "../../components/ui/modal/modal";
import { PageContainer } from "../../components/ui/page-container";
import { useModal } from "../../hooks/use-modal";
import { VestingForm } from "./components/vesting-form";
import { UnvestingForm } from "./unvesting-form";

export const VestingPage = () => {
  const [transactionDetails, setTransactionDetails] =
    useState<VestingTransactionDetails>();

  const vestingInformationModal = useModal();
  const unvestingInformationModal = useModal();

  const transactionDetailsModal = useModal();

  return (
    <PageContainer>
      <GoBackButton navigateto="/" className="py-6">
        <ArrowLeftIcon className="w-4 h-4" /> Select another contract
      </GoBackButton>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:grid md:grid-cols-2 gap-6 md:gap-20">
          <VestingInformationModal
            onComplete={(transactionDetails: VestingTransactionDetails) => {
              setTransactionDetails(transactionDetails);
              vestingInformationModal.close();
              transactionDetailsModal.open();
            }}
            open={vestingInformationModal.isOpen}
            onOpenChange={vestingInformationModal.toggle}
          />
          <UnvestingInformationModal
            onComplete={(transactionDetails: VestingTransactionDetails) => {
              setTransactionDetails(transactionDetails);
              unvestingInformationModal.close();
              transactionDetailsModal.open();
            }}
            open={unvestingInformationModal.isOpen}
            onOpenChange={unvestingInformationModal.toggle}
          />
        </div>
      </div>
      {transactionDetailsModal.isOpen && transactionDetails && (
        <VestingTransactionDetailsModal
          transactionDetails={transactionDetails}
          open={transactionDetailsModal.isOpen}
          onOpenChange={transactionDetailsModal.toggle}
        />
      )}
    </PageContainer>
  );
};

const VestingInformationModal = (props: {
  onComplete: (transactionDetails: VestingTransactionDetails) => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  return (
    <Modal open={props.open} onOpenChange={props.onOpenChange}>
      <Modal.Trigger>
        <ContractInformationCard
          icon={<LockIcon className="h-6 w-6" />}
          title="Vest Funds"
          description="When you vest funds, the funds are stored
                  securely in the smart contract. You will receive a unique Transaction ID 
                  that you can use to unvest your funds when the the date is reached."
        />
      </Modal.Trigger>
      <Modal.Content className="max-h-[90vh] h-[600px] md:h-auto">
        <Modal.Header>
          <Modal.Title>Vest Funds</Modal.Title>
        </Modal.Header>
        <VestingForm
          onComplete={props.onComplete}
          onClose={() => props.onOpenChange(false)}
        />
      </Modal.Content>
    </Modal>
  );
};

const UnvestingInformationModal = (props: {
  onComplete: (transactionDetails: VestingTransactionDetails) => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  return (
    <Modal open={props.open} onOpenChange={props.onOpenChange}>
      <Modal.Trigger>
        <ContractInformationCard
          icon={<UnlockIcon className="h-6 w-6" />}
          title="Unvest Funds"
          description=" To unvest your funds, you need to provide both the transaction
                  hash and the date is to be reached."
        />
      </Modal.Trigger>
      <Modal.Content className="max-h-[90vh] h-[600px] md:h-auto">
        <Modal.Header>
          <Modal.Title>Unvest Funds</Modal.Title>
        </Modal.Header>
        <UnvestingForm
          onComplete={props.onComplete}
          onClose={() => props.onOpenChange(false)}
        />
      </Modal.Content>
    </Modal>
  );
};
