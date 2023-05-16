import React, { useState } from "react";
import "./BurgerMenu.css";
import { Link } from "react-router-dom";
const BurgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const menuStyles = {
    display: isOpen ? "block" : "none",
  };

  return (
    <div className="burger-menu">
      <button className="icon" onClick={handleClick}>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </button>
      <ul className="menu" style={menuStyles}>
        <Link
          to="/"
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          <li>Главная</li>
        </Link>
        <Link
          to="/vacancies"
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          <li>Вакансии</li>
        </Link>
        <Link
          to="/vacancies"
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          <li>Специалисты</li>
        </Link>
        <Link
          to="/companies"
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          <li>Компании</li>
        </Link>
        <Link
          to="/user/profile"
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          <li>Профиль</li>
        </Link>
      </ul>
    </div>
  );
};

export default BurgerMenu;
