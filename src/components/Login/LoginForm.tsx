import React, { useState } from "react";
import "./registration.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { LoginSlice } from "../../store/reducers/logingSlice";
import userSlice, { UserSlice } from "../../store/reducers/userSlice";
import registrationForm from "./RegistrationForm";
import { isLoggedInSlice } from "../../store/reducers/isLoginSlice";
import "./loginForm.css";
import { NotificationType } from "../../types/notification";
import MyNotification from "../common/MyNotification/MyNotification";
const LoginForm = () => {
  const { password, email, isLogIned } = useAppSelector(
    (state) => state.logingReducer
  );

  const [natification, setNotification] = useState<{
    message: string;
    isShow: boolean;
    desc: string;
    type: NotificationType;
  } | null>(null);

  const dispatch = useAppDispatch();
  const { onChangePass, onChangeEmail, onChangeLog } = LoginSlice.actions;
  const { setUserInfo } = UserSlice.actions;
  const { setIsloggedIn } = isLoggedInSlice.actions;
  const navigate = useNavigate();
  const login = async () => {
    try {
      const res = await fetch("http://158.160.28.109/api/singin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({
          password,
          email,
        }),
      });
      if (!res.ok) {
        throw new Error("Запрос не прошел");
      }
      const data = await res.json();
      const token = (data as { token: string }).token;
      const userData = data._id;
      localStorage.setItem(
        "jwt",
        JSON.stringify({
          token: token,
        })
      );
      setNotification({
        desc: "Вошли в аккаунт",
        isShow: true,
        message: "Успешно",
        type: "success",
      });
      dispatch(setIsloggedIn());
      dispatch(onChangeLog());
      dispatch(setUserInfo(userData));
      setTimeout(() => {
        navigate("/", { replace: true });
      }, 500);
    } catch (e) {
      setNotification({
        desc: "Ошибка",
        isShow: true,
        message: `${e}`,
        type: "error",
      });
      console.log(e);
    }
  };

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    login();
  }

  return (
    <div className="login register ">
      <div className="login__container">
        <MyNotification
          desc={natification?.desc as string}
          isShow={natification?.isShow as boolean}
          message={natification?.message as string}
          type={natification?.type as NotificationType}
        />
        <form className="form" onSubmit={handleSubmit}>
          <label htmlFor="email">Email:</label>
          <input
            className="form_input"
            type="email"
            id="email"
            value={email}
            onChange={(e) => dispatch(onChangeEmail(e.target.value))}
          />
          <label htmlFor="password">Пароль:</label>
          <input
            className="form_input"
            type="password"
            id="password"
            value={password}
            onChange={(e) => dispatch(onChangePass(e.target.value))}
          />
          <button className="form_button" type="submit">
            Войти
          </button>
          <NavLink className="auth__link" to="/sing-up" replace={false}>
            Зарегистрироваться
          </NavLink>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
