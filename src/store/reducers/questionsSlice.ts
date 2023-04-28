
import {IAnswer, IState} from "../../types/questions";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import  {Question} from '../../types/questions'




const questions:Question[] = [];
const initialState: IState = {
    title:'',
    description:'',
    questions,
    answers: [{
        _id:'',
        answer:"",
        question:''
    }],
    isLoading: false,
    error: null,
};


export const quationSlice = createSlice({
    name:'QA',
    initialState,
    reducers:{
        setQuestions: (state, action) => {
            state.questions = action.payload;
        },
        setAnswers: (state, action) => {
            state.answers = action.payload;
        },
        setIsLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        setInfoTest(state,action){
            state.title = action.payload.title;
            state.description = action.payload.description
        },
        removeData(state){
            state = {
                title:'',
                description:'',
                questions:[],
                answers: [{
                    _id:'',
                    answer:"",
                    question:''
                }],
                isLoading: false,
                error: null,
            }
        }
    }
})

export default  quationSlice.reducer