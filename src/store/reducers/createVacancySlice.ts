import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { vacancy } from "../../types/vacancy";

const initialState: vacancy = {
  _id: "",
  benefits: [],
  company: "",
  date: "",
  direction: "",
  experience: "",
  graid: "",
  location: "",
  logo: "",
  price: 0,
  qualifications: [],
  responsibilities: [],
  about: "",
  testId: "",
  title: "",
  aboutCompany: "",
  occupied: "",
  repliesUsers: [],
};
interface UpdateFieldPayload {
  field: keyof vacancy;
  value: string | number | string[];
}

export type arrayProps = Pick<
  vacancy,
  "benefits" | "qualifications" | "responsibilities"
>;

export const createVacancySlice = createSlice({
  name: "CreateVacancy",
  initialState,
  reducers: {
    onChange(state, action: PayloadAction<UpdateFieldPayload>) {
      const { field, value } = action.payload;
      state[field] = value as never;
    },
    addInArray(
      state,
      action: PayloadAction<{ field: keyof arrayProps; value: string }>
    ) {
      const { field, value } = action.payload;
      state[field] = [...state[field], value];
    },
    removeInArray(
      state,
      action: PayloadAction<{ field: keyof arrayProps; index: number }>
    ) {
      const { field, index } = action.payload;
      state[field] = state[field].filter((e, i) => i !== index);
    },
  },
});

export default createVacancySlice.reducer;
