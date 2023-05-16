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
type emailProp = keyof resume["socials"];
export type resumearrayProps = Pick<resume, "skills" | "job">;

export const createResumeSlice = createSlice({
  name: "createResume",
  initialState,
  reducers: {
    onChange(state, action: PayloadAction<UpdateFieldPayload>) {
      const { field, value } = action.payload;
      state[field] = value as never;
    },
    addInSkills(state, action: PayloadAction<{ value: string }>) {
      const { value } = action.payload;
      state.skills = [...state.skills, value];
    },
    removeSkill(state, action: PayloadAction<{ index: number }>) {
      const { index } = action.payload;
      state.skills = state.skills.filter((e, i) => i !== index);
    },
    addJob(state, action: PayloadAction<{ value: work[] }>) {
      const { value } = action.payload;
      state.job = [...state.job, ...value];
    },
    removeJob(state, action: PayloadAction<{ index: number }>) {
      const { index } = action.payload;
      state.job = state.job.filter((e, i) => i !== index);
    },
    setSocials(
      state,
      action: PayloadAction<{ prop: emailProp; value: string }>
    ) {
      const { prop, value } = action.payload;
      state.socials[prop] = value;
    },
  },
});
export default createResumeSlice.reducer;
