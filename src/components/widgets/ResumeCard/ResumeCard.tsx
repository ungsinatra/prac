import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { useParams } from "react-router";
import { resumeSelectedSlice } from "../../../store/reducers/resumeSelectedSlice";
import { resume } from "../../../types/resume";
import { loaderSlice } from "../../../store/reducers/loaderSlice";
import { Avatar, Button } from "antd";
import "./ResumeCard.css";
import MyBadge from "../../UI/Badge/MyBadge";
import UserBioSidebar from "../../UserBioSidebar";
import MyEmpty from "../../MyEmpty";
import JobExperienceList from "../JobExperienceList/JobExperienceList";

const ResumeCard = () => {
  const resume = useAppSelector((state) => state.resumeSelectedReducer);
  const { lastName, name, _id: onwerIdResume } = resume.ownerId;
  const { _id: userId } = useAppSelector((state) => state.UserReducer);
  const { setSelectedResume } = resumeSelectedSlice.actions;
  const { setLoader } = loaderSlice.actions;
  const { isLoading } = useAppSelector((state) => state.loaderReducer);
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const [isMe, setIsMe] = useState(Boolean);
  useEffect(() => {
    setIsMe(resume.ownerId._id?.includes(userId as string) as boolean);
    console.log("isMe", isMe);
  }, [isMe]);
  useEffect(() => {
    dispatch(setLoader(true));
    fetch(`http://158.160.28.109/api/resumes/${id}`, {
      method: "GET",
    })
      .then((res) => {
        return res.json();
      })
      .then((resume) => {
        console.log(resume);
        dispatch(setSelectedResume(resume));
      })
      .catch((e) => {
        throw new Error(e.message);
      })
      .finally(() => {
        dispatch(setLoader(false));
      });
  }, [id]);
  const isItMe: boolean = onwerIdResume === userId;
  console.log();
  return (
    <>
      {!isLoading ? (
        <div className={"resume"}>
          <div className="resume__container">
            <div className="resume__sideBar">
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
                    resume.gender == "male" ? "Муржской" : "Женский"
                  }`}</span>
                  <span className="user__main-meta">
                    {resume ? "Ищу работу" : "Не ищу работу"}
                  </span>
                  <div className="user__main-actions">
                    {isMe && <Button onClick={() => {}}>Написать</Button>}
                  </div>
                </div>
              </div>
              <UserBioSidebar resume={resume} user={resume.ownerId} />
            </div>
            <div className="user__section-group">
              <div className="user__about section-box">
                <p className="user__about-label user__about">Обо мне</p>
                {resume.about ? (
                  <div className="user__about-content">
                    <p className="user__about-text">{resume.about}</p>
                  </div>
                ) : (
                  <MyEmpty
                    isMe={isMe as boolean}
                    buttonLable=" Написать о себе "
                    lable="Напишите пару абзацев о себе: что вы знаете и умеете,
                  чем интересуетесь и к чему стремитесь."
                    description=""
                    onOpen={() => {}}
                  />
                )}
              </div>
              <JobExperienceList
                jobs={resume.job}
                userId={resume.ownerId._id as string}
                resumeOnwerId={resume._id as string}
              />
              <div className="user__about section-box">
                <p className="user__about-label user__about">
                  Высшее образование
                </p>
                <MyEmpty
                  isMe={isMe as boolean}
                  buttonLable="Добавить высшее образование "
                  lable=" Укажите, какие вузы вы окончили, вашу специальность и
                      достижения в учёбе."
                  onOpen={() => {
                    console.log("sss");
                  }}
                  description=""
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        "Идет загрузка..."
      )}
    </>
  );
};

export default ResumeCard;
