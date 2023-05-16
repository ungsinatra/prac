import React from "react";
import { useAppSelector } from "../../hooks/redux";
import { chatsSlice } from "../../store/reducers/chatsSlice";
import "./ChatInput.css";

interface ChatInput {
  value: string;
  onChange(text: string): void;
  onSubmit(): void;
}

const ChatInput: React.FC<ChatInput> = ({ onChange, onSubmit, value }) => {
  const { updateDialogMessage } = chatsSlice.actions;

  const handleSend = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSend} className="chat__form">
      <textarea
        className="chat__form-text-area"
        placeholder="Напишите сообщение..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <button className="chat__form-button" type="submit">
        Send
      </button>
    </form>
  );
};

export default ChatInput;
