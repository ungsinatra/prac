import React, { FC, useState } from "react";
import { userResumeSlice } from "../store/reducers/userResumeSlice";
import { useAppDispatch } from "../hooks/redux";
import { createResumeSlice } from "../store/reducers/createResumeSlice";
import { Button, Input, List } from "antd";

interface ResumeSkillsProps {
  title: string;
  list: string[];
}

const ResumeSkills: FC<ResumeSkillsProps> = ({ list, title }) => {
  const [value, setValue] = useState("");
  const { addInSkills, removeSkill } = createResumeSlice.actions;
  const dispatch = useAppDispatch();
  const handleAddItem = () => {
    dispatch(addInSkills({ value: value }));
    setValue("");
  };
  const removeSkillHandle = (index: number) => {
    dispatch(removeSkill({ index: index }));
  };

  return (
    <div>
      {/* <p>{title}</p> */}
      <ul>
        {list.map((l, i) => {
          return (
            <List key={i}>
              <div>
                <p>{l}</p>
                <Button htmlType="button" onClick={(e) => removeSkillHandle(i)}>
                  Удалить
                </Button>
              </div>
            </List>
          );
        })}
      </ul>
      <div style={{ display: "flex" }}>
        <Input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <Button htmlType="button" onClick={(e) => handleAddItem()}>
          Добавить
        </Button>
      </div>
    </div>
  );
};

export default ResumeSkills;
