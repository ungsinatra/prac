import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { chatMessageType, ChatsType } from "../../types/chats";
import { AppDispatch } from "../store";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";

type DialosType = {
  activeChat: string | null;
  isChatActive: boolean;
  dialogs: {
    data: ChatsType[];
    loading: boolean;
    error: string | null;
  };
  selectedChat: ChatsType | null;
};
const initialState: DialosType = {
  isChatActive: false,
  activeChat: null,
  dialogs: {
    data: [],
    loading: false,
    error: null,
  },
  selectedChat: null,
};

export const chatsSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    onChangeActiveChat(state, action: PayloadAction<boolean>) {
      state.isChatActive = action.payload;
    },
    fetchDialogsStart(state) {
      state.dialogs.loading = true;
    },
    fetchDialogsFailure(state, action) {
      state.dialogs.loading = false;
      state.dialogs.error = action.payload;
    },
    setActiveChat(state, action: PayloadAction<string>) {
      state.activeChat = action.payload;
    },
    fetchDialogsSuccess(state, action: PayloadAction<ChatsType[]>) {
      const data = state.dialogs.data;
      state.dialogs.data = [...action.payload];
    },
    fetchActiveChatSeccess(state, action: PayloadAction<boolean>) {
      state.dialogs.loading = !action.payload;
    },
    // updateChat(
    //   state,
    //   action: PayloadAction<{ newChat: ChatsType; chatId: string }>
    // ) {
    //   const { chatId, newChat } = action.payload;
    //   return state.dialogs.data.map((chat) => {
    //     if (chat._id === chatId) {
    //       return newChat;
    //     }
    //     return chat;
    //   });
    // },

    updateDialogMessage(
      state,
      action: PayloadAction<{ chatId: string; newMessage: chatMessageType }>
    ) {
      const { data: dialogs } = state.dialogs;
      const { chatId, newMessage } = action.payload;
      state.dialogs.data.map((chat) => {
        if (chat._id.includes(chatId)) {
          return {
            ...chat,
            messages: [...chat.messages, newMessage],
            lastMessage: newMessage.text,
          };
        }
        return chat;
      });
    },
    fetchActiveChat(state, action: PayloadAction<ChatsType>) {
      state.selectedChat = action.payload;
    },
    RemoveDialog(state) {
      console.log("RemoveDialog");
      return (state = initialState);
    },
  },
});

export const {
  setActiveChat,
  fetchDialogsStart,
  fetchDialogsSuccess,
  fetchDialogsFailure,
  fetchActiveChat,
  fetchActiveChatSeccess,
  // sendMessageSuccess,
} = chatsSlice.actions;

export const fetchDialogs = (id: string) => async (dispatch: AppDispatch) => {
  try {
    const response = await axios(`${BASE_URL}/dialogs/${id}`);
    const { data } = response;
    dispatch(fetchDialogsSuccess(data));
  } catch (error: unknown) {
    if (error instanceof Error) {
      dispatch(fetchDialogsFailure(error.message));
    }
  }
};

export const fetchCurrnetChat =
  (id: string) => async (dispatch: AppDispatch) => {
    dispatch(fetchDialogsStart());
    try {
      const response = await axios(`${BASE_URL}/chat/${id}`);
      const { data } = response;
      dispatch(fetchActiveChat(data));
      dispatch(fetchActiveChatSeccess(true));
    } catch (error: unknown) {
      if (error instanceof Error) {
        dispatch(fetchDialogsFailure(error.message));
      }
    }
  };
export default chatsSlice.reducer;
