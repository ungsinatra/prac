import React from "react";
import "./Spiner.css";
const Spiner = () => {
  return (
    <div className="spinner__wrapper">
      <div className="spinner">
        <div className="bounce1"></div>
        <div className="bounce2"></div>
        <div className="bounce3"></div>
      </div>
    </div>
  );
};

export default Spiner;
