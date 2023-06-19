import React, { useEffect, useLayoutEffect, useState } from "react";
import "./App.css";
import Header from "../layouts/Header/Header";
import { Route, Routes } from "react-router-dom";
import Main from "../layouts/Main/Main";
import VacanciesPage from "../pages/VacanciesPage/VacanciesPage";
import RegisterPage from "../pages/RegisterPage";
import LoginPage from "../pages/LoginPage";
import ResumesPage from "../pages/ResumePage/ResumesPage";
import CompaniesPage from "../pages/CompaniesPage/CompaniesPage";
import VacancyCard from "../VacancyCard/VacancyCard";
import ResumeCard from "../widgets/ResumeCard/ResumeCard";
import UserPage from "../pages/UserPage/UserPage";
import ProtectedRoute from "../HOC/ProtectedRoute";
import TestingPage from "../pages/TestingPage/TestingPage";
import { verifiedToken } from "../../hooks/useVeryfiedToken";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { UserSlice } from "../../store/reducers/userSlice";
import { user } from "../../types/user";
import { useNavigate } from "react-router-dom";
import { isLoggedInSlice } from "../../store/reducers/isLoginSlice";
import InfoPopup from "../modals/InfoPopup";
import ResumeForm from "../ResumeForm/ResumeForm";
import RepliesPage from "../pages/RepliesPage/RepliesPage";
import VacancyForm from "../VacancyForm/VacancyForm";
import DialogsPage from "../pages/DialogsPage/DialogsPage";
import { socket } from "../../core/socket";
import { Layout } from "antd";
import Footer from "../layouts/Footer/Footer";
import "./App.css";
import Chat from "../Chat/Chat";
import RepliesUsersPage from "../pages/RepliesUsersPage/RepliesUsersPage";

function App() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const { setUserInfo } = UserSlice.actions;
  const { setIsloggedIn } = isLoggedInSlice.actions;
  const dispatch = useAppDispatch();
  const { Content } = Layout;
  const { activeChat } = useAppSelector((state) => state.chatsReducer);
  const { isLoggedIn } = useAppSelector((state) => state.isLoginReducer);

  useLayoutEffect(() => {
    const tokenData: { token: string } | null = JSON.parse(
      localStorage.getItem("jwt") || "null"
    );
    if (!tokenData?.token) {
      console.log("yes");
      navigate("/sing-up", { replace: true });
      return;
    }

    const token = tokenData.token;
    const userData = verifiedToken(token);
    userData.then((userData) => {
      const currentUserData: user = {
        _id: userData._id,
        age: userData.age,
        email: userData.email,
        gender: userData.gender,
        lastName: userData.lastName,
        name: userData.name,
        phone: userData.phone,
        resume: userData.resume,
        vacancy: userData.vacancy,
      };
      dispatch(setIsloggedIn());
      dispatch(setUserInfo(currentUserData));
    });
  }, []);
  const [collapsed, setCollapsed] = useState(false);

  // FIX
  // useEffect(() => {
  //   socket.on("NOTIFICATION:NEW_MESSAGE", (data) => {
  //     setNotification(data);
  //   });
  // }, []);

  const { _id } = useAppSelector((state) => state.UserReducer);

  return (
    <div className="page">
      <Layout>
        <Header
          collapsed={collapsed}
          onTogleSlider={() => setCollapsed(!collapsed)}
        />
        <Content>
          <Routes>
            <Route path={"/"} element={<Main />}></Route>
            <Route path={"/vacancies"} element={<VacanciesPage />}></Route>
            <Route path="/vacancies/:id" element={<VacancyCard />} />
            <Route path="/sing-up" element={<RegisterPage />} />
            <Route path="/sing-in" element={<LoginPage />} />
            <Route
              path="/user/profile"
              // element={<UserPage />}
              element={
                <ProtectedRoute Element={UserPage} isLoggedIn={isLoggedIn} />
              }
            >
              <Route path="resume" element={<ResumeForm />} />
              <Route path="replies" element={<RepliesPage />} />
              <Route path="vacancy" element={<VacancyForm />} />
              <Route path="my-vacancy" element={<RepliesUsersPage />} />
            </Route>
            <Route
              path={"/resumes"}
              element={
                <ResumesPage />
                // <ProtectedRoute Element={ResumesPage} isLoggedIn={isLoggedIn} />
              }
            />
            <Route
              path={"/resumes/:id"}
              element={
                <ProtectedRoute Element={ResumeCard} isLoggedIn={isLoggedIn} />
              }
            />
            <Route path="/companies" element={<CompaniesPage />} />
            <Route
              path={"/vacancies/test/:id"}
              element={
                <ProtectedRoute Element={TestingPage} isLoggedIn={isLoggedIn} />
              }
            />
            <Route
              path={"/conversations"}
              element={
                <ProtectedRoute
                  Element={DialogsPage}
                  isLoggedIn={isLoggedIn}
                  userId={_id as string}
                />
              }
            >
              <Route path=":id" element={<Chat id={activeChat as string} />} />
            </Route>
          </Routes>
          <InfoPopup
            isOpen={isOpen}
            children={
              <>
                <button
                  type="submit"
                  className={`popup__btn-save popup__btn-submit`}
                >
                  Да
                </button>
              </>
            }
            message="Выйти?"
            onClose={() => setIsOpen(false)}
            onSubmit={() => setIsOpen(false)}
          />
        </Content>
        <Footer />
      </Layout>
      {/* <Sider
        collapsed={collapsed}
        onTogleSlider={() => setCollapsed(!collapsed)}
      /> */}
    </div>
  );
}

export default App;
