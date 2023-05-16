import React, { FC, FormEvent } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { searchSlice } from "../../../store/reducers/searchSlice";
import "./main.css";
import { vacancy } from "../../../types/vacancy";
import { useNavigate } from "react-router-dom";
import useSearchSort from "../../../store/reducers/searchSortSlice";
import { searchSortSlice } from "../../../store/reducers/searchSortSlice";
import { Outlet } from "react-router-dom";
import InfoPopup from "../../modals/InfoPopup";

const Main: FC = () => {
  const { searchEmployerAction, searchExpertsAction } = searchSlice.actions;
  const dispatch = useAppDispatch();
  const { isSearchEmployer, isSearchExpert } = useAppSelector(
    (state) => state.searchReducer
  );
  const navigate = useNavigate();
  const { searchSort } = useAppSelector((stata) => stata.searchSortReducer);
  const vacancysList = useAppSelector((state) => state.vacancyListReducer);
  const { sordForSearch } = searchSortSlice.actions;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sordForSearch("");
    navigate(`/vacancys/${searchSort.toLowerCase()}`, { replace: true });
  };

  return (
    <>
      <main className="main">
        <div className="main__items">
          <div className="main__text-content">
            <h1 className="main__title">Работа мечты с нами - быстро, удобно и надежно!</h1>
          </div>
          <div className="main__buttons">
            <button
              className={`main__buttons-expert 
                           isSearchExpert ? "main__buttons-active" : ""*
                       }`}
              onClick={() => dispatch(searchExpertsAction(true))}
            >
              Специалистам
            </button>
            <button
              className={`main__buttons-employer 
                           isSearchEmployer ? "main__buttons-active" : ""
                       }`}
              onClick={() => dispatch(searchEmployerAction(true))}
            >
              Работодателям
            </button>
          </div>
        </div>
      </main>
    </>
  );
};

export default Main;
