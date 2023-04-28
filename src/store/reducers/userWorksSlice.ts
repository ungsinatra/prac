import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import { work } from "../../types/resume";

const initialState:work[] = [
    {
        endWork:'12.02.12',
        nameOfCompany:"name",
        position:"ss",
        responsibilities:"ss",
        startWork:"12.23.23"
    }
];


export const userWorksSlice = createSlice({
    name:"userWork",
    initialState,
    reducers:{
        addUserWork(state){
            return [...state,{
                endWork:"",
                nameOfCompany:"",
                position:"",
                responsibilities:"",
                startWork:""
            }]
        },
        onChange(state,action:PayloadAction<{index:number,prop:keyof work,value:string}>){
            const {index,prop,value} = action.payload
            const newState = [...state];
            newState[index][prop] = value;
            return newState;
        },

        onChangeNameCompany(state,action:PayloadAction<{value:string,index:number}>){
            const {index,value} = action.payload
            state[index]['nameOfCompany'] = value;
        },
        onChangePosition(state,action:PayloadAction<{value:string,index:number}>){
            const {index,value} = action.payload;
            state[index]['position'] = value;
        },
        onChangeStartWork(state,action:PayloadAction<{value:string,index:number}>){
            const {index,value} = action.payload;
            state[index]['startWork'] = value;
        },
        onChangeEndWork(state,action:PayloadAction<{value:string,index:number}>){
            const {index,value} = action.payload;
            state[index]['endWork'] = value;
        },
        removeUserWork(state,action:PayloadAction<number>){
            return state.filter((work,index) => {
                return index !== action.payload;
            })
        },
        onChangeResponsibilities(state,action:PayloadAction<{value:string,index:number}>){
            const {index,value} = action.payload;
            state[index]['responsibilities'] = value;
            
        }
    }
})

export default userWorksSlice.reducer