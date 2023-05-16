import React, { useCallback, useEffect } from "react";
import VacancyPreview from "../../widgets/VacancyPreveiw/VacancyPreview";
import { replySlice } from "../../../store/reducers/repliesSlice";
import { useAppSelector } from "../../../hooks/redux";
import { useAppDispatch } from "../../../hooks/redux";
import { reply } from "../../../types/reply";
import RepliesPreview from "../../widgets/RepliesPreview";
import { VacancySlice } from "../../../store/reducers/vacancySlice";
import { BASE_URL } from "../../../utils/constants";
import "./RepliesPage.css";
const RepliesPage = () => {
  const { _id: userId } = useAppSelector((state) => state.UserReducer);
  const { removeReply, setReplies, resetReplies } = replySlice.actions;
  const replies = useAppSelector((state) => state.replyReducer);
  const vacancies = useAppSelector((state) => state.vacancyListReducer);
  const { addVacancy } = VacancySlice.actions;
  const dispatch = useAppDispatch();

  // const findUserReplies = (replies: reply[]) => {
  //   return replies.filter((reply) => {
  //     return reply.userId === userId;
  //   });
  // };

  // // const userRepliesList = findUserReplies(replies);

  const findVacancies = () => {
    const vacancyIds = replies.map((reply) => reply.replyData.vacancyId);
    return vacancies.filter((vacancy) => {
      if (vacancy._id !== null) {
        return vacancyIds.includes(vacancy._id);
      }
    });
  };

  const deleteReplyHandle = async (index: number, _id: string) => {
    try {
      const send = await fetch(`http://158.160.28.109/api/replies/me/${_id}`, {
        method: "DELETE",
      });
      const res = await send.json();
      dispatch(removeReply({ index: index }));
    } catch (e) {
      throw new Error("Ошибка при удаление отклика");
    }
  };

  const userVacanciesRepliesList = findVacancies();
  useEffect(() => {
    (async () => {
      const res = await fetch(`${BASE_URL}/replies/me/${userId}`);
      const data = await res.json();
      console.log("все отклики!", data);
      dispatch(setReplies(data));
    })();
    return () => {
      dispatch(resetReplies());
    };
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`http://158.160.28.109/api/vacancies`);
        const data = await res.json();
        dispatch(addVacancy(data));
      } catch (e) {
        throw new Error("Ошиюка при полчешии вакансии!");
      }
    })();
  }, []);

  // if (userVacanciesRepliesList.length <= 0) {
  //   return <h1>У вас нету откликов!</h1>;
  // }

  const convertreplyStatus = (status: string) => {
    if (status === "pending") {
      return `Не просмотренно`;
    }
    if (status === "invite") {
      return `Приглашение`;
    }
    return "Отказ";
  };
  return (
    <div className="my-replies">
      <div className="my-replies__container">
        <div className="my-replies__header">
          <h1 className="my-replies__title">Ваши отклики</h1>
        </div>
        <ul className="my-replies__lists">
          {userVacanciesRepliesList.map((v, index) => {
            return (
              <li key={v._id} className="my-replies__list">
                <VacancyPreview
                  vacancy={v}
                  isReplies={true}
                  accepted={convertreplyStatus(
                    replies[index].replyData.accepted.isAccepted
                  )}
                />
                {/* <div className="my-replies__status-container">
                  <span className="basic__text">Статус отклика</span>
                  <p className="status text">
                    {convertreplyStatus(
                      replies[index].replyData.accepted.isAccepted
                    )}
                  </p>
                </div> */}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default RepliesPage;
