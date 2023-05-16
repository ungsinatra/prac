import React, { FormEvent, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { createVacancySlice } from "../../store/reducers/createVacancySlice";
import Benefits from "../Benefits";
import ArrayInput from "../UI/ArrayInput";
import CandidateRequirements from "../CandidateRequirements";
import Questions from "../Questions";
import MyInput from "../UI/MyInput";
import MyTextArea from "../UI/MyTextArea";
import MySelect from "../UI/MySelect";
import { BASE_URL, occupiedOptions } from "../../utils/constants";
import { qualyOptions } from "../../utils/constants";
import { vacancy } from "../../types/vacancy";
import { directionOptions } from "../../utils/constants";
import { useNavigate } from "react-router";
import { Button, Input } from "antd";
import "./VacancyForm.css";
import { NotificationType } from "../../types/notification";
import axios from "axios";
import MyNotification from "../common/MyNotification/MyNotification";
const VacancyForm = () => {
  const { TextArea } = Input;
  const {} = useAppSelector((state) => state.UserReducer);
  const navigate = useNavigate();
  const [natification, setNotification] = useState<{
    message: string;
    isShow: boolean;
    desc: string;
    type: NotificationType;
  } | null>(null);

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
    about,
    testId,
    repliesUsers,
  } = useAppSelector((state) => state.createVacancyReducer);
  const dispatch = useAppDispatch();
  const { onChange: onChangeHandle } = createVacancySlice.actions;
  const {
    company: companyID,
    description,
    questions,
    title: titleTest,
    vacancyId,
  } = useAppSelector((state) => state.createTestReducer);
  const { _id: userId, vacancy } = useAppSelector((state) => state.UserReducer);

  // if (vacancy) {
  //   return <h1>У пользотеля уже есть вакансия</h1>;
  // }

  const readyReqDate = () => {
    const data = {
      vacancyData: {
        title,
        company,
        benefits,
        direction,
        experience,
        occupied,
        price,
        qualifications,
        responsibilities,
        about,
        location,
        userId,
        createrId: userId,
      },
      testData: {
        title: titleTest,
        questions: questions.map((q) => {
          return {
            question: q.question,
            type: q.type,
            answers: q.answers,
          };
        }),
        description,
      },
      company: {
        name: company,
        about: aboutCompany,
        userId: userId,
      },
    };
    return data;
  };

  console.log(JSON.stringify(readyReqDate()));

  const handelSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = readyReqDate();
    try {
      const res = await axios.post(`${BASE_URL}/vacancies`, data);
      if ((res.statusText = "ok")) {
        setNotification({
          desc: "Успешно создана",
          isShow: true,
          message: "Вакансия",
          type: "success",
        });
        setTimeout(() => {
          navigate("/user/profile", { replace: true });
        }, 500);
      }
    } catch (error) {
      setNotification({
        desc: "Ошибка",
        isShow: true,
        message: "Вакансия не создана",
        type: "error",
      });
      throw new Error("ошибка при создании вакансии");
    }
  };

  return (
    <div>
      <h1>Создания вакансии</h1>
      <MyNotification
        desc={natification?.desc as string}
        isShow={natification?.isShow as boolean}
        message={natification?.message as string}
        type={natification?.type as NotificationType}
      />
      <form onSubmit={handelSubmit}>
        <div className="form__main">
          <Input
            style={{ margin: "0 0 10px 0" }}
            name="title"
            placeholder="Название вакансии"
            onChange={(e) =>
              dispatch(
                onChangeHandle({ field: "title", value: e.target.value })
              )
            }
            type="text"
            value={title}
          />
          <Input
            name="subtitle"
            style={{ margin: "0 0 5px 0" }}
            placeholder="Описание вакансии"
            onChange={(e) =>
              dispatch(
                onChangeHandle({ field: "about", value: e.target.value })
              )
            }
            type="text"
            value={about}
          />
          <h2>Компания</h2>
          <Input
            style={{ margin: "10px 0 5px 0" }}
            name="name-company"
            placeholder="Название компании"
            onChange={(e) =>
              dispatch(
                onChangeHandle({ field: "company", value: e.target.value })
              )
            }
            type="text"
            value={company}
          />

          <Input
            name="city"
            style={{ margin: "0 0 10px 0" }}
            placeholder="Город"
            onChange={(e) =>
              dispatch(
                onChangeHandle({ field: "location", value: e.target.value })
              )
            }
            type="text"
            value={location}
          />
          <Input
            name="price"
            style={{ margin: "0 0 10px 0" }}
            placeholder="Зарплата"
            onChange={(e) =>
              dispatch(
                onChangeHandle({ field: "price", value: e.target.value })
              )
            }
            type="number"
            value={price}
          />

          <Input
            name="experience"
            placeholder="Опыт работы"
            onChange={(e) =>
              dispatch(
                onChangeHandle({ field: "experience", value: e.target.value })
              )
            }
            type="text"
            value={experience}
          />
          <TextArea
            style={{ margin: "10px 0 10px 0" }}
            name="about-company"
            value={aboutCompany}
            placeholder="О компании"
            onChange={(e) =>
              dispatch(
                onChangeHandle({ field: "aboutCompany", value: e.target.value })
              )
            }
          />

          <div className="form__selects">
            <h2>Допольнительно</h2>
            <div className="form__select">
              <label htmlFor="occupied">Тип занятости:</label>
              <MySelect
                name="occupied"
                onChange={(e) =>
                  dispatch(onChangeHandle({ field: "occupied", value: e }))
                }
                optionsValues={occupiedOptions}
                value={occupied}
              />
            </div>
            <div className="form__select">
              <label htmlFor="direction">Специализация:</label>
              <MySelect
                name="direction"
                onChange={(e) =>
                  dispatch(onChangeHandle({ field: "direction", value: e }))
                }
                optionsValues={directionOptions}
                value={direction}
              />
            </div>

            <div className="form__select">
              <label htmlFor="graid">Квалификация:</label>
              <MySelect
                name="direction"
                onChange={(e) =>
                  dispatch(onChangeHandle({ field: "graid", value: e }))
                }
                optionsValues={qualyOptions}
                value={graid}
              />
            </div>
          </div>
        </div>

        <CandidateRequirements
          title={"Преимущества:"}
          arrayType={"benefits"}
          list={benefits}
        />
        <CandidateRequirements
          title={"Основные задачи:"}
          arrayType={"responsibilities"}
          list={responsibilities}
        />
        <CandidateRequirements
          title={"Нaвыки и знание:"}
          arrayType={"qualifications"}
          list={qualifications}
        />
        <h1>Тесты</h1>
        <h3>
          Тестирование обязательное,кандидаты будут при отклике проходить
          тестиривание
        </h3>
        <hr />
        <div className="quations__container" style={{ marginTop: "20px" }}>
          <Questions />
        </div>
        <Button htmlType="submit">Отправить</Button>
      </form>
    </div>
  );
};

export default VacancyForm;
