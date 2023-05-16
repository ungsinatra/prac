import { NavLink, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import isLoginSlice, {
  isLoggedInSlice,
} from "../../store/reducers/isLoginSlice";
import { popupShowSlice } from "../../store/reducers/popupShowSlice";
import { Menu } from "antd";
import {
  HomeOutlined,
  UserOutlined,
  SettingOutlined,
  FileTextOutlined,
  TeamOutlined,
  MessageOutlined,
  LogoutOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import "./Nav.css";
const Nav = () => {
  const navigate = useNavigate();
  const { email } = useAppSelector((state) => state.UserReducer);
  const { onCloseLogoutPopup } = popupShowSlice.actions;
  const dispatch = useAppDispatch();
  const { isLoggedIn } = useAppSelector((state) => state.isLoginReducer);
  const handlerNavigate = () => {
    navigate("/sing-up");
  };
  const handleLogOut = () => {
    console.log("yes");
    dispatch(onCloseLogoutPopup());
  };

  const navStyles = {
    color: "black",
    higth: "64px",
    background: "transparent",
  };

  return (
    <nav className="nav">
      <Menu
        mode="horizontal"
        defaultSelectedKeys={["home"]}
        style={navStyles}
        // defaultOpenKeys={[
        //   "home",
        //   "vacancies",
        //   "resumes",
        //   "companies",
        //   "salaries",
        //   "profile",
        // ]}
      >
        <Menu.Item key="home" icon={<HomeOutlined />}>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            Главная
          </NavLink>
        </Menu.Item>
        <Menu.Item key="vacancies" icon={<FileTextOutlined />}>
          <NavLink
            to="/vacancies"
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            Вакансии
          </NavLink>
        </Menu.Item>
        <Menu.Item key="resumes" icon={<UserOutlined />}>
          <NavLink to="/resumes">Специалисты</NavLink>
        </Menu.Item>
        <Menu.Item key="companies" icon={<TeamOutlined />}>
          <NavLink to="/companies">Компании</NavLink>
        </Menu.Item>
        <Menu.Item
          key="profile"
          className="nav_link"
          icon={<UserAddOutlined />}
        >
          {}
          <NavLink to="/user/profile" className="link"></NavLink>
        </Menu.Item>
      </Menu>
    </nav>
  );
};

export default Nav;
