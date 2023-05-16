import React, { useEffect, useRef, useState } from "react";
import "./chat.css";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { chatsSlice, setActiveChat } from "../../store/reducers/chatsSlice";
import { fetchCurrnetChat } from "../../store/reducers/chatsSlice";
import { ChatsType, chatMessageType } from "../../types/chats";
import { socket } from "../../core/socket";
import { LeftOutlined, DashOutlined } from "@ant-design/icons";
import Messages from "../Messages/Messages";
import ChatInput from "../ChatInput/ChatInput";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";
interface ChatProps {
  id: string;
}
const Chat: React.FC<ChatProps> = ({ id }) => {
  const { activeChat, selectedChat } = useAppSelector(
    (state) => state.chatsReducer
  );
  const dispatch = useAppDispatch();
  const { onChangeActiveChat } = chatsSlice.actions;
  // const [chat, setChat] = useState<ChatsType | null>(null);
  const [messages, setMessages] = useState<chatMessageType[]>([]);
  const { updateDialogMessage } = chatsSlice.actions;
  const { _id: userId } = useAppSelector((state) => state.UserReducer);
  const [messageText, setMessageText] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
  const [parnerName, setPartnerName] = useState<string>("");
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (selectedChat) {
  //     const { messages } = selectedChat;
  //     setMessages(messages);
  //     console.log(messages);
  //   }
  // }, [selectedChat]);

  const goToDialogs = () => {
    dispatch(onChangeActiveChat(false));
    navigate("/conversations", { replace: false });
  };

  const fetchCurrentChat = async () => {
    const res = await axios.get(`${BASE_URL}/chat/${id}`);
    const chat = res.data;
    // setChat(chat);
    setMessages([...chat.messages]);
  };

  useEffect(() => {
    fetchCurrentChat();
    console.log(messages);
  }, [id, isSubmit]);

  useEffect(() => {
    socket.on("CHAT:NEW_MESSAGE", ({ chatId, newChat }) => {
      console.log(newChat);
      const { messages } = newChat;
      dispatch(updateDialogMessage({ chatId, newMessage: messages }));
      setMessages([...newChat.messages]);
    });
  }, []);

  useEffect(() => {
    if (activeChat !== null) {
      console.log(activeChat);
      dispatch(fetchCurrnetChat(activeChat as string));
      socket.emit("CHAT:JOIN", { chatId: activeChat });
    }
    return () => {
      socket.emit("CHAT:LEAVE", { chatId: activeChat });
      socket.off("CHAT:JOIN");
    };
  }, []);

  const onChaneInput = (text: string) => {
    setMessageText(text);
  };
  type sendMessageType = Omit<chatMessageType, "_id" | "timestamp">;

  const findPartnerName = () => {
    const parnerName = selectedChat?.members.find((m) => {
      return m.userId !== userId;
    });
    if (parnerName) {
      setPartnerName(parnerName.name);
    }
  };

  useEffect(() => {
    findPartnerName();
  }, [id]);

  const handlerSandMessage = () => {
    const newMessage: sendMessageType = {
      senderId: userId as string,
      text: messageText,
    };
    socket.emit("CHAT:NEW_MESSAGE", {
      chatId: activeChat,
      message: newMessage,
    });
    const date = new Date();

    setMessages([
      ...messages,
      { _id: "", timestamp: `${date.toISOString()}`, ...newMessage },
    ]);
  };

  useEffect(() => {
    socket.on("CHAT:NEW_MESSAGE", (data) => {
      const { chatId, newChat } = data;
      dispatch(
        updateDialogMessage({ chatId: chatId, newMessage: newChat.messages })
      );
    });

    return () => {
      socket.removeAllListeners("CHAT:NEW_MESSAGE");
    };
  }, []);

  const handleSubmit = () => {
    handlerSandMessage();
    // setTimeout(() => {
    //   setIsSubmit(!isSubmit);
    // }, 1);
    setMessageText("");
  };

  return (
    <div className="chat">
      <div className="chat__header">
        <div className="chat__header-wrapper">
          <div className="chat-header-user">
            <LeftOutlined onClick={goToDialogs} />
            <div className="chat-header-user__content">
              <p className="chat__title">
                <Link to="">{parnerName}</Link>
              </p>
            </div>
            <DashOutlined />
          </div>
        </div>
      </div>
      <div className="chat__container">
        <div className="chat__body">
          <Messages messages={messages} />
        </div>
      </div>
      <div className="chat__footer">
        <ChatInput
          onChange={(e) => onChaneInput(e)}
          onSubmit={() => handleSubmit()}
          value={messageText}
        />
      </div>
    </div>
  );
};

export default Chat;
