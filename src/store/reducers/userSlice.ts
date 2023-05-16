import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import { user } from "../../types/user";
import { authApi } from "../service/auth";

const initialState: user = {
    _id:null,
    name: "",
    lastName:'',
    age: null,
    gender:'',
    email: "",
    phone:'',
    resume:null,
    vacancy:null
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
                resume:null,
                vacancy:null
            }
        }
    },
    extraReducers:(builder) => {
        builder
      .addMatcher(authApi.endpoints.login.matchFulfilled, (state, action) => {
        state = {...state,...action.payload._id};
      })
      .addMatcher(authApi.endpoints.register.matchFulfilled, (state, action) => {
        state = {...state,...action.payload};;
      })
      .addMatcher(authApi.endpoints.current.matchFulfilled, (state, action) => {
        state = {...state,...action.payload};
      });
    }
})

export default UserSlice.reducer