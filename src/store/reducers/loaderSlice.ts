import {createSlice, PayloadAction} from "@reduxjs/toolkit";


const initialState = {
    isLoading:false
}


export const loaderSlice = createSlice({
    name:'loader',
    initialState,
    reducers:{
        setLoader(state,action:PayloadAction<boolean>){
            state.isLoading = action.payload
        }
    }
})


export default loaderSlice.reducer