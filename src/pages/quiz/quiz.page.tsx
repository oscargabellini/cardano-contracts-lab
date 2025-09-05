import { ArrowLeftIcon, CheckCircle, PlusCircle } from "lucide-react";
import { useState } from "react";
import { ContractInformationCard } from "../../components/features/contract-information-card";
import { QuizTransactionDetailsModal } from "../../components/features/quiz-transaction-detail";
import { GoBackButton } from "../../components/ui/go-back-button";
import { Modal } from "../../components/ui/modal/modal";
import { PageContainer } from "../../components/ui/page-container";
import { useModal } from "../../hooks/use-modal";
import { AddQuestionForm } from "./forms/question-form";
import { QuestionsList } from "./question-list";

export type QuizTransactionDetails = {
  amount: string;
  question: string;
  answer: string;
  txHash: string;
};

export const QuizPage = () => {
  const [quizTransactionDetails, setQuizTransactionDetails] =
    useState<QuizTransactionDetails>();

  const [showQuestionList, setShowQuestionList] = useState(false);

  const createQuizModal = useModal();

  const createDetailsModal = useModal();

  return (
    <PageContainer>
      <GoBackButton navigateto="/">
        <ArrowLeftIcon className="w-4 h-4" /> Select another contract
      </GoBackButton>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-6 md:grid md:grid-cols-2 md:gap-20">
          <CreateQuizModal
            open={createQuizModal.isOpen}
            onOpenChange={createQuizModal.toggle}
            onComplete={(transactionDetails) => {
              setQuizTransactionDetails(transactionDetails);
              createQuizModal.close();
              createDetailsModal.open();
            }}
          />

          <AnswerQuizCard
            onClick={() => {
              setShowQuestionList(true);
            }}
          />

          {createDetailsModal.isOpen && quizTransactionDetails && (
            <QuizTransactionDetailsModal
              open={createDetailsModal.isOpen}
              onOpenChange={createDetailsModal.toggle}
              type="create"
              transactionDetails={quizTransactionDetails}
            />
          )}
        </div>
      </div>
      {showQuestionList && <QuestionsList />}
    </PageContainer>
  );
};

type CreateQuizModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onComplete: (transactionDetails: QuizTransactionDetails) => void;
};

const CreateQuizModal = (props: CreateQuizModalProps) => {
  return (
    <Modal open={props.open} onOpenChange={props.onOpenChange}>
      <Modal.Trigger>
        <ContractInformationCard
          icon={<PlusCircle className="h-6 w-6" />}
          title="Create a Quiz"
          description="Create a quiz with ADA as
                  reward. The reward is locked in the smart contract until
                  someone answers correctly."
        />
      </Modal.Trigger>
      <Modal.Content className="max-h-[90vh] h-[700px] md:h-auto">
        <Modal.Header>
          <Modal.Title>Create a Quiz</Modal.Title>
        </Modal.Header>
        <AddQuestionForm
          onComplete={props.onComplete}
          onClose={() => props.onOpenChange(false)}
        />
      </Modal.Content>
    </Modal>
  );
};

const AnswerQuizCard = (props: { onClick: () => void }) => {
  return (
    <div onClick={props.onClick}>
      <ContractInformationCard
        icon={<CheckCircle className="h-6 w-6" />}
        title="Answer a Quiz"
        description="Browse available quizzes and submit your answers. If you
                  answer correctly, you'll receive the ADA reward instantly."
      />
    </div>
  );
};
