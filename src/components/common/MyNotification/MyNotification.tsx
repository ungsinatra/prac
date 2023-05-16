import React, { useEffect } from "react";
import { Button, notification } from "antd";
type NotificationType = "success" | "info" | "warning" | "error";
const MyNotification: React.FC<{
  isShow: boolean;
  message: string;
  desc: string;
  type: NotificationType;
}> = ({ desc, isShow, message, type }) => {
  const [api, contextHolder] = notification.useNotification();

  const openNotificationWithIcon = (type: NotificationType) => {
    api[type]({
      message: message,
      description: desc,
    });
  };
  useEffect(() => {
    if (isShow) {
      openNotificationWithIcon(type);
    }
  }, [isShow]);

  return <div>{contextHolder}</div>;
};

export default MyNotification;
