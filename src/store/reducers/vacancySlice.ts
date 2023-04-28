import {vacancy} from "../../types/vacancy";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState: vacancy[] = []

export const VacancySlice = createSlice({
    name: 'vacancyList',
    initialState,
    reducers: {
        addVacancy(state, action: PayloadAction<vacancy[]>) {
            return state = action.payload;
        },
        removeVancy(state, action: PayloadAction<vacancy>) {

        }
    }
})


export default VacancySlice.reducer