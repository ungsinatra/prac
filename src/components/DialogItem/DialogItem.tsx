import React from "react";
import { ChatsType } from "../../types/chats";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { chatsSlice } from "../../store/reducers/chatsSlice";
import { usefindResiverMessage } from "../../hooks/findResiverMessage";
import "./DialogItem.css";
interface DialogItemProps {
  dialog: ChatsType;
  onClickChat(id: string): void;
}

const DialogItem: React.FC<DialogItemProps> = ({ dialog, onClickChat }) => {
  const dispatch = useAppDispatch();
  const { activeChat } = useAppSelector((state) => state.chatsReducer);
  const { setActiveChat } = chatsSlice.actions;
  const { _id: userId } = useAppSelector((state) => state.UserReducer);

  const handleClick = () => {
    onClickChat(dialog._id);
    dispatch(setActiveChat(dialog._id));
  };

  const name = usefindResiverMessage(dialog.members, userId);
  return (
    <div
      className={`dialog-item ${activeChat === dialog._id ? "active" : ""}`}
      onClick={handleClick}
    >
      <div className="dialog-item__avatar"></div>
      <div className="dialog-item__info">
        <div
          className={`dialog-item__name ${
            activeChat === dialog._id ? "active" : ""
          }`}
        >
          {name}
        </div>
        <div className="dialog-item__last-message">
          {/* {JSON.parse(dialog.lastMessage)} */}
          {dialog.lastMessage}
        </div>
      </div>
    </div>
  );
};

export default DialogItem;
