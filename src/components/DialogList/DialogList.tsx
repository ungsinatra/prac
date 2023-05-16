import axios from "axios";
import { timeEnd } from "console";
import React, { useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { fetchDialogs } from "../../store/reducers/chatsSlice";
import { ChatsType, chatMessageType, membersChatType } from "../../types/chats";
import MyTextArea from "../UI/MyTextArea";
import Spiner from "../common/Spiner/Spiner";
import DialogItem from "../DialogItem/DialogItem";
import "./DialogList.css";
interface DialogItemsProps {
  onActiveChatChange(id: string): void;
}

const DialogList: React.FC<DialogItemsProps> = ({ onActiveChatChange }) => {
  const dispatch = useAppDispatch();
  const { _id: userId } = useAppSelector((state) => state.UserReducer);
  const { activeChat, dialogs } = useAppSelector((state) => state.chatsReducer);
  const { data, error, loading } = dialogs;

  // useEffect(() => {
  //   dispatch(fetchDialogs(userId as string));
  // }, [dispatch]);

  if (loading) {
    return <Spiner />;
  }

  return (
    <div className="dialogs__items">
      {data.map((dialog) => (
        <DialogItem
          key={dialog._id}
          dialog={dialog}
          onClickChat={() => onActiveChatChange(dialog._id as string)}
        />
      ))}
    </div>
  );
};

export default DialogList;
