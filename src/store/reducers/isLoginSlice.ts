import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn:false
}

export  const isLoggedInSlice = createSlice({
    name:'isLog',
    initialState,
    reducers:{
        setIsloggedIn(state){
            state.isLoggedIn = !state.isLoggedIn;
        }
    }
})
export default isLoggedInSlice.reducer