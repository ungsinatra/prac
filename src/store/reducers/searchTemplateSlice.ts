import {createSlice, PayloadAction} from "@reduxjs/toolkit";

type state = {
    input: string,
    select: string
}
const initialState: state = {
    input: '',
    select: 'relevance'
}

export const SearchTemplateSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        onInputChange(state, action: PayloadAction<string>) {
            state.input = action.payload
        },
        onSelectChange(state, action: PayloadAction<string>) {
            state.select = action.payload;
        }
    }
})

export default SearchTemplateSlice.reducer;