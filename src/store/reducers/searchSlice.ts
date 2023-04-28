import { createSlice, PayloadAction } from "@reduxjs/toolkit";
export interface SearchState {
  isSearchEmployer:boolean;
  isSearchExpert: boolean;
}

const initialState: SearchState = {
  isSearchEmployer: false,
  isSearchExpert: true,
};

export const searchSlice = createSlice({
  name: "searchMain",
  initialState,
  reducers: {
    searchExpertsAction(state, action: PayloadAction<boolean>) {
      state.isSearchEmployer = false
      state.isSearchExpert = action.payload;
    },
    searchEmployerAction(state, action: PayloadAction<boolean>) {
      state.isSearchExpert = false
      state.isSearchEmployer = action.payload;
    },
  },
});

export default searchSlice.reducer;
