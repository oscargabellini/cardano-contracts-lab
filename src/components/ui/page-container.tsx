import { ReactNode } from "react";

type PageContainerProps = {
  children: ReactNode;
};

export const PageContainer = ({ children }: PageContainerProps) => {
  return <div className="container mx-auto py-6">{children}</div>;
};
