import React, { useEffect, useState } from "react";
import { repliesTypes, replySlice } from "../../../store/reducers/repliesSlice";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { vacancy } from "../../../types/vacancy";
import { BASE_URL } from "../../../utils/constants";
import axios from "axios";
import MyEmpty from "../../MyEmpty";
import { reply } from "../../../types/reply";
import { IAnswer } from "../../../types/questions";
import { Link } from "react-router-dom";
import { Button } from "antd";
import "./RepliesUsersPage.css";
import MyNotification from "../../common/MyNotification/MyNotification";
type NotificationType = "success" | "info" | "warning" | "error";
const RepliesUsers = () => {
  const [natification, setNotification] = useState<{
    message: string;
    isShow: boolean;
    desc: string;
    type: NotificationType;
  } | null>(null);

  const { setReplies, removeReply, resetReplies } = replySlice.actions;
  const replies = useAppSelector((state) => state.replyReducer);
  const dispatch = useAppDispatch();
  const { vacancy } = useAppSelector((state) => state.UserReducer);
  const [isActive, setIsActive] = useState(false);
  const {
    _id: myId,
    name,
    lastName,
  } = useAppSelector((state) => state.UserReducer);
  type userAnswerDataType = {
    _id: string;
    userId: string;
    testId: string;
    answers: IAnswer[];
  };

  const preparationData = (
    replylist: reply[],
    userAnswers: userAnswerDataType[]
  ) => {
    const newData = replylist.map((reply, index) => {
      if (reply.userId === userAnswers[index].userId) {
        return {
          replyData: reply,
          userAnswerData: userAnswers[index],
        };
      } else {
        return {
          replyData: reply,
          userAnswerData: userAnswers[index],
        };
      }
    });
    return newData;
  };

  const fetchVacancy = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/vacancies/me/${vacancy}`);
      const { allreplies, allUsersAnswers, vacancy: myVacancy } = res.data;
      console.log(allreplies);
      const repliesAndAnswersUser = preparationData(
        allreplies,
        allUsersAnswers
      );
      console.log(repliesAndAnswersUser);
      // setUserVacancy(myVacancy);
      // setuserAnswer(allUsersAnswers);
      dispatch(setReplies(repliesAndAnswersUser));
    } catch (error) {
      alert("Ошибка");
    }
  };

  useEffect(() => {
    fetchVacancy();

    return () => {
      dispatch(resetReplies());
    };
  }, []);

  if (!vacancy) {
    return (
      <>
        <div>
          <MyEmpty
            buttonLable="Создать вакансию"
            description=""
            lable="у вас нет вакансии"
            isMe={true}
            onOpen={() => {}}
          />
        </div>
      </>
    );
  }

  const reqData = (
    isAccepted: string,
    text: string,
    data: {
      replyId: string;
      replyUserId: string;
      replyUserName: string;
    }
  ) => {
    return {
      replydata: {
        accepted: {
          isAccepted: isAccepted,
        },
      },
      chat: {
        members: [
          {
            name: `${name} ${lastName}`,
            userId: myId,
          },
          {
            name: data.replyUserName,
            userId: data.replyUserId,
          },
        ],
        type: "private",
        messages: [
          {
            text: text,
            senderId: myId,
            senderName: name,
            isRead: false,
          },
        ],
        lastMessage: text,
        unreadCount: 1,
      },
    };
  };

  const onInvite = async (
    isAccepted: string,
    text: string,
    data: {
      replyId: string;
      replyUserId: string;
      replyUserName: string;
    }
  ) => {
    const sendData = reqData(isAccepted, text, data);
    try {
      const send = await axios.put(
        `${BASE_URL}/replies/answer/${data.replyId}`,
        {
          replyData: sendData.replydata,
          chat: sendData.chat,
        }
      );
      if ((send.statusText = "ok")) {
        setNotification({
          desc: "Успешно отправлено",
          isShow: true,
          message: "Ответ на отклик",
          type: "success",
        });
      }
    } catch (error) {
      setNotification({
        desc: "Ошибка",
        isShow: true,
        message: "Ответ не отправлен",
        type: "error",
      });
      throw new Error("Ошибка при ответе на отклик");
    }

    console.log("click", sendData);
  };

  const onReject = async (
    isAccepted: string,
    text: string,
    data: {
      replyId: string;
      replyUserId: string;
      replyUserName: string;
    }
  ) => {
    try {
      const sendData = reqData(isAccepted, text, data);
      const req = await axios.put(
        `${BASE_URL}/replies/answer/${data.replyId}`,
        {
          replyData: sendData.replydata,
          chat: sendData.chat,
        }
      );
      if ((req.statusText = "ok")) {
        setNotification({
          desc: "Успешно отправлено",
          isShow: true,
          message: "Ответ на отклик",
          type: "success",
        });
      }
    } catch (error) {
      setNotification({
        desc: "Ошибка",
        isShow: true,
        message: "Ответ не отправлен",
        type: "error",
      });
    }
  };
  // useEffect(() => {
  //   (async () => {
  //     const res = await axios.get(`${BASE_URL}/vacancies/me/${vacancy}`);
  //     const { allreplies, allUsersAnswers, vacancy: myVacancy } = res.data;
  //     setUserVacancy(myVacancy);
  //     setuserAnswer(allUsersAnswers);
  //     console.log(allreplies);
  //     // setReplies(allreplies);
  //   })();

  //   // return () => {
  //   //   dispatch(resetReplies);
  //   // };
  // }, []);

  return (
    <>
      <div className="replies">
        <MyNotification
          desc={natification?.desc as string}
          isShow={natification?.isShow as boolean}
          message={natification?.message as string}
          type={natification?.type as NotificationType}
        />
        <div className="replies__container user__section-group">
          <div className="replies__header">
            <h1 className="replies__header__title">Отлкики пользователей</h1>
          </div>
          {replies.map(({ replyData, userAnswerData }) => {
            return (
              <div className="replies__list section-box">
                <div className="reply-card">
                  <div className={`reply__main-contenet`}>
                    <Link to={`/vacancies/${replyData.vacancyId}`}>
                      <h2 className="reply__title">{replyData.vacancyName}</h2>
                    </Link>
                    <Link to={`/resumes/${replyData.userResumeId}`}>
                      <p className="reply__userName">
                        Пользователь: {replyData.userName}
                      </p>
                    </Link>
                    <div
                      className="replies__drop-down"
                      onClick={() => setIsActive(!isActive)}
                    >
                      <span className="replies__drop-down__item">{`Подробнее`}</span>
                    </div>
                  </div>
                  <div
                    className={`reply__content ${
                      !isActive ? "reply__content--hidden" : ""
                    } `}
                  >
                    <h3>Тестирование</h3>
                    {userAnswerData.answers.map((answer) => {
                      return (
                        <li className="answer">
                          <div className="">
                            <p>{`Вопрос: ${answer.question}`}</p>

                            <p>{`Ответ:${answer.answer}`}</p>
                          </div>
                        </li>
                      );
                    })}
                  </div>
                  <div className="reply__buttons">
                    <Button
                      onClick={() => {
                        onInvite("invite", "Вы приглашены", {
                          replyId: replyData._id,
                          replyUserId: replyData.userId,
                          replyUserName: replyData.userName,
                        });
                      }}
                    >
                      Пригласить
                    </Button>
                    <Button
                      onClick={() => {
                        onReject("deny", "Отказ", {
                          replyId: replyData._id,
                          replyUserId: replyData.userId,
                          replyUserName: replyData.userName,
                        });
                      }}
                    >
                      Отказать
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default RepliesUsers;
