import React, { FC, FormEvent, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./registration.css";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { registerSlice } from "../../store/reducers/registerSlice";
import "./registration.css";
import { NotificationType } from "../../types/notification";
import MyNotification from "../common/MyNotification/MyNotification";
import { BASE_URL } from "../../utils/constants";
const RegistrationForm: FC = () => {
  const {
    email,
    gender,
    lastName,
    password,
    phone,
    repeatPassword,
    userName,
    age,
  } = useAppSelector((state) => state.registerReducer);
  const navigate = useNavigate();
  const [natification, setNotification] = useState<{
    message: string;
    isShow: boolean;
    desc: string;
    type: NotificationType;
  } | null>(null);
  const link = process.env.API_LINK;
  console.log(link);
  const fetchReg = async () => {
    try {
      const res = await fetch(`${BASE_URL}/singup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({
          name: userName,
          lastName,
          email,
          password,
          phone,
          gender,
          age,
        }),
      });
      if (!res.ok) {
        throw new Error("Status false");
      }
      setNotification({
        desc: "",
        isShow: true,
        message: "Регистрация прошла успешнно",
        type: "success",
      });
      setTimeout(() => {
        navigate("/sing-in", { replace: true });
      }, 500);
    } catch (error) {
      setNotification({
        desc: "Ошибка",
        isShow: true,
        message: `${error}`,
        type: "error",
      });
      console.log(error);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetchReg();
  };
  const {
    onChangeEmail,
    onChangeGender,
    onChangeLastName,
    onChangePass,
    onChangePhone,
    onChangeRepeatPass,
    onChangeUserName,
    onChangeAge,
  } = registerSlice.actions;
  const dispatch = useAppDispatch();

  return (
    <div className=" register">
      <div className="register__container">
        <MyNotification
          desc={natification?.desc as string}
          isShow={natification?.isShow as boolean}
          message={natification?.message as string}
          type={natification?.type as NotificationType}
        />
        <form className="form" onSubmit={handleSubmit}>
          <label htmlFor="username">Имя пользователя:</label>
          <input
            className="form_input"
            name={"name"}
            type="text"
            id="username"
            value={userName}
            onChange={(e) => dispatch(onChangeUserName(e.target.value))}
          />
          <label htmlFor="userLastName">Фамилия:</label>
          <input
            className="form_input"
            type="text"
            id="userLastName"
            name={"lastname"}
            value={lastName}
            onChange={(e) => dispatch(onChangeLastName(e.target.value))}
          />

          <label htmlFor="userAge">Возраст:</label>
          <input
            className="form_input"
            type="text"
            id="userAge"
            name={"age"}
            value={age}
            onChange={(e) => dispatch(onChangeAge(e.target.value))}
          />
          <label>
            <input
              type="radio"
              name="gender"
              value="male"
              onChange={(e) => dispatch(onChangeGender(e.target.value))}
              required
            />
            Мужчина
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="female"
              onChange={(e) => dispatch(onChangeGender(e.target.value))}
            />
            Женщина
          </label>

          <label htmlFor="email">Email:</label>
          <input
            className="form_input"
            type="email"
            id="email"
            name={"email"}
            value={email}
            onChange={(e) => dispatch(onChangeEmail(e.target.value))}
          />
          <label htmlFor="phone">Телефон:</label>
          <input
            className="form_input"
            type="tel"
            id="phone"
            name={"phone"}
            value={phone}
            onChange={(e) => dispatch(onChangePhone(e.target.value))}
          />
          <label htmlFor="password">Пароль:</label>
          <input
            className="form_input"
            type="password"
            id="password"
            value={password}
            onChange={(e) => dispatch(onChangePass(e.target.value))}
          />
          <label htmlFor="confirm-password">Подтвердите пароль:</label>
          <input
            className="form_input"
            type="password"
            id="confirm-password"
            value={repeatPassword}
            onChange={(e) => dispatch(onChangeRepeatPass(e.target.value))}
          />
          <button className="form_button" type="submit">
            Зарегистрироваться
          </button>
          <NavLink className="auth__link" to="/sing-in">
            Уже зарегистрированы? Войти
          </NavLink>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
