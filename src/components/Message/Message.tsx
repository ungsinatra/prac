import React from "react";
import { chatMessageType } from "../../types/chats";
import { useAppSelector } from "../../hooks/redux";
import "./Message.css";
const Message: React.FC<{
  message: chatMessageType;
  messageRef: React.RefObject<HTMLDivElement>;
}> = ({ message, messageRef }) => {
  const { _id: userId } = useAppSelector((state) => state.UserReducer);

  if (message.senderId === userId) {
    return (
      <div
        className="message-template message-template_type_user"
        ref={messageRef}
      >
        <div className="message message_type_user">
          <div className="message__text ">
            <p className="message__paragraph">{message.text}</p>
            <p style={{ marginTop: "0" }} className="message__paragraph">
              {message.timestamp}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="message-template message-template_type_default"
      ref={messageRef}
    >
      <div className="message">
        <img src={""} alt="Аватар пользователя" className="message__avatar" />
        <div className="message__text message__text_type_user">
          <p className="message__paragraph message__paragraph_type_user">{message.text}</p>
          <p className="message__paragraph">{message.timestamp}</p>
        </div>
      </div>
    </div>
  );
};

{
  /* <div className="message" ref={messageRef}>
      <div className="message__continer">
        <div className="message__author">{message.senderId}</div>
        <p className="message__text">{message.text}</p>
        <p className="message__send-data">{message.timestamp}</p>
      </div>
    </div> */
}

export default Message;
