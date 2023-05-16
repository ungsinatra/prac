import React, { FC } from "react";
import { work } from "../types/resume";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { userWorksSlice } from "../store/reducers/userWorksSlice";
import { userResumeSlice } from "../store/reducers/userResumeSlice";
import { Button, Input } from "antd";
type onChangeProps = {
  index: number;
  prop: keyof work;
  value: string;
};

type WorkExperienceFormProps = {
  work: work;
  index: number;
};

const WorkExperienceForm: FC<WorkExperienceFormProps> = ({ work, index }) => {
  const {
    onChange,
    removeUserWork,
    onChangeNameCompany,
    addUserWork,
    onChangeEndWork,
    onChangePosition,
    onChangeStartWork,
    onChangeResponsibilities,
  } = userWorksSlice.actions;
  // const {onChangeNameCompany,onChangeEndWork,onChangePosition,onChangeResponsibilities,onChangeStartWork,removeUserWork,addUserWork} = userResumeSlice.actions;
  const dispatch = useAppDispatch();
  const hanldeDelete = (index: number) => {
    dispatch(removeUserWork(index));
  };
  const handleAddWork = () => {
    dispatch(addUserWork());
  };
  return (
    <div>
      <Input
        placeholder="Название компании"
        type="text"
        name="nameOfCompany"
        value={work.nameOfCompany}
        onChange={(e) => {
          dispatch(
            onChangeNameCompany({
              index: index,
              value: e.target.value,
            })
          );
        }}
      />
      <Input
        placeholder="Начало Работы"
        type="date"
        name="startWork"
        value={work.startWork}
        onChange={(e) => {
          dispatch(
            onChangeStartWork({
              index: index,
              value: e.target.value,
            })
          );
        }}
      />
      <Input
        placeholder="Окончание"
        type="date"
        name="endWork"
        value={work?.endWork || ""}
        onChange={(e) => {
          dispatch(
            onChangeEndWork({
              index: index,
              value: e.target.value,
            })
          );
        }}
      />
      <Input
        placeholder="Должность"
        type="text"
        name="position"
        value={work.position}
        onChange={(e) => {
          dispatch(
            onChangePosition({
              index: index,
              value: e.target.value,
            })
          );
        }}
      />
      <Input
        placeholder="Обязанности на рабочем месте"
        type=""
        name="responsibilities"
        value={work.responsibilities}
        onChange={(e) => {
          dispatch(
            onChangeResponsibilities({
              index: index,
              value: e.target.value,
            })
          );
        }}
      />
      <div style={{marginTop:'20px '}}>
        <Button
          type="primary"
          htmlType="button"
          onClick={(e) => hanldeDelete(index)}
        >
          Удалить работу
        </Button>
        <Button htmlType="button" onClick={handleAddWork}>
          Добавить место работы
        </Button>
      </div>
    </div>
  );
};

export default WorkExperienceForm;
