import React from "react";
import { ClockCircleOutlined } from "@ant-design/icons";
import { Avatar, Badge, Space } from "antd";
import "./MyBadge.css";
import { Link } from "react-router-dom";
const MyBadge: React.FC<{ count: number; text: string; link: string }> = ({
  count,
  text,
  link,
}) => {
  if (count === 0) {
    return (
      <Badge showZero className="badge">
        <div className="badge__container">
          <p className="badge__text">{text}</p>
        </div>
      </Badge>
    );
  }

  return (
    <Badge count={count} showZero className="badge" >
      <Link to={`${link}`}>
        <div className="badge__container">
          <p className="badge__text">{text}</p>
        </div>
      </Link>
    </Badge>
  );
};

export default MyBadge;
