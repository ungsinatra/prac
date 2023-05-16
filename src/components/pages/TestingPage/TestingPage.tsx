import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../../hooks/redux";
import { quationSlice } from "../../../store/reducers/questionsSlice";
import { useAppDispatch } from "../../../hooks/redux";
import { useParams } from "react-router";
import { IAnswer } from "../../../types/questions";
import { Tabs } from "antd";
import { useNavigate } from "react-router";
import { notification } from "antd";
import "./TestingPage.css";
import Spiner from "../../common/Spiner/Spiner";
import { BASE_URL } from "../../../utils/constants";
const { TabPane } = Tabs;

type NotificationType = "success" | "info" | "warning" | "error";
const TestingPage = () => {
  const navigate = useNavigate();
  const { answers, error, isLoading, questions, description, title } =
    useAppSelector((state) => state.questionsReducer);

  const {
    setError,
    setIsLoading,
    setQuestions,
    setAnswers,
    setInfoTest,
    removeData,
  } = quationSlice.actions;
  const {
    _id: userId,
    resume: userResumeId,
    name,
    lastName,
  } = useAppSelector((state) => state.UserReducer);
  const [activeTabKey, setActiveTabKey] = useState<number>(0);
  const [code, setCode] = useState("");
  const { _id: vacancyId } = useAppSelector(
    (state) => state.vacancySelectedReducer
  );
  const [api, contextHolder] = notification.useNotification();
  const [myNatiofication, setMyNatiofication] = useState<{
    type: NotificationType;
    mess: string;
    desc: string;
  } | null>(null);
  const dispatch = useAppDispatch();
  const { id } = useParams();

  const updateAnswers = (
    index: number,
    newAnswer: string,
    _id: string,
    question: string
  ) => {
    const newAnswers: IAnswer[] = [...answers];
    newAnswers[index] = {
      ...newAnswers[index],
      answer: newAnswer,
      _id: _id,
      question: question,
    };
    localStorage.setItem("answers", JSON.stringify(answers));
    dispatch(setAnswers(newAnswers));
  };
  useEffect(() => {
    const getAnswersFormLocalStorage = localStorage.getItem("answers");
    if (getAnswersFormLocalStorage) {
      dispatch(setAnswers(JSON.parse(getAnswersFormLocalStorage)));
    }
  }, []);

  useEffect(() => {
    dispatch(setIsLoading(true));
    fetch(`http://158.160.28.109/api/tests/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        const { questions } = data;
        dispatch(setQuestions(questions));
        dispatch(
          setInfoTest({ title: data.title, description: data.description })
        );
      })
      .finally(() => {
        dispatch(setIsLoading(false));
      });
  }, [id]);

  const openNotificationWithIcon = (
    type: NotificationType,
    message: string,
    desc: string
  ) => {
    api[type]({
      message: message,
      description: desc,
    });
  };

  console.log("вопросы из сервера", questions);
  const jwt = localStorage.getItem("jwt");

  const replyHandler = () => {
    dispatch(setIsLoading(true));
    const resData = {
      replyData: {
        vacancyId,
        userId,
        userResumeId,
        userName: `${name} ${lastName}`,
        vacancyName: title,
      },
      answerData: {
        userId: userId,
        testId: id,
        answers: answers,
      },
    };
    console.log(JSON.stringify(resData));
    dispatch(setIsLoading(true));
    fetch(`${BASE_URL}/replies`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        authorization: `Bearer $${jwt}`,
      },
      body: JSON.stringify(resData),
    })
      .then((res) => {
        console.log(res.status);
        if (res.status == 200 || res.status == 201) {
          setMyNatiofication({
            type: "success",
            mess: "Успех",
            desc: "Отклик успешно отправлен",
          });
          setTimeout(() => {
            navigate("/vacancies", { replace: true });
          }, 500);
          localStorage.removeItem("answers");
        } else {
          throw new Error("Ошибка выполнения запроса");
        }
      })

      .catch((e) => {
        setMyNatiofication({
          type: "error",
          mess: "Ошибка",
          desc: "Отклик не отправлен",
        });
        dispatch(setError(e.message));
      })
      .finally(() => {
        dispatch(setIsLoading(false));
      });
  };

  useEffect(() => {
    if (myNatiofication) {
      const { desc, mess, type } = myNatiofication;
      openNotificationWithIcon(type, mess, desc);
    }
  }, [myNatiofication]);
  const submitHandler = () => {
    dispatch(removeData());
    replyHandler();
  };
  if (isLoading) {
    return <Spiner />;
  }
  if (error) {
    return <p>{`Ошибка:${error}`}</p>;
  }

  return (
    <div className="survey-questions-container">
      {contextHolder}
      {!isLoading && !error && (
        <div>
          <div className="survey__main_info">
            <h1 className="survey__title">Тестиривание</h1>
            <hr />
            <h2 className="survey-questions-title">{title}</h2>
            <p className="survey-questions-description">{description}</p>
          </div>
          <Tabs
            className="test"
            activeKey={`${activeTabKey}`}
            onChange={(key) => {
              console.log(key);
              setActiveTabKey(+key);
            }}
            size="large"
            tabPosition="top"
            type="line"
          >
            {questions.map((question, index) => (
              <TabPane tab={`Вопрос ${index + 1}`} key={index}>
                <div key={question._id} className="survey-question-item">
                  <h3 className="survey-question">{question.question}</h3>
                  {question.type === "choice" && question.answers ? (
                    question.answers.map((answer) => (
                      <div key={answer._id}>
                        <input
                          type="radio"
                          name={`answer-${index}`}
                          checked={answers[index]?.answer === answer.answer}
                          onChange={() =>
                            updateAnswers(
                              index,
                              answer.answer,
                              answer._id,
                              question.question
                            )
                          }
                        />
                        <label className="survey-answer-label">
                          {answer.answer}
                        </label>
                      </div>
                    ))
                  ) : (
                    <>
                      <input
                        type="text"
                        value={answers[index]?.answer ?? ""}
                        onChange={(e) => {
                          console.log("ласт вопрос", answers);
                          const _id = questions[index]._id;
                          const question = questions[index]?.question;
                          updateAnswers(index, e.target.value, _id, question);
                        }}
                        className="survey-answer-input"
                      />
                    </>
                  )}

                  {activeTabKey === questions.length - 1 && (
                    <button
                      onClick={submitHandler}
                      className="survey-submit-button"
                    >
                      Закончить тестиривание
                    </button>
                  )}
                </div>
              </TabPane>
            ))}
          </Tabs>
        </div>
      )}
    </div>
  );
};

export default TestingPage;
