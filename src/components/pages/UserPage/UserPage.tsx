import React, { useEffect, useLayoutEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { userResumeSlice } from "../../../store/reducers/userResumeSlice";
import { resume } from "../../../types/resume";
import { loaderSlice } from "../../../store/reducers/loaderSlice";
import { Outlet, useNavigate } from "react-router";
import { AntDesignOutlined } from "@ant-design/icons";
import "./UserPage.css";
import { Avatar, Button, Empty } from "antd";
import MyBadge from "../../UI/Badge/MyBadge";
import MyDropDown from "../../UI/DropDown/MyDropDown";
import JobExperienceItem from "../../widgets/JobExperienceItem/JobExperienceItem";
import JobExperienceList from "../../widgets/JobExperienceList/JobExperienceList";
import MyEmpty from "../../MyEmpty";
import { Link } from "react-router-dom";
import UserBioSidebar from "../../UserBioSidebar";
import Spiner from "../../common/Spiner/Spiner";
const UserPage = () => {
  const [isCreating, setIsCreateing] = useState(false);
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.UserReducer);
  const { age, _id, email, gender, lastName, name, phone, resume, vacancy } =
    user;
  const { setUserResume } = userResumeSlice.actions;
  const userResume = useAppSelector((state) => state.userResumeReducer);
  const { setLoader } = loaderSlice.actions;
  const { isLoading } = useAppSelector((state) => state.loaderReducer);
  const dispatch = useAppDispatch();
  const [isClickDropDown, setClickDropDown] = useState(false);

  useEffect(() => {});

  useLayoutEffect(() => {
    console.log("resumeId", resume);
    const jwt: any = localStorage.getItem("jwt");
    if (!resume) {
      console.log("У пользотеля нету резюме");
      return;
    }
    dispatch(setLoader(true));
    const getResume = fetch(`http://158.160.28.109/api/resumes/${resume}`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${jwt.token}`,
      },
    })
      .then((resume) => {
        return resume.json();
      })
      .then((resume) => {
        console.log(resume);
        dispatch(setUserResume(resume));
      })
      .catch((e) => {
        throw new Error(e.message);
      })
      .finally(() => {
        dispatch(setLoader(false));
      });
  }, [_id]);
  if (isLoading) {
    return <Spiner />;
  }

  const removeResumeHandler = () => {
    fetch(`http://158.160.28.109/api/resumes/${resume}`, {
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => alert(data))
      .catch((e) => alert(e));
  };

  return (
    <div className={"user"}>
      <div className="user__container">
        <div className="user__side-bar">
          <div className="user__basic-section section-box ">
            <div className="avatar__container">
              <Avatar
                style={{
                  width: "140px",
                  height: "140px ",
                  backgroundColor: "#fde3cf",
                  color: "#f56a00",
                }}
              ></Avatar>
            </div>
            <div className="user__main-info ">
              <h1 className="user__main-title">{`${name} ${lastName}`}</h1>
              <span className="user__main-gender">{`Пол: ${
                gender == "male" ? "Муржской" : "Женский"
              }`}</span>
              <span className="user__main-meta">
                {resume ? "Ищу работу" : "Не ищу работу"}
              </span>
              <div className="user__main-actions">
                <MyBadge count={1} text="Сообщение" link="/conversations" />
                <MyDropDown
                  value={isClickDropDown}
                  onClick={() => setClickDropDown(true)}
                />
              </div>
            </div>
          </div>
          {!isClickDropDown && (
            <UserBioSidebar resume={userResume} user={user} />
          )}
        </div>
        <div className="user__section-group">
          <Outlet />
          <>
            {!isClickDropDown && (
              <>
                <div className="user__about section-box">
                  <p className="user__about-label user__about">Обо мне</p>
                  {userResume.about ? (
                    <div className="user__about-content">
                      <p className="user__about-text">{userResume.about}</p>
                    </div>
                  ) : (
                    <MyEmpty
                      isMe={true}
                      buttonLable=" Написать о себе "
                      lable="Напишите пару абзацев о себе: что вы знаете и умеете,
                  чем интересуетесь и к чему стремитесь."
                      description=""
                      onOpen={() => {}}
                    />
                  )}
                </div>
                <JobExperienceList
                  jobs={userResume.job}
                  resumeOnwerId={userResume._id as string}
                  userId={user._id as string}
                />
                <div className="user__about section-box">
                  <p className="user__about-label user__about">
                    Высшее образование
                  </p>
                  <MyEmpty
                    buttonLable="Добавить высшее образование "
                    lable=" Укажите, какие вузы вы окончили, вашу специальность и
                      достижения в учёбе."
                    onOpen={() => {
                      console.log("sss");
                    }}
                    description=""
                    isMe={true}
                  />
                </div>
              </>
            )}
          </>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
