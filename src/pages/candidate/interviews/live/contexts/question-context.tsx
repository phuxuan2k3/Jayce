import { createContext, useContext, useState, ReactNode } from "react";

interface QuestionContextType {
  questionIndex: number;
  goToNextQuestion: () => void;
}

const QuestionContext = createContext<QuestionContextType | undefined>(
  undefined
);

export const QuestionContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [questionIndex, setQuestionIndex] = useState(1);

  const goToNextQuestion = () => {
    setQuestionIndex((prev) => prev + 1);
  };

  return (
    <QuestionContext.Provider value={{ questionIndex, goToNextQuestion }}>
      {children}
    </QuestionContext.Provider>
  );
};

export const useQuestionContext = (): QuestionContextType => {
  const context = useContext(QuestionContext);
  if (!context) {
    throw new Error(
      "useQuestionContext must be used within QuestionContextProvider"
    );
  }
  return context;
};
