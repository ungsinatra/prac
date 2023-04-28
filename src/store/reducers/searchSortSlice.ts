import { PayloadAction, createSlice } from "@reduxjs/toolkit"



type stateType  = {
    searchSort:string,

}

const initialState: stateType = {
    searchSort:''
}

export const searchSortSlice = createSlice({
    name:'searchSort',
    initialState,
    reducers:{
        sordForSearch(state, action:PayloadAction<string>){
            state.searchSort = action.payload;
        }
    }
})

export default searchSortSlice.reducer