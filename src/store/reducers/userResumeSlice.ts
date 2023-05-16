import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { resume, work } from "../../types/resume";

const initialState: resume = {
  _id: "",
  about: "",
  additionally: "",
  job: [],
  lastName: "",
  name: "",
  age: null,
  price: 0,
  skills: [],
  socials: {
    email: "",
    telegram: "",
  },
  location: "",
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
  photo: "",
  gender: "",
  date: "",
};
interface UpdateFieldPayload {
  field: keyof resume;
  value: string | number | string[];
}
export type esumearrayProps = Pick<resume, "job" | "skills">;

export const userResumeSlice = createSlice({
  name: "resume",
  initialState,
  reducers: {
    setUserResume(state, action: PayloadAction<resume>) {
      return { ...state, ...action.payload };
    },
  },
});
export default userResumeSlice.reducer;
