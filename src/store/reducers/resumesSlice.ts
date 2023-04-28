import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {experts} from "../../types/experts";



const initialState:experts[]  = [
    {
        name: 'Jane',
        latsName: 'Doe',
        bio: {
            avatar: 'https://example.com/jane-doe-avatar.png',
            age: 30,
            workExperience: '5+ years of experience in web development'
        },
        skills: ['JavaScript', 'React', 'Node.js'],
        price: '50$/hour'
    },
    {
        name: 'John',
        latsName: 'Smith',
        bio: {
            avatar: 'https://example.com/john-smith-avatar.jpg',
            age: null,
            workExperience: '8+ years of experience in data analysis'
        },
        skills: ['Python', 'SQL', 'Data Visualization'],
        price: '80$/hour'
    },
    {
        name: 'Maria',
        latsName: 'Garcia',
        bio: {
            avatar: 'https://example.com/maria-garcia-avatar.png',
            age: 25,
            workExperience: '3+ years of experience in UX design'
        },
        skills: ['UI design', 'Wireframing', 'Prototyping'],
        price: '60$/hour'
    }
]

export const remusesSlice = createSlice({
    name:'experts',
    initialState,
    reducers: {
        setExperts(state,action:PayloadAction<experts>) {
            return {...state,...action.payload}
        }
    }
})
export default remusesSlice.reducer;