import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface FormRegister {
    userName: string;
    eMail: string;
    password: string;
    repeatPassword: string
}


const stateInit: FormRegister = {
    userName: '',
    eMail: '',
    password: "",
    repeatPassword: '',
}


export const LoginInputSlice = createSlice({
    name: 'loginInputs',
    initialState: stateInit,
    reducers: {
        onChangeUserName(state, action: PayloadAction<string>) {
            state.userName = action.payload;
        },
        onChangeEmail(state, action: PayloadAction<string>) {
            state.eMail = action.payload;
        },
        onChangePass(state, action: PayloadAction<string>) {
            state.password = action.payload;
        },
        onChangeRepeatPass(state, action: PayloadAction<string>) {
            state.repeatPassword = action.payload;
        }
    }
})


export default LoginInputSlice.reducer