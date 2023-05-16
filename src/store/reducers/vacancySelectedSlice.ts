import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import { vacancy } from "../../types/vacancy";

const initialState:vacancy = {
    _id:'',
    benefits:[],
    company:'',
    date:"",
    direction:"",
    experience:"",
    graid:"",
    location:'',
    logo:"",
    price:0,
    qualifications:[],
    responsibilities:[],
    about:"",
    testId:"",
    title:"",
    aboutCompany:"",
    occupied:"",
    repliesUsers:[],
}

export const vacancySeletedSlice = createSlice({
    name:"seletedVacancy",
    initialState,
    reducers:{
        setSelectedVacancy(state,action:PayloadAction<vacancy>){
            return {...state,...action.payload}
        }
    }
})

export default vacancySeletedSlice.reducer;