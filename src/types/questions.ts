export interface IAnswer {
  question: string;
  _id: string;
  answer: string;
}

export type Question  = IChoiceQuestion | ITextQuestion | ICodeQuestion

export interface IChoiceQuestion {
  _id: string;
  question: string;
  type: "choice";
  answers: IAnswer[];
}

export interface ITextQuestion {
  _id: string;
  question: string;
  type: "text";
  answers?: undefined; // ответы не нужны для этого типа вопроса
}

export interface ICodeQuestion {
  _id: string;
  question: string;
  type: "code";
  answers?: undefined; // ответы не нужны для этого типа вопроса
}

export interface IState {
  title: string;
  description: string;
  questions: Question[];
  answers: IAnswer[];
  isLoading: boolean;
  error: Error | null;
}
