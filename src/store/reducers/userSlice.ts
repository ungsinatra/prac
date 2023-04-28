import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import { user } from "../../types/user";


const initialState: user = {
    _id:null,
    name: "",
    lastName:'',
    age: null,
    gender:'',
    email: "",
    phone:'',
    resume:null,
};

export const UserSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserInfo(state, action: PayloadAction<user>) {
            return {...state, ...action.payload}
        },
        setClearUserInfo(state) {
            return {_id:null,
                name: "",
                lastName:'',
                age: null,
                gender:'',
                email: "",
                phone:'',
                resume:null,}
        }
    }
})

export default UserSlice.reducer