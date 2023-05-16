import React, { useEffect, useState } from "react";
import SearchTemplate from "../../SearchTemplate/SearchTemplate";
import ResumesPreview from "../../widgets/ResumesPreview/ResumesPreview";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { resume } from "../../../types/resume";
import { useSortResumes, useSortVacancies } from "../../../hooks/useSort";
import { resumesSlice } from "../../../store/reducers/resumesSlice";
import { loaderSlice } from "../../../store/reducers/loaderSlice";
import "./ResumesPage.css";
import { Image } from "antd";
import { useSidebarSort } from "../../../hooks/useSortSidebar";
import Spiner from "../../common/Spiner/Spiner";
import { Content } from "antd/es/layout/layout";
import SideBar from "../../widgets/SideBar/SideBar";
const ResumesPage = () => {
  const { select, input } = useAppSelector(
    (state) => state.SearchTemplateReducer
  );
  const resumes: resume[] = useAppSelector((state) => state.resumesReducer);
  const dispatch = useAppDispatch();
  const { setExperts } = resumesSlice.actions;
  const sortedQueryResumes = useSortResumes(
    { sort: select, query: input },
    resumes
  );
  const { setLoader } = loaderSlice.actions;
  const { isLoading } = useAppSelector((state) => state.loaderReducer);
  // const sortedResume = useSidebarSort();
  useEffect(() => {
    dispatch(setLoader(true));
    fetch("http://158.160.28.109/api/resumes", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        dispatch(setExperts(data));
      })
      .catch((e) => {
        throw new Error(e.message);
      })
      .finally(() => {
        dispatch(setLoader(false));
      });
  }, []);

  if (isLoading) {
    return <Spiner />;
  }
  const vacancyPageStyles = {
    marginTop: "50px    ",
  };

  return (
    // <div className={"resumes"}>
    //   <h1 className="resumes__title">Специалисты</h1>
    //   <div className={"resumes__container"}>
    //     <div>
    //       <div className="resumes__search">
    //         <SearchTemplate />
    //       </div>
    //     </div>
    //     <ul className="resumes__lists">
    //       {sortedQueryResumes.map((resume) => {
    //         return (
    //           <li key={resume._id} className="resumes__list">
    //             <ResumesPreview resume={resume} />{" "}
    //           </li>
    //         );
    //       })}
    //     </ul>
    //   </div>
    // </div>

    <Content style={vacancyPageStyles}>
      <div className={"vacancies"}>
        <div className={"vacancies__container"}>
          <div className="vacancies__filters">
            <SearchTemplate />
            <SideBar />
          </div>
          <div className="vacancy-preview">
            {sortedQueryResumes.map((resume) => {
              return (
                <li className="vacancy__item">
                  <ResumesPreview resume={resume} />
                </li>
              );
            })}
          </div>
        </div>
      </div>
    </Content>
  );
};

export default ResumesPage;
