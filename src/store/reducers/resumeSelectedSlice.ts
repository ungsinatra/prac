import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { resume } from "../../types/resume";

const initialState: resume = {
  _id: "",
  about: "",
  additionally: "",
  job: [],
  lastName: "",
  location: "",
  name: "",
  ownerId: {
    _id: null,
    name: "",
    lastName: "",
    age: null,
    gender: "",
    email: "",
    phone: "",
    resume: null,
    vacancy: null,
  },
  price: 0,
  skills: [],
  socials: {
    email: "",
    telegram: "",
  },
  age: null,
  gender: "",
  photo: "",
  date: "",
};

export const resumeSelectedSlice = createSlice({
  name: "resume",
  initialState,
  reducers: {
    setSelectedResume(state, action: PayloadAction<resume>) {
      return { ...state, ...action.payload };
    },
  },
});
export default resumeSelectedSlice.reducer;
