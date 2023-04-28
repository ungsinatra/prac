import React,{FC} from 'react';
import { Question } from '../types/questions';
import { createTestSlice } from '../store/reducers/createTestSlice';
import { useAppDispatch } from '../hooks/redux';
interface IQuestionListProps{
    questions:Question[]
}

const QuestionList:FC<IQuestionListProps> = ({questions}) => {

    const { addQuestion, onChange, removeQuestion, setQuestionType, addAnswer,setQuestion,removeAnswer} = createTestSlice.actions;

    const dispatch = useAppDispatch();

    const handleQuestionTypeChange = (_idQuestion: string, event: React.ChangeEvent<HTMLSelectElement>) => {
        const index = questions.findIndex((e, index) => e._id === _idQuestion);
        dispatch(setQuestionType({ index: index, type: event.target.value as "choice" | "text" | "code" }))
    }

    const handleQuestionChange = (_idQuestion: string, event: React.ChangeEvent<HTMLInputElement>) => {
        const index = questions.findIndex(q => q._id === _idQuestion);
        const updatedQuestion = {
            ...questions[index],
            question: event.target.value
        };
        dispatch(setQuestion({question:updatedQuestion as Question,index:index}))
    }

    const handleAnswerChange = (_idQuestion: string, _idAnswer: string, event: React.ChangeEvent<HTMLInputElement>) => {
        const index = questions.findIndex(q => q._id === _idQuestion);
        if (questions[index].type === 'choice' && questions[index].answers !== undefined) {
            const updatedAnswers = (questions[index].answers || []).map((a, i) => i === +_idAnswer ? { ...a, answer: event.target.value } : a);
            const updatedQuestion = {
                ...questions[index],
                answers: [...updatedAnswers]
            };
            dispatch(setQuestion({question:updatedQuestion as Question,index:index}))
        }
    }
    const handleRemoveQuestion = (_idQuestion: number) => {
        dispatch(removeQuestion(_idQuestion));
    }

    const handleRemoveAnswer = (_idQuestion:number,IdAnswer:number) => {
        dispatch(removeAnswer({answerId:IdAnswer,questionIndex:_idQuestion}));
    }

    return (
        <div>
            {questions.map((q,index) => (
        <div key={q._id}>
            <label>
                Тип вопроса:
                <select value={q.type} onChange={e => handleQuestionTypeChange(q._id, e)}>
                    <option value="choice">Выбор из списка</option>
                    <option value="text">Текстовый ответ</option>
                    <option value="code">Код</option>
                </select>
            </label>
            <p>{`Вопрос: ${index+1}`}</p>
            <input type="text" value={q.question} onChange={e => handleQuestionChange(q._id, e)} />
            <button onClick={e => handleRemoveQuestion(index)} type='button'>Удалить вопрос</button>
            {q.type === 'choice' && (
                <div>
                    {q.answers?.map((a, i) => (
                        <>
                        <input key={i} type="text" value={a.answer} onChange={e => handleAnswerChange(q._id, `${i}`, e)} />
                        <button type='button' onClick={e => handleRemoveAnswer(index,+a._id)}>удалить</button>
                        </>
                    ))}
                    <button type='button' onClick={() => {
                        const newAnswers = [...q.answers, { _id: `${Date.now()}`, answer: "", question: "" }]; // не создавайте новый массив, используя spread-оператор
                        const newQuestion = { ...q, answers: newAnswers }; // создание нового объекта вопроса с новым массивом ответов
                        dispatch(setQuestion({ question: newQuestion, index})); // правильный вызов action `setQuestion` из reducers
                    }}>
                        Добавить ответ
                    </button>
                </div>
            )}
        </div>
    ))}
        </div>
    );
};

export default QuestionList;