import React, { useEffect, useRef, useState } from "react";
import { ChatsType, chatMessageType, membersChatType } from "../types/chats";
import { Socket } from "socket.io-client";
import { socket } from "../core/socket";
import { useAppDispatch } from "../hooks/redux";
import { chatsSlice } from "../store/reducers/chatsSlice";
import axios from "axios";
interface SelectedDialogProps {
  dialog: ChatsType;
  userId: string;
  onClose: () => void;
}

const SelectedDialog: React.FC<SelectedDialogProps> = ({
  dialog,
  onClose,
  userId,
}) => {
  // const [messageText, setMessageText] = useState("");
  // const dispatch = useAppDispatch();
  // const { updateChat } = chatsSlice.actions;
  // const [messages, setMessages] = useState<chatMessageType[]>(dialog.messages);
  // const messageRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   console.log("render-selected", dialog);
  // }, [dialog]);

  // const partnerName = (userId: string, members: membersChatType[]) => {
  //   let name;
  //   members.forEach((element) => {
  //     if (!element.userId.includes(userId)) {
  //       return (name = element.name);
  //     }
  //   });
  //   return name;
  // };

  // const recipientId = dialog.members.find((member) => member.userId !== userId);

  // socket.on("CHAT:NEW_MESSAGE_NOTIFICATION", (message) => {
  //   alert(`${message}`);
  // });

  // // const getCurrentChat = async () => {
  // //   const newChat = await axios.get(
  // //     `http://localhost:3000/api/chat/64514a641fca21b8f1ab41a5`
  // //   );
  // //   setChat({ ...chat, ...newChat.data });
  // // };
  // // useEffect(() => {
  // //   if (dialog._id) {
  // //     getCurrentChat();
  // //   }
  // // }, [dialog._id]);

  // //FIX
  // const converMessageDate = (data: string) => {
  //   // const convertDate = (number: number) => {
  //   //   const mins: number = Math.floor(number / 60);
  //   //   const secs: number = +(number % 60).toFixed();
  //   //   return `${mins < 10 ? "0" : ""}${mins}:${secs < 10 ? "0" : ""}${secs}`;
  //   // };

  //   const newDate = new Date(data);
  //   const time = `${newDate.getHours()}:${newDate.getMinutes()}:${newDate.getSeconds()}`;
  //   return time;
  // };

  // const senderMessageName = (
  //   userId: string,
  //   message: chatMessageType,
  //   members: membersChatType[]
  // ) => {
  //   return userId === message.senderId ? partnerName(userId, members) : "Вы";
  // };

  // type sendMessageType = Omit<chatMessageType, "_id" | "timestamp">;
  // const handlerSandMessage = () => {
  //   const newMessage: sendMessageType = {
  //     senderId: userId,
  //     text: messageText,
  //   };
  //   socket.emit("CHAT:NEW_MESSAGE", {
  //     chatId: dialog._id,
  //     message: newMessage,
  //     recipientId: recipientId?.userId,
  //   });
  // };
  // const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   handlerSandMessage();
  //   setMessageText("");
  // };

  // useEffect(() => {
  //   socket.on("CHAT:NEW_MESSAGE", ({ chatId, newChat }) => {
  //     console.log(newChat);
  //     dispatch(updateChat({ chatId, newChat }));
  //     setMessages([...newChat.messages]);
  //   });
  // }, []);

  // useEffect(() => {
  //   socket.emit("CHAT:JOIN", { chatId: dialog._id });

  //   return () => {
  //     socket.emit("CHAT:LEAVE", { chatId: dialog._id });
  //     socket.off("CHAT:JOIN");
  //   };
  // }, []);

  // useEffect(() => {
  //   messageRef.current?.scrollIntoView({ behavior: "smooth" });
  // }, [messages]);

  // useEffect(() => {
  //   console.log("SELECTEDDIALOG RENDER - ", messages);
  // });

  return (
    <div className="chat">
      {/* <h1>{partnerName(userId, dialog.members)}</h1>
      <button type="button" onClick={(e) => onClose()}>
        Закрыть
      </button>
      <section className="chat__section">
        {messages.map((el) => {
          return (
            <div key={el._id} ref={messageRef}>
              <p>{senderMessageName(userId, el, dialog.members)}</p>
              <p>{el.text}</p>
              <p>{converMessageDate(el.timestamp)}</p>
              <hr></hr>
            </div>
          );
        })}
      </section>
      <section className="chat__forms">
        <form action="" onSubmit={handleSubmit}>
          <textarea
            name="massage"
            id=""
            cols={50}
            rows={2}
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            style={{ resize: "none" }}
          ></textarea>
          <button type="submit">Отправить</button>
        </form>
      </section> */}
    </div>
  );
};
export default SelectedDialog;
