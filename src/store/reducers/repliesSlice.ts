import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { reply } from "../../types/reply";
import { IAnswer } from "../../types/questions";
export type repliesTypes = {
  replyData: reply;
  userAnswerData: {
    _id: string;
    userId: string;
    testId: string;
    answers: IAnswer[];
  };
};

const initialState: repliesTypes[] = [];

export const replySlice = createSlice({
  name: "reply",
  initialState,
  reducers: {
    setReplies(state, action: PayloadAction<repliesTypes[]>) {
      return [...state, ...action.payload];
    },
    resetReplies(state) {
      return (state = initialState);
    },

    removeReply(state, action: PayloadAction<{ index: number }>) {
      return state.filter((e, index) => {
        return index !== action.payload.index;
      });
    },
  },
});

export default replySlice.reducer;
