import React from "react";
import { Layout } from "antd";
import "./Footer.css";
const Footer = () => {
  const { Footer } = Layout;
  return (
    <Footer className="footer">
      <div className="footer__container">
        <p>Все права защищены - werk 2023</p>
      </div>
    </Footer>
  );
};

export default Footer;
