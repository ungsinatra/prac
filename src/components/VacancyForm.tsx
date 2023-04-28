import React, { FormEvent } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { createVacancySlice } from "../store/reducers/createVacancySlice";
import Benefits from "./Benefits";
import ArrayInput from "./UI/ArrayInput";
import CandidateRequirements from "./CandidateRequirements";
import Questions from "./Questions";
import MyInput from "./UI/MyInput";
import MyTextArea from "./UI/MyTextArea";
import MySelect from "./UI/MySelect";
import { occupiedOptions } from "../utils/constants";
import { qualyOptions } from "../utils/constants";
import { vacancy } from "../types/vacancy";
import { directionOptions } from "../utils/constants";
import userSlice from "../store/reducers/userSlice";
const VacancyForm = () => {
  const {
    title,
    aboutCompany,
    company,
    _id,
    benefits,
    date,
    direction,
    experience,
    graid,
    location,
    logo,
    occupied,
    price,
    qualifications,
    responsibilities,
    subtitle,
    testId,
  } = useAppSelector((state) => state.createVacancyReducer);
  const dispatch = useAppDispatch();
  const { onChange: onChangeHandle } = createVacancySlice.actions;
  const userVacancy:vacancy = useAppSelector(state => state.createVacancyReducer);
  const vacancyQuestions = useAppSelector(state => state.createTestReducer);
  const {_id:userId} = useAppSelector(state => state.UserReducer)
  const handelSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      vacancyData:{
        ...userVacancy,
        userId:userId
      },
      testData:{
        ...vacancyQuestions,
      },
      company:{
        name:userVacancy.company,
        about:userVacancy.aboutCompany,
        userId:userId
      }
    }
    const jsonData = JSON.stringify(data);
    console.log(jsonData)
  }

  return (
    <form onSubmit={handelSubmit}>
      <div className="form__main">
        <MyInput label="Название вакансии" name="title" onChange={(e) => dispatch(onChangeHandle({ field: "title", value: e.target.value }))} type="text" value={title} />
        <MyInput label="Описание вакансии" name="subtitle" onChange={(e) => dispatch(onChangeHandle({ field: "subtitle", value: e.target.value }))} type="text" value={subtitle} />
        <MyInput label="Название компании" name="name-company" onChange={(e) => dispatch(onChangeHandle({ field: "company", value: e.target.value }))} type="text" value={company} />
        <MyTextArea label="О компании" name="about-company" value={aboutCompany} onChange={(e) => dispatch(onChangeHandle({ field: "aboutCompany", value: e.target.value }))} />
        <MyInput label="Город" name="city" onChange={(e) => dispatch(onChangeHandle({ field: "location", value: e.target.value }))} type="text" value={location} />
        <MyInput label="Зарплата" name="price" onChange={(e) => dispatch(onChangeHandle({ field: "price", value: e.target.value }))} type="number" value={price} />

        <MyInput label="Опыт" name="experience" onChange={(e) => dispatch(onChangeHandle({ field: "experience", value: e.target.value }))} type="text" value={experience} />
        <label htmlFor="occupied">Тип занятости:</label>
        <MySelect name="occupied" onChange={(e) => dispatch(onChangeHandle({ field: "occupied", value: e.target.value }))} optionsValues={occupiedOptions} value={occupied} />
        <label htmlFor="direction">Специализация:</label>
        <MySelect name="direction" onChange={(e) => dispatch(onChangeHandle({ field: "direction", value: e.target.value }))} optionsValues={directionOptions} value={direction} />
      </div>
      <label htmlFor="graid">Квалификация:</label>
      <MySelect name="graid" onChange={(e) => dispatch(onChangeHandle({ field: "graid", value: e.target.value }))} optionsValues={qualyOptions} value={graid} />
      <CandidateRequirements title={'Преимущества:'} arrayType={"benefits"} list={benefits} />
      <CandidateRequirements title={'Основные задачи:'} arrayType={"responsibilities"} list={responsibilities} />
      <CandidateRequirements title={'Нaвыки и знание:'} arrayType={"qualifications"} list={qualifications} />
      <p>Тесты</p>
      <Questions />
      <button type='submit'>Отправить</button>
    </form>
  );
};

export default VacancyForm;
