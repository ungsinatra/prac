import {createSlice, PayloadAction} from "@reduxjs/toolkit";

// export  type LoginFroms = Pick<typeof FormRegister, 'eMail' | 'password'> & {}

type LoginForm = { email: string, password: string, isLogIned: boolean };
const initialState: LoginForm = {
    email: '',
    password: '',
    isLogIned: false,
}


export const LoginSlice = createSlice({
    name: 'loginInput',
    initialState,
    reducers: {
        onChangeEmail(state, action: PayloadAction<string>) {
            state.email = action.payload
        },
        onChangePass(state, action: PayloadAction<string>) {
            state.password = action.payload;
        },
        onChangeLog(state) {
            state.isLogIned = !state.isLogIned
        }
    }
})

export default LoginSlice.reducer;