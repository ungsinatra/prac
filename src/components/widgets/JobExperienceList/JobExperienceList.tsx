import React from "react";
import JobExperienceItem from "../JobExperienceItem/JobExperienceItem";
import { Empty, Button } from "antd";
import { work } from "../../../types/resume";
import "./JobExperienceList.css";
import MyEmpty from "../../MyEmpty";
const JobExperienceList: React.FC<{
  jobs: work[];
  userId: string;
  resumeOnwerId: string;
}> = ({ jobs, resumeOnwerId, userId }) => {
  const isMe = userId === resumeOnwerId;
  if (jobs.length === 0) {
    return (
      <div className="user__work section-box">
        <p className="user__about-label user__work">Опыт работы</p>
        <MyEmpty
          buttonLable=" Добавить место работы "
          description=""
          isMe={isMe}
          lable=" Перечислите самый важный для вас опыт работы, начиная с последнего
              места"
          onOpen={() => {}}
        />
      </div>
    );
  }

  return (
    <div className="user__work section-box">
      <p className="user__about-label user__work">Опыт работы</p>
      <ul className="separated-lists">
        {jobs.map(
          (
            { endWork, nameOfCompany, position, responsibilities, startWork },
            index
          ) => {
            return (
              <li className="separated-list__item">
                {" "}
                <JobExperienceItem
                  endWork={endWork}
                  nameOfCompany={nameOfCompany}
                  position={position}
                  responsibilities={responsibilities}
                  startWork={startWork}
                />
              </li>
            );
          }
        )}
      </ul>
    </div>
  );
};

export default JobExperienceList;
