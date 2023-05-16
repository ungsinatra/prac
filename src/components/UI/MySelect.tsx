import React, { FC } from "react";
import { Select } from "antd";

const { Option } = Select;

export interface OptionType {
  value: string;
  textContent: string;
}

interface MySelectProps {
  name: string;
  onChange(value: string): void; // Изменение типа функции здесь
  value: string;
  optionsValues: OptionType[];
}

const MySelect: FC<MySelectProps> = ({
  name,
  onChange,
  optionsValues,
  value,
}) => (
  <>
    <Select value={value} onChange={onChange}>
      {optionsValues.map((option, index) => (
        <Option key={index} value={option.value}>
          {option.textContent}
        </Option>
      ))}
    </Select>
  </>
);

export default MySelect;
