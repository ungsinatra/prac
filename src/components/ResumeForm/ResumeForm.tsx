import React, { FormEvent } from "react";
import WorkExperienceForm from "../WorkExperienceForm";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { userWorksSlice } from "../../store/reducers/userWorksSlice";
import { userResumeSlice } from "../../store/reducers/userResumeSlice";
import { UserSlice } from "../../store/reducers/userSlice";
import MyInput from "../UI/MyInput";
import MyTextArea from "../UI/MyTextArea";
import { createResumeSlice } from "../../store/reducers/createResumeSlice";
import ResumeSkills from "../ResumeSkills";
import { Button, Form, Input, Radio } from "antd";
import "./ResumeForm.css";
import { useNavigate } from "react-router";
const ResumeForm = () => {
  const { TextArea } = Input;
  const { Item } = Form;
  const works = useAppSelector((state) => state.userWorksReducer);
  const dispatch = useAppDispatch();
  const newResume = useAppSelector((state) => state.createResumeSlice);
  const {
    about,
    additionally,
    job,
    lastName,
    location,
    name,
    ownerId,
    price,
    skills,
    socials,
    _id,
    age,
    gender,
    photo,
  } = newResume;
  const { _id: userId, vacancy: userVacancy } = useAppSelector(
    (state) => state.UserReducer
  );
  const { addJob, onChange, setSocials } = createResumeSlice.actions;
  const wokrs = useAppSelector((state) => state.userWorksReducer);

  const handleReadyData = () => {
    dispatch(addJob({ value: wokrs }));
    return {
      name,
      lastName,
      about,
      job,
      skills,
      additionally,
      location,
      ownerId: userId,
      price,
      socials,
    };
  };

  const handleReqData = async () => {
    try {
      const res = await fetch("http://158.160.28.109/api/resumes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify(handleReadyData()),
      });
      const responce = await res.json();
      console.log(responce);
    } catch (e) {
      throw new Error("Ошибка  ");
    }
  };

  const handelSubmit = (e: React.FormEvent<Element>) => {
    e.preventDefault();
    handleReqData()
    console.log(JSON.stringify(handleReadyData()));
  };
  return (
    <div className="resume-form">
      <div className="resume-form__container">
        <Form className="resume-form-main" onSubmitCapture={handelSubmit}>
          <Item name="name">
            <Input
              placeholder="Имя"
              className="input__form"
              onChange={(e) =>
                dispatch(onChange({ field: "name", value: e.target.value }))
              }
              value={name}
            />
          </Item>
          <Item name="lastName">
            <Input
              placeholder="Фамилия"
              className="input__form"
              onChange={(e) =>
                dispatch(onChange({ field: "lastName", value: e.target.value }))
              }
              value={lastName}
            />
          </Item>
          <Item name="age">
            <Input
              placeholder="Возраст"
              className="input__form"
              onChange={(e) =>
                dispatch(onChange({ field: "age", value: e.target.value }))
              }
              type="number"
            />
          </Item>
          <Item label="Пол" name="gender">
            <Radio.Group
              onChange={(e) =>
                dispatch(onChange({ field: "gender", value: e.target.value }))
              }
              value={gender}
            >
              <Radio value={"male"}>Мужчина</Radio>
              <Radio value={"female"}>Женщина</Radio>
            </Radio.Group>
          </Item>
          <Item name="location">
            <Input
              placeholder="Местоположение"
              className="input__form"
              onChange={(e) =>
                dispatch(onChange({ field: "location", value: e.target.value }))
              }
              value={location}
            />
          </Item>
          <Item label="О себе" name="about">
            <TextArea
              className="form__text-area"
              name="about"
              placeholder="Напишите о себе..."
              onChange={(e) =>
                dispatch(onChange({ field: "about", value: e.target.value }))
              }
              value={about}
            />
          </Item>
          <Item name="price">
            <Input
              placeholder="Желаемая заплата"
              className="input__form"
              onChange={(e) =>
                dispatch(onChange({ field: "price", value: e.target.value }))
              }
              type="number"
              value={price}
            />
          </Item>
          <h2>Допольнительно</h2>
          <p>Профессиональные навыки</p>
          <Item name="skills">
            <ResumeSkills list={skills} title="Навыки" />
          </Item>
          <p>Контакты</p>
          <Item name="contacts">
            <Input
              className="input__form"
              onChange={(e) =>
                dispatch(setSocials({ prop: "email", value: e.target.value }))
              }
              placeholder="Корпоративная почта: Ivanov@mail.ru"
              value={socials.email}
            />
            <Input
              className="input__form"
              onChange={(e) =>
                dispatch(
                  setSocials({ prop: "telegram", value: e.target.value })
                )
              }
              placeholder="Telegram: @ivanov"
              value={socials.telegram}
            />
          </Item>
          <h2>Опыт работы</h2>
          <Item name="works">
            {works.map((work, index) => {
              return (
                <WorkExperienceForm key={index} work={work} index={index} />
              );
            })}
          </Item>
          <Item>
            <Button type="primary" htmlType="submit">
              Создать резюме
            </Button>
          </Item>
        </Form>
        {/* <Form>
          <div className="">
            <Input placeholder="Имя" name="name" className="input__form" />
            <Input placeholder="Фамилия" name="lastName" />
            <Input placeholder="Имя" name="name" className="input__form" />
            <Input
              placeholder="Возраст"
              name="age"
              className="input__form"
              type="Number"
            />
            <Input
              placeholder="Местоположение"
              name="age"
              className="input__form"
              type="text"
            />
          </div>
          <div className="">

          </div>
        </Form> */}
        {/* <form action="" onSubmit={(e) => handelSubmit(e)}>
          <div className="resume-form-main ">
            <MyInput
              label="Имя"
              name="name"
              onChange={(e) =>
                dispatch(onChange({ field: "name", value: e.target.value }))
              }
              type="text"
              value={name}
            />
            <MyInput
              label="Фамилия"
              name="lastName"
              onChange={(e) =>
                dispatch(onChange({ field: "lastName", value: e.target.value }))
              }
              type="text"
              value={lastName}
            />
            <MyInput
              label="Возраст"
              name="age"
              onChange={(e) =>
                dispatch(onChange({ field: "age", value: e.target.value }))
              }
              type="text"
              value={age === null ? "" : age.toString()}
            />
            <MyInput
              label="Мужчина"
              name="gender"
              onChange={(e) =>
                dispatch(onChange({ field: "gender", value: e.target.value }))
              }
              type="radio"
              value={"male"}
            />
            <MyInput
              label="Женщина"
              name="gender"
              onChange={(e) =>
                dispatch(onChange({ field: "gender", value: e.target.value }))
              }
              type="radio"
              value={"female"}
            />
            <MyInput
              label="Местоположение"
              name="location"
              onChange={(e) =>
                dispatch(onChange({ field: "location", value: e.target.value }))
              }
              type="text"
              value={location}
            />
          </div>
          <MyTextArea
            label="О себе"
            name="about"
            onChange={(e) =>
              dispatch(onChange({ field: "about", value: e.target.value }))
            }
            value={about}
          />
          <MyInput
            label="Цена услуги в часах"
            name="price"
            onChange={(e) =>
              dispatch(onChange({ field: "price", value: e.target.value }))
            }
            type="text"
            value={price}
          />
          <ResumeSkills list={skills} title="Профисиональные навкыи" />
          <p>Контакты</p>
          <input
            type="text"
            className="form__input"
            name="email"
            onChange={(e) =>
              dispatch(setSocials({ prop: "email", value: e.target.value }))
            }
            placeholder="Корпаративная почта:Ivanov@mail.ru"
          />
          <input
            type="text"
            className="form__input"
            name="telegram"
            onChange={(e) =>
              dispatch(setSocials({ prop: "telegram", value: e.target.value }))
            }
            placeholder="Telegram:@ivanov"
          />
          <p>Опыт работы</p>
          {works.map((work, index) => {
            return <WorkExperienceForm key={index} work={work} index={index} />;
          })}
          <button type="submit">Создать резюме</button>
        </form> */}
      </div>
    </div>
  );
};

export default ResumeForm;
