import React from "react";
import { Menu } from "antd";
import { Dropdown } from "antd";
import { NavLink } from "react-router-dom";
import { UnorderedListOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "./MyDropDown.css";
type MenuItem = {
  label: React.ReactNode;
  key: string;
};
const items: MenuItem[] = [
  {
    label: <NavLink to={"resume"}>Редактировать резюме</NavLink>,
    key: "0",
  },
  {
    label: <NavLink to="vacancy">Создать вакансию</NavLink>,
    key: "1",
  },
  {
    label: <NavLink to="replies">Мои отклики</NavLink>,
    key: "2",
  },
  {
    label: <NavLink to="my-vacancy">Отклики</NavLink>,
    key: "3",
  },
];

const menu = (
  <Menu>
    {items.map((item) => (
      <Menu.Item key={item.key}>{item.label}</Menu.Item>
    ))}
  </Menu>
);
const MyDropDown: React.FC<{ value: boolean; onClick(): void }> = ({
  onClick,
  value,
}) => (
  <Dropdown menu={{ items }} trigger={["hover"]} className="drop-down">
    <a className="drop-down__item">
      <UnorderedListOutlined onClick={onClick} />
    </a>
  </Dropdown>
);

export default MyDropDown;
