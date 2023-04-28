import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import  {IAnswer, Question} from '../../types/questions'

interface testTypes{
    questions:Question[]
    title:string,
    company:string,
    description:string,
    vacancyId:string

}

const initialState:testTypes = {
    company:"",
    description:'',
    title:"",
    vacancyId:"",
    questions:[]
}


export const createTestSlice = createSlice({
    name:"createTest",
    initialState,
    reducers:{
        onChange(state,action:PayloadAction<{field:keyof testTypes,value:string}>){
            const {field,value} = action.payload;
            state[field] = value as never
        },
        addQuestion(state,action:PayloadAction<Question>){
            state.questions = [...state.questions,action.payload];
        },
        removeQuestion(state,action:PayloadAction<number>){
            state.questions =  state.questions.filter((q,i) => i !== action.payload);
        },
        setQuestionType(state,action:PayloadAction<{type: "choice" | "text" | 'code', index:number}>){
            const {index,type} = action.payload;
            state.questions[index].type = type;
        },
        addAnswer(state,action:PayloadAction<{index:number,answer:IAnswer}>){
            const {answer,index} = action.payload
            state.questions[index].answers = [...state.questions[index].answers || [],answer]
        },
        removeAnswer(state,action:PayloadAction<{questionIndex:number,answerId:number}>){
            const {answerId,questionIndex} = action.payload
            state.questions[questionIndex].answers = state.questions[questionIndex].answers?.filter(a => +a._id !== answerId)
        },
        setQuestion(state,action:PayloadAction<{question:Question,index:number}>){
            const {index,question} = action.payload;
            state.questions[index] = question;
        },
    }
})

export default createTestSlice.reducer;