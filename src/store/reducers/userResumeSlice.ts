import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {resume, work} from "../../types/resume";


const initialState:resume  = {
    _id:'',
    about:'',
    additionally:'',
    job:[],
    lastName:'',
    name:'',
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
        telegram:"",
    },
    location:''
}



export const userResumeSlice = createSlice({
    name:'resume',
    initialState,
    reducers: {
        setUserResume(state,action:PayloadAction<resume>) {
            return {...state,...action.payload}
        },
        setName(state,action:PayloadAction<string>){
            state.name = action.payload
        },
        setLastName(state,action:PayloadAction<string>){
            state.lastName = action.payload
        },
        setAbout(state,action:PayloadAction<string>){
            state.about = action.payload
        },
        setAdditionally(state,action:PayloadAction<string>){
            state.about = action.payload
        },
        setPrice(state,action:PayloadAction<number>){
            state.price = action.payload
        },
        setSkills(state,action:PayloadAction<string>){
            const skills = action.payload.split(',');
            state.skills = [...state.skills,...skills];
        },
        setSocials(state,action:PayloadAction<{prop: keyof typeof initialState.socials ,value:string}>){
            const {prop,value} = action.payload
            state.socials[prop] = value
        },
        setLocation(state,action:PayloadAction<string>){
            state.location = action.payload
        },
        setGenger(state,action:PayloadAction<string>){
            state.ownerId.gender = action.payload
        },
        setAge(state,action:PayloadAction<number | null>){
            state.ownerId.age = action.payload
        },
        setJob(state,action:PayloadAction<work[]>){
             state.job = [...state.job,...action.payload];
        },
    }
})
export default userResumeSlice.reducer;