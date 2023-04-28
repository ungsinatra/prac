import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type  FormRegister = {
    userName: string;
    email: string;
    password: string;
    repeatPassword: string,
    phone: string;
    lastName: string,
    gender:string,
    age:string
}


const stateInit: FormRegister = {
    userName: '',
    lastName: '',
    phone: '',
    email: '',
    password: "",
    repeatPassword: '',
    gender:'',
    age:''
}


export const registerSlice = createSlice({
    name: 'registerInput',
    initialState: stateInit,
    reducers: {
        onChangeUserName(state, action: PayloadAction<string>) {
            state.userName = action.payload;
        },
        onChangeEmail(state, action: PayloadAction<string>) {
            state.email = action.payload;
        },
        onChangePass(state, action: PayloadAction<string>) {
            state.password = action.payload;
        },
        onChangeRepeatPass(state, action: PayloadAction<string>) {
            state.repeatPassword = action.payload;
        },
        onChangePhone(state, action: PayloadAction<string>) {
            state.phone = action.payload;
        },
        onChangeLastName(state, action: PayloadAction<string>) {
            state.lastName = action.payload;
        },
        onChangeGender(state,action:PayloadAction<string>){
            state.gender = action.payload;
        },
        onChangeAge(state,action:PayloadAction<string>){
            state.age = action.payload
        }   
    }
})


export default registerSlice.reducer