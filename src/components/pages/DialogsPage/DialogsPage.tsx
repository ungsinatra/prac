import React, { useState, useEffect, useMemo } from "react";
import { dialogApi } from "../../../utils/api/dialogs";
import { BASE_URL } from "../../../utils/constants";
import { ChatsType, chatMessageType } from "../../../types/chats";
import { chatsSlice, setActiveChat } from "../../../store/reducers/chatsSlice";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import axios from "axios";
import DialogList from "../../DialogList/DialogList";
import { fetchDialogs } from "../../../store/reducers/chatsSlice";
import { socket } from "../../../core/socket";
import Chat from "../../Chat/Chat";
import { useNavigate, redirect, useParams, Outlet } from "react-router-dom";
import "./DialogsPage.css";
import { Input } from "antd";
// import Socket from "socket.io-client";

const DialogsPage: React.FC<{ userId: string }> = ({ userId }) => {
  const { activeChat, isChatActive } = useAppSelector(
    (state) => state.chatsReducer
  );
  const { dialogs } = useAppSelector((state) => state.chatsReducer);
  const { data } = dialogs;
  const { RemoveDialog, onChangeActiveChat } = chatsSlice.actions;
  const { _id } = useAppSelector((state) => state.UserReducer);
  const dispatch = useAppDispatch();
  const navigete = useNavigate();
  const id = useParams();
  // const [isChatActive, setIsChatActiove] = useState(false);
  // const [isChatVisible, setIsChatVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (_id) {
      console.log("FETCH DIALOTGS");
      dispatch(fetchDialogs(_id));
    }
    return () => {
      console.log("UNMOUNT DIALOGSPAGE");
      dispatch(RemoveDialog());
    };
  }, [_id]);

  const handleActiveChatChange = (newChatId: string) => {
    dispatch(onChangeActiveChat(true));
    navigete(`${newChatId}`, { replace: false });
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerHeight <= 920) {
        console.log("menwe 920");
        setIsMobile(true);
      } else setIsMobile(false);
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="dialog-page">
      {
        <div
          className={`dialog-page__dialog-Side ${
            isMobile && isChatActive ? "dialog-page__dialog-Side--hidden" : ""
          }`}
        >
          <div className="find-section">
            <h1 className="dialog-page__title">{`Переписки (${data.length})`}</h1>
            <Input
              className="dialog-page__input"
              placeholder="Поиск"
              style={{ marginBottom: "10px" }}
            />
          </div>
          <div className="dialog-list__wrapper">
            {<DialogList onActiveChatChange={handleActiveChatChange} />}
          </div>
        </div>
      }

      <div
        className={`dialog-page__dialog-chat ${
          !isChatActive && activeChat ? "dialog-page__dialog-chat--hidden" : ""
        }`}
      >
        <Outlet />
        {/* {!!activeChat && <Chat id={`${id}`} />} */}
      </div>
    </div>
  );
};

export default DialogsPage;
