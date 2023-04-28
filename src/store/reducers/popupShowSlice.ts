

import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState = {
    islogOutPopupShow:false,
}

export  const popupShowSlice = createSlice({
    name:'isLog',
    initialState,
    reducers:{
        onCloseLogoutPopup(state){
            state.islogOutPopupShow = !state.islogOutPopupShow;
        }
    }
})
export default popupShowSlice.reducer