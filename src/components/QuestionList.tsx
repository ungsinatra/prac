import React, { FC } from "react";
import { Question } from "../types/questions";
import { createTestSlice } from "../store/reducers/createTestSlice";
import { useAppDispatch } from "../hooks/redux";
import { Button, Input, Select } from "antd";
interface IQuestionListProps {
  questions: Question[];
}

const QuestionList: FC<IQuestionListProps> = ({ questions }) => {
  const { Option } = Select;
  const {
    addQuestion,
    onChange,
    removeQuestion,
    setQuestionType,
    addAnswer,
    setQuestion,
    removeAnswer,
  } = createTestSlice.actions;

  const dispatch = useAppDispatch();

  const handleQuestionTypeChange = (_idQuestion: string, event: string) => {
    const index = questions.findIndex((e, index) => e._id === _idQuestion);
    dispatch(
      setQuestionType({
        index: index,
        type: event as "choice" | "text" | "code",
      })
    );
  };

  const handleQuestionChange = (
    _idQuestion: string,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const index = questions.findIndex((q) => q._id === _idQuestion);
    const updatedQuestion = {
      ...questions[index],
      question: event.target.value,
    };
    dispatch(
      setQuestion({ question: updatedQuestion as Question, index: index })
    );
  };

  const handleAnswerChange = (
    _idQuestion: string,
    _idAnswer: string,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const index = questions.findIndex((q) => q._id === _idQuestion);
    if (
      questions[index].type === "choice" &&
      questions[index].answers !== undefined
    ) {
      const updatedAnswers = (questions[index].answers || []).map((a, i) =>
        i === +_idAnswer ? { ...a, answer: event.target.value } : a
      );
      const updatedQuestion = {
        ...questions[index],
        answers: [...updatedAnswers],
      };
      dispatch(
        setQuestion({ question: updatedQuestion as Question, index: index })
      );
    }
  };
  const handleRemoveQuestion = (_idQuestion: number) => {
    dispatch(removeQuestion(_idQuestion));
  };

  const handleRemoveAnswer = (_idQuestion: number, IdAnswer: number) => {
    dispatch(removeAnswer({ answerId: IdAnswer, questionIndex: _idQuestion }));
  };

  return (
    <div>
      {questions.map((q, index) => (
        <div key={q._id}>
          <label>
            Тип вопроса:
            <Select
              value={q.type}
              onChange={(value) => handleQuestionTypeChange(q._id, value)}
            >
              <Option value="choice">Выбор из списка</Option>
              <Option value="text">Текстовый ответ</Option>
              <Option value="code">Код</Option>
            </Select>
          </label>
          <p>{`Вопрос: ${index + 1}`}</p>
          <Input
            type="text"
            value={q.question}
            onChange={(e) => handleQuestionChange(q._id, e)}
          />
          <Button onClick={() => handleRemoveQuestion(index)} htmlType="button">
            Удалить вопрос
          </Button>
          {q.type === "choice" && (
            <div>
              {q.answers?.map((a, i) => (
                <div key={i}>
                  <Input
                    type="text"
                    value={a.answer}
                    onChange={(e) => handleAnswerChange(q._id, `${i}`, e)}
                  />
                  <Button
                    htmlType="button"
                    onClick={() => handleRemoveAnswer(index, +a._id)}
                  >
                    удалить
                  </Button>
                </div>
              ))}
              <Button
                htmlType="button"
                onClick={() => {
                  const newAnswers = [
                    ...q.answers,
                    { _id: `${Date.now()}`, answer: "", question: "" },
                  ]; // не создавайте новый массив, используя spread-оператор
                  const newQuestion = { ...q, answers: newAnswers }; // создание нового объекта вопроса с новым массивом ответов
                  dispatch(setQuestion({ question: newQuestion, index })); // правильный вызов action `setQuestion` из reducers
                }}
              >
                Добавить ответ
              </Button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default QuestionList;
