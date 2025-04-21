import { Outlet, useNavigate } from "@tanstack/react-router";
import { ArrowLeftIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "../../components/ui/button";
import { PageContainer } from "../../components/ui/page-container";
import { AnswerCard, QuestionCard } from "./quiz-options";

export const QuizPage = () => {
  const navigate = useNavigate();
  const [activeCard, setActiveCard] = useState<"question" | "answer">();

  return (
    <PageContainer>
      <Button
        variant="link"
        className="text-secondary-foreground"
        onClick={() => navigate({ to: "/" })}
      >
        <ArrowLeftIcon className="w-4 h-4" /> Select another contract
      </Button>
      <div className="flex flex-col gap-6 md:grid md:grid-cols-2 md:gap-20">
        <QuestionCard
          isActive={activeCard === "question"}
          onClick={() => {
            setActiveCard("question");
            navigate({ to: "/quiz/add-question" });
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
      <Outlet />
    </PageContainer>
  );
};
