import { Outlet, useNavigate } from "@tanstack/react-router";
import {
  ArrowLeftIcon,
  CheckCircle,
  PlusCircle,
  ShieldCheck,
} from "lucide-react";
import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../components/ui/accordion";
import { GoBackButton } from "../../components/ui/go-back-button";
import { Modal } from "../../components/ui/modal/modal";
import { PageContainer } from "../../components/ui/page-container";
import { AddQuestionForm } from "./forms/question-form";
import { AnswerCard, QuestionCard } from "./quiz-options";

export const QuizPage = () => {
  const navigate = useNavigate();
  const [activeCard, setActiveCard] = useState<"question" | "answer">();

  return (
    <PageContainer>
      <GoBackButton navigateTo="/">
        <ArrowLeftIcon className="w-4 h-4" /> Select another contract
      </GoBackButton>
      <div className="flex flex-col gap-6">
        <HowItWorks />
        <div className="flex flex-col gap-6 md:grid md:grid-cols-2 md:gap-20">
          <QuestionCard
            isActive={activeCard === "question"}
            onClick={() => {
              setActiveCard("question");
              navigate({ to: "/quiz/add-question" });
            }}
          />
          <CreateQuizModal
            open={activeCard === "question"}
            onOpenChange={(open) => {
              if (!open) {
                setActiveCard(undefined);
              }
            }}
          />
          <AnswerCard
            isActive={activeCard === "answer"}
            onClick={() => {
              setActiveCard("answer");
              navigate({ to: "/quiz/select-question" });
            }}
          />
        </div>
      </div>
      <Outlet />
    </PageContainer>
  );
};

const HowItWorks = () => {
  return (
    <Accordion
      type="single"
      collapsible
      defaultValue="how-it-works"
      className="border-2 rounded-lg border-border/50 bg-gradient-to-br from-secondary/30 to-background"
    >
      <AccordionItem value="how-it-works" className="border-b-0">
        <AccordionTrigger className="px-6 py-4 hover:no-underline">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-semibold">How It Works</h2>
          </div>
        </AccordionTrigger>
        <AccordionContent className="px-6 pb-6 pt-2">
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <PlusCircle className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium text-lg">Create a Quiz</h3>
                <p className="text-muted-foreground">
                  Create a quiz with a question, the correct answer and ADA as
                  reward. The reward is locked in the smart contract until
                  someone answers correctly.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <CheckCircle className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium text-lg">Answer Quizzes</h3>
                <p className="text-muted-foreground">
                  Browse available quizzes and submit your answers. If you
                  answer correctly, you'll receive the ADA reward instantly.
                </p>
              </div>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

type CreateQuizModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const CreateQuizModal = (props: CreateQuizModalProps) => {
  return (
    <Modal open={props.open} onOpenChange={props.onOpenChange}>
      <Modal.Content>
        <Modal.Header>
          <Modal.Title>Create a Quiz</Modal.Title>
        </Modal.Header>
        <AddQuestionForm />
      </Modal.Content>
    </Modal>
  );
};
