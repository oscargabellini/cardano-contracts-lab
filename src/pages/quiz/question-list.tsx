import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import blueprint from "../../../aiken-workspace/quiz/plutus.json";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "../../components/ui/dialog";
import { getScript } from "../../lib/cardano/cardano-helpers";
import {
  getAvailableQuestions,
  Question,
} from "../../lib/cardano/quiz/utils/get-questions";
import { AddAnswerForm } from "./forms/answer-form";

export const QuestionList = () => {
  const [quizzes, setQuizzes] = useState<Question[] | null>(null);
  const [selectedQuizId, setSelectedQuizId] = useState<string | null>(null);
  const [selectedQuiz, setSelectedQuiz] = useState<Question | null>(null);
  const [isLoading, setIsLoading] = useState(false);

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

  const { scriptAddr } = getScript(blueprint.validators[0].compiledCode);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const handleQuizClick = (quiz: Question) => {
    setSelectedQuizId(selectedQuizId === quiz.id ? null : quiz.id);
    setSelectedQuiz(quiz);
  };

  return (
    <div className="flex flex-col gap-4 mt-7">
      <p className="text-2xl">Questions</p>
      {isLoading ? (
        <div className="flex justify-center items-center h-full mt-10">
          <Loader2 className="w-10 h-10 animate-spin" />
        </div>
      ) : (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {quizzes?.map((quiz) => (
              <Dialog
                onOpenChange={(open) => {
                  if (!open) {
                    setSelectedQuizId(null);
                  }
                }}
                key={quiz.id}
              >
                <DialogTrigger>
                  <QuestionCard
                    key={quiz.id}
                    quiz={quiz}
                    onClick={() => handleQuizClick(quiz)}
                    value={quiz.valueFormatted}
                    question={quiz.question}
                  />
                </DialogTrigger>
                <DialogContent>
                  <div className="mt-4">
                    {selectedQuizId === selectedQuiz?.id &&
                      selectedQuiz?.question && (
                        <AddAnswerForm
                          question={selectedQuiz.question}
                          questionHash={selectedQuiz.id}
                          onCorrectAnswer={async () => {
                            await fetchQuestions();
                          }}
                        />
                      )}
                  </div>
                </DialogContent>
              </Dialog>
            ))}
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
            {props.quiz.valueFormatted}
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
};
