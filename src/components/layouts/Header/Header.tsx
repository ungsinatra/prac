import React, { FC } from "react";
import headerLogo from "../../../assets/img/e129544a-5c6d-47f3-a3bd-428cdf7ba6bf-transformed.svg";
import Nav from "../../Nav/Nav";
import "./header.css";
import { useNavigate } from "react-router-dom";
import { Layout, Menu, Button } from "antd";
import {
  HomeOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons";
import BurgerMenu from "../../UI/BurgerMenu/BurgerMenu";
const Header: FC<{ onTogleSlider(): void; collapsed: boolean }> = ({
  collapsed,
  onTogleSlider,
}) => {
  const { Header } = Layout;

  const headerStyle = {
    // textAlign: "center",
    color: "#fff",
    height: 64,
    paddingInline: 50,
    lineHeight: "64px",
    backgroundColor: "white",
  };

  const navigate = useNavigate();
  const handlerToHomePage = () => {
    navigate("/", { replace: true });
  };

  return (
    <Header style={headerStyle}>
      <div className="header__container">
        <img
          className="header_logo"
          src={headerLogo}
          onClick={handlerToHomePage}
          alt="логотип шапки"
        />
        <Nav />
        <div className="header__burger-menu">
          <BurgerMenu />
        </div>
      </div>
    </Header>
  );
};

export default Header;

// {
//     /* // <header className="header">
//     //     <div className={'header__container'}>
//     //         <img className="header_logo" src={headerLogo} onClick={handlerToHomePage} alt="логотип шапки"/>
//     //         <Nav/>

//     {/* <div className={"header__container"}>
//       <img
//         className="header_logo"
//         src={headerLogo}
//         onClick={handlerToHomePage}
//         alt="логотип шапки"
//       />
//     </div> */}
//     //     </div>
//     // </header> */
// }
