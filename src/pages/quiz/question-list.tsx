import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import blueprint from "../../../aiken-workspace/quiz/plutus.json";
import { QuizTransactionDetailsModal } from "../../components/features/quiz-transaction-detail";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Modal } from "../../components/ui/modal/modal";
import { useModal } from "../../hooks/use-modal";
import { getScript } from "../../lib/cardano/cardano-helpers";
import {
  getAvailableQuestions,
  Question,
} from "../../lib/cardano/quiz/utils/get-questions";
import { AnswerDetails, AnswerQuizForm } from "./forms/answer-quiz-form";

export const QuestionsList = () => {
  const [quizzes, setQuizzes] = useState<Question[] | null>(null);
  const [selectedQuizId, setSelectedQuizId] = useState<string | null>(null);
  const [selectedQuiz, setSelectedQuiz] = useState<Question | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [answerDetails, setAnswerDetails] = useState<AnswerDetails | null>();

  const correctAnswerModal = useModal();
  const answerFormModal = useModal();

  const { scriptAddr } = getScript(blueprint.validators[0].compiledCode);

  const fetchQuestions = async () => {
    try {
      setIsLoading(true);
      const quizzes = await getAvailableQuestions(scriptAddr);
      setQuizzes(quizzes);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const handleQuizClick = (quiz: Question) => {
    setSelectedQuizId(quiz.id);
    setSelectedQuiz(quiz);
  };

  return (
    <div className="flex flex-col gap-4 mt-7">
      <p className="text-2xl">Available Quizzes</p>
      {isLoading ? (
        <div className="flex justify-center items-center h-full mt-10">
          <Loader2 className="w-10 h-10 animate-spin" />
        </div>
      ) : (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {quizzes?.map((quiz) => (
              <Modal
                open={answerFormModal.isOpen}
                onOpenChange={(open) => {
                  if (!open) {
                    setSelectedQuizId(null);
                    setSelectedQuiz(null);
                    answerFormModal.close();
                  }
                }}
                key={quiz.id}
              >
                <Modal.Trigger>
                  <QuestionCard
                    key={quiz.id}
                    quiz={quiz}
                    onClick={() => {
                      handleQuizClick(quiz);
                      answerFormModal.open();
                    }}
                    value={quiz.valueFormatted}
                    question={quiz.question}
                  />
                </Modal.Trigger>
                <Modal.Content>
                  <Modal.Header>
                    <Modal.Title>{selectedQuiz?.question}</Modal.Title>
                  </Modal.Header>
                  <div className="mt-4">
                    {selectedQuizId === selectedQuiz?.id &&
                      selectedQuiz?.question && (
                        <AnswerQuizForm
                          question={selectedQuiz.question}
                          questionHash={selectedQuiz.id}
                          onCorrectAnswer={(txHash, answer) => {
                            setAnswerDetails({
                              amount: selectedQuiz.valueFormatted,
                              question: selectedQuiz.question ?? "",
                              answer,
                              txHash,
                            });
                            setSelectedQuizId(null);
                            setSelectedQuiz(null);
                            answerFormModal.close();
                            correctAnswerModal.open();
                          }}
                          onClose={() => {
                            setSelectedQuizId(null);
                            setSelectedQuiz(null);
                            answerFormModal.close();
                          }}
                        />
                      )}
                  </div>
                </Modal.Content>
              </Modal>
            ))}

            {correctAnswerModal.isOpen && answerDetails && (
              <QuizTransactionDetailsModal
                open={correctAnswerModal.isOpen}
                onOpenChange={(open) => {
                  correctAnswerModal.toggle();
                  if (!open) {
                    fetchQuestions();
                  }
                }}
                transactionDetails={answerDetails}
                type="answer"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

type QuestionCardProps = {
  question: string | null;
  value: string;
  onClick: () => void;
  quiz: Question;
};
const QuestionCard = (props: QuestionCardProps) => {
  return (
    <div key={props.quiz.id} className="flex flex-col gap-4">
      <Card onClick={() => props.onClick()}>
        <CardHeader className="flex flex-col justify-between h-28">
          <CardTitle className="font-medium text-left">
            {props.quiz.question}
          </CardTitle>
          <CardDescription className="text-lg font-semibold text-primary text-right">
            {props.quiz.valueFormatted} ADA
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
};
