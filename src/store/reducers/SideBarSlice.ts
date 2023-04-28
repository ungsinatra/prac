import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type stateInint = {
    spect: string;
    qualy: string,
    salary: string
}
const initialState: stateInint = {
    spect: 'any',
    qualy: 'any',
    salary: '0',
}


export const SideBarSlice = createSlice({
    name: 'sideBar',
    initialState,
    reducers: {
        onChangeSpec(state, action: PayloadAction<string>) {
            state.spect = action.payload;
        },
        onChangeQual(state, action: PayloadAction<string>) {
            state.qualy = action.payload;
        },
        onChangeSalaries(state, action: PayloadAction<string>) {
            state.salary = action.payload;
        }
    }

})

export default SideBarSlice.reducer