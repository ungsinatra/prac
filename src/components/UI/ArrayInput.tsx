import React, { FC, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
  arrayProps,
  createVacancySlice,
} from "../../store/reducers/createVacancySlice";
import { Button, Input } from "antd";

const ArrayInput: FC<{ type: keyof arrayProps }> = ({ type }) => {
  const { addInArray } = createVacancySlice.actions;
  const dispatch = useAppDispatch();
  const [value, setValue] = useState<string>("");

  const handleAddBenefit = () => {
    dispatch(addInArray({ field: type, value }));
    setValue("");
  };

  return (
    <div style={{display:'flex'}}>
      <Input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <Button htmlType="button" onClick={(e) => handleAddBenefit()}>
        Добавить
      </Button>
    </div>
  );
};

export default ArrayInput;
