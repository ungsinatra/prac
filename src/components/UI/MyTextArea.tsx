import React, { FC } from "react";

interface MyTextAreaProps {
  name: string;
  onChange(e: React.ChangeEvent<HTMLTextAreaElement>): void;
  label: string;
  value: string;
}

const MyTextArea: FC<MyTextAreaProps> = ({ label, name, onChange, value }) => {
  return (
    <>
      <label htmlFor={name}>{`${label}:`}</label>
      <textarea
        id={name}
        name={name}
        value={value}
        cols={30}
        rows={10}
        onChange={(e) => onChange(e)}
        placeholder={label}
      />
    </>
  );
};

export default MyTextArea;
