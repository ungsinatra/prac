import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {resume} from "../../types/resume";



const initialState:resume  = {
    _id:'',
    about:'',
    additionally:"",
    job:[],
    lastName:"",
    location:"",
    name:"",
    ownerId:{
        _id:'',
        age:null,
        email:"",
        gender:"",
        lastName:"",
        name:"",
        phone:"",
        resume:""
    },
    price:0,
    skills:[],
    socials:{
        email:'',
        telegram:""
    }
}

export const resumeSelectedSlice = createSlice({
    name:'resume',
    initialState,
    reducers: {
        setSelectedResume(state,action:PayloadAction<resume>) {
            return {...state,...action.payload}
        }
    }
})
export default resumeSelectedSlice.reducer;