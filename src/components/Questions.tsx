import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { createTestSlice } from '../store/reducers/createTestSlice';
import { IAnswer, Question } from '../types/questions';
import QuestionList from './QuestionList';
import MyInput from './UI/MyInput';

const Questions = () => {
    const { questions,title,description } = useAppSelector(state => state.createTestReducer)
    const { addQuestion,onChange} = createTestSlice.actions;

    const dispatch = useAppDispatch();

    const handleAddQuestion = () => {
        dispatch(addQuestion({
            _id: `${Date.now()}`,
            question: "",
            type: "choice",
            answers: []
        }))
    }

    return (
        <div>
            <MyInput label='Назавние тестирование' name='title' type='text' value={title} onChange={e => dispatch(onChange({field:'title',value:e.target.value}))}/>
            <MyInput label='Описание тестирование' name='description' type='text' value={description} onChange={e => dispatch(onChange({field:'description',value:e.target.value}))}/>

            <QuestionList questions= {questions}/>
            <button type='button' onClick={handleAddQuestion}>Добавить вопрос</button>
        </div>
    );
};

export default Questions;

