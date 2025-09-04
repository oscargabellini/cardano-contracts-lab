import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

type ContractInformationCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

export const ContractInformationCard = (
  props: ContractInformationCardProps
) => {
  return (
    <Card className="relative overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-[1.02] group">
      <CardHeader className="text-center pb-4">
        <div className="flex flex-col items-center">
          <div className="relative mb-4">
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80 rounded-2xl blur-sm opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
            <div className="relative bg-gradient-to-r from-primary to-primary/80 p-4 rounded-2xl shadow-lg group-hover:shadow-xl transition-shadow duration-300">
              {props.icon}
            </div>
          </div>
          <CardTitle className="text-xl font-bold text-card-foreground mb-2">
            {props.title}
          </CardTitle>
          <div className="h-1 w-12 bg-gradient-to-r from-primary to-primary/80 rounded-full group-hover:w-16 transition-all duration-300" />
        </div>
      </CardHeader>

      <CardContent className="text-center pt-0">
        <CardDescription className="text-base leading-relaxed animate-slide-up">
          {props.description}
        </CardDescription>
      </CardContent>
    </Card>
  );
};
