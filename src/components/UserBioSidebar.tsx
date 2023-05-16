import React from "react";
import { resume } from "../types/resume";
import { user } from "../types/user";
import { Link } from "react-router-dom";
import MyEmpty from "./MyEmpty";

type UserBioSidebarProps = {
  resume: resume;
  user: user;
};
const UserBioSidebar: React.FC<UserBioSidebarProps> = ({ resume, user }) => {
  if (resume._id == "") {
    return (
      <div className="user__main-bio ">
        <div className="user__main-group section-group">
          <MyEmpty
            isMe={resume.ownerId._id === user._id}
            lable="Допольнительная информация отсутсвует"
            buttonLable="Добавить резюме"
            description=""
            onOpen={() => {}}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="user__main-bio ">
      <div className="user__main-group section-group">
        <div className="user__main-info">
          <p className="basic__text">
            Возраст:
            <span className="text">{` ${user.age}`}</span>
          </p>
          <p className="basic__text">
            Местоположение:
            <span className="text">{` ${resume.location}`}</span>
          </p>
          <p className="basic__text">
            Дополнительно:
            <span className="text">{` ${resume.additionally}`}</span>
          </p>
          <div className="skills basic__wrapper">
            <span className="basic__text">Профессиональные навыки</span>
            <ul className="skills__lists">
              {resume.skills.map((skill) => {
                return (
                  <li className="skills__list">
                    <Link to={"/"}></Link>
                    <span className="text">{skill}</span>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="social basic__wrapper">
            <span className="basic__text">Кантакты</span>
            <ul className="socials__lists skills__lists">
              <li className="skills__list social__list">
                <span className="basic__text">Почта: </span>
                {resume.socials.email}
              </li>
              <li className="skills__list">
                <span className="basic__text">Telegram: </span>
                {resume.socials.telegram}
              </li>
              <li className="skills__list">
                <span className="basic__text">Номер: </span>
                {user.phone}
              </li>
            </ul>
          </div>
        </div>

        <ul></ul>
      </div>
    </div>
  );
};

export default UserBioSidebar;
