import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import VacancyPreview from "../../widgets/VacancyPreveiw/VacancyPreview";
import { useParams } from "react-router";
import SearchTemplate from "../../SearchTemplate/SearchTemplate";
import SideBar from "../../widgets/SideBar/SideBar";
import { Outlet } from "react-router-dom";
import { vacancy } from "../../../types/vacancy";
import searchTemplate from "../../SearchTemplate/SearchTemplate";
import searchTemplateSlice, {
  SearchTemplateSlice,
} from "../../../store/reducers/searchTemplateSlice";
import { useSortVacancies } from "../../../hooks/useSort";
import { useSidebarSort } from "../../../hooks/useSortSidebar";
import { VacancySlice } from "../../../store/reducers/vacancySlice";
import { loaderSlice } from "../../../store/reducers/loaderSlice";
import { Layout, Spin } from "antd";
import "./vacanciesPage.css";
import Spiner from "../../common/Spiner/Spiner";

const VacanciesPage = () => {
  const { Content } = Layout;
  const salactedSord = useAppSelector((state) => state.sideBarReducer);
  const vacancyList = useAppSelector((state) => state.vacancyListReducer);
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.loaderReducer);
  const { setLoader } = loaderSlice.actions;
  const { addVacancy, removeVancy } = VacancySlice.actions;
  const { select, input } = useAppSelector(
    (state) => state.SearchTemplateReducer
  );
  const sortedList = useSortVacancies(
    { sort: select, query: input },
    vacancyList
  );
  const vacancyPageStyles = {
    marginTop: "50px    ",
  };

  const sortedListSearchAndOther = useSidebarSort(salactedSord, sortedList);
  useEffect(() => {
    dispatch(setLoader(true));
    const vacancies = fetch("http://158.160.28.109/api/vacancies", {
      method: "GET",
    })
      .then((res) => {
        return res.json();
      })
      .then((vacancies) => {
        console.log(vacancies);
        dispatch(addVacancy(vacancies));
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

  return (
    <Content style={vacancyPageStyles}>
      <div className={"vacancies"}>
        <div className={"vacancies__container"}>
          <div className="vacancies__filters">
            <SearchTemplate />
            <SideBar />
          </div>
          <div className="vacancy-preview">
            {sortedList.map((v) => {
              return (
                <VacancyPreview key={v._id} vacancy={v} isReplies={false} />
              );
            })}
          </div>
        </div>
      </div>
    </Content>
  );
};

export default VacanciesPage;
