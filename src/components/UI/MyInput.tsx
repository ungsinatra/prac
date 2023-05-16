import React,{FC} from "react";

interface MyInputProps {
    name:string,
    onChange(e:React.ChangeEvent<HTMLInputElement>):void,
    label:string,
    type:string,
    value:string | number ,
}

const MyInput:FC<MyInputProps> = ({label,name,onChange,type,value}) => {
  return (
    <>
      <label htmlFor={name}>{`${label}:`}</label>
      <input
        id={name}
        type={type}
        name={name}
        value={value}
        onChange={(e) =>
            onChange(e)
        }
        placeholder={label}
      />
    </>
  );
};

export default MyInput;
