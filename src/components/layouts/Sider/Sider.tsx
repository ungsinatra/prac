import React from "react";
import { Layout, Menu } from "antd";
import {
  HomeOutlined,
  UserOutlined,
  SettingOutlined,
  ProfileFilled,
  FileTextOutlined,
  LogoutOutlined,
  MessageOutlined,
  TeamOutlined,
} from "@ant-design/icons";

const Sider: React.FC<{ onTogleSlider(): void; collapsed: boolean }> = ({
  collapsed,
  onTogleSlider,
}) => {
  const { Sider } = Layout;

  return (
    <Sider
      theme="dark"
      about="Sider"
      collapsed={collapsed}
      onCollapse={() => {
        onTogleSlider();
      }}
    >
      <Menu>
        <Menu.Item key="user" icon={<UserOutlined />}>
          Профиль
        </Menu.Item>
        <Menu.Item key="resume" icon={<FileTextOutlined />}>
          Резюме
        </Menu.Item>
        <Menu.Item key="messages" icon={<MessageOutlined />}>
          Отклики
        </Menu.Item>
        <Menu.Item key="messages" icon={<TeamOutlined />}>
          Мои Вакансия
        </Menu.Item>

        <Menu.Item key="logOut" icon={<LogoutOutlined />}>
          Выйти
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default Sider;
