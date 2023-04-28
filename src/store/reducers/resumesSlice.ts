import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {resume} from "../../types/resume";



const initialState:resume[]  = []

export const resumesSlice = createSlice({
    name:'resume',
    initialState,
    reducers: {
        setExperts(state,action:PayloadAction<resume[]>) {
            return state = [...action.payload]
        }
    }
})
export default resumesSlice.reducer;