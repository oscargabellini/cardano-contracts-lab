import { CheckCircle, PlusCircle } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { cn } from "../../lib/common/utils";

interface QuizOptionCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick: () => void;
  isActive: boolean;
  className?: string;
}

export const QuizOptionCard = (props: QuizOptionCardProps) => {
  return (
    <Card
      onClick={props.onClick}
      className={cn(
        "cursor-pointer transition-all duration-300",
        props.isActive
          ? "bg-primary/10 border-primary shadow-md"
          : "hover:shadow-lg hover:bg-primary/5 border-primary/10",
        props.className
      )}
    >
      <CardHeader className="pb-2 flex flex-row items-center gap-4">
        <div
          className={
            "p-3 rounded-full bg-primary/80 dark:bg-primary/50 text-primary-foreground"
          }
        >
          {props.icon}
        </div>
        <div>
          <CardTitle className="text-xl font-medium">{props.title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="pt-3 pb-5">
        <CardDescription className="text-sm text-secondary-foreground leading-relaxed">
          {props.description}
        </CardDescription>
      </CardContent>
    </Card>
  );
};

type CardProps = {
  onClick: () => void;
  isActive: boolean;
};

export const QuestionCard = (props: CardProps) => {
  return (
    <QuizOptionCard
      title="Create a Quiz"
      description="Create a new quiz with a prize for the correct answer"
      icon={<PlusCircle className="h-5 w-5" />}
      onClick={props.onClick}
      isActive={props.isActive}
    />
  );
};

export const AnswerCard = (props: CardProps) => {
  return (
    <QuizOptionCard
      title="Answer a Quiz"
      description="Answer a quiz and win a prize"
      icon={<CheckCircle className="h-5 w-5" />}
      onClick={props.onClick}
      isActive={props.isActive}
    />
  );
};
