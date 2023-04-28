import {createSlice, PayloadAction} from "@reduxjs/toolkit";



type popupTestType = {
    isOpen:boolean,
}
const initialState =  {
    isOpen:false,
}


export const testPopupSlice = createSlice({
    name:'testPopup',
    initialState,
    reducers:{
        setOpen(state){
            state.isOpen = !state.isOpen
        }
    }
})

export default testPopupSlice.reducer