import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import { reply } from "../../types/reply";

const initialState:reply[] = [];



export const replySlice = createSlice({
    name:"reply",
    initialState,
    reducers:{
        setReplies(state,action:PayloadAction<reply[]>){
            return [...state,...action.payload];
        },
        removeReply(state,action:PayloadAction<{index:number}>){
            return state.filter((e,index) => {
                return index !== action.payload.index
            })
        }
    }
})

export default replySlice.reducer;