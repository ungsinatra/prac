import React, { useEffect, useRef } from "react";
import { chatMessageType } from "../../types/chats";
import Message from "../Message/Message";
import "./Messages.css";
interface MessagesProps {
  messages: chatMessageType[];
}

const Messages: React.FC<MessagesProps> = ({ messages }) => {
  const messageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, messageRef]);

  return (
    <>
      {messages.map((message) => (
        <Message key={message._id} message={message} messageRef={messageRef} />
      ))}
    </>
  );
};

export default Messages;
