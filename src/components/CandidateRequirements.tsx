import React, { FC } from "react";
import { arrayProps } from "../store/reducers/createVacancySlice";
import ArrayInput from "./UI/ArrayInput";
import { createVacancySlice } from "../store/reducers/createVacancySlice";
import { useAppDispatch } from "../hooks/redux";
import { Button } from "antd";
interface CandidateRequirementsProps {
  title: string;
  arrayType: keyof arrayProps;
  list: string[];
}

const CandidateRequirements: FC<CandidateRequirementsProps> = ({
  title,
  arrayType,
  list,
}) => {
  const dispatch = useAppDispatch();
  const { removeInArray } = createVacancySlice.actions;
  const removeBenefitHandle = (index: number) => {
    dispatch(removeInArray({ field: arrayType, index }));
  };

  return (
    <div>
      <p>{title}</p>
      <ul>
        {list.map((l, i) => {
          return (
            <li key={i}>
              <div
                style={{ display: "flex", alignItems: "center", gap: "4px  " }}
              >
                <h4
                  style={{
                    fontFamily: "Inter",
                    fontSize: "18px   ",
                    margin: "10px 0 10px 0",
                  }}
                >
                  {l}
                </h4>
                <Button
                  htmlType="button"
                  onClick={(e) => removeBenefitHandle(i)}
                >
                  Удалить
                </Button>
              </div>
            </li>
          );
        })}
      </ul>
      <ArrayInput type={arrayType} />
    </div>
  );
};

export default CandidateRequirements;
