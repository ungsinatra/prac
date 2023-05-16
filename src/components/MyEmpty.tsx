import { Button, Empty } from "antd";
import React from "react";

type MyEmptyProps = {
  description: string;
  lable: string;
  buttonLable: string;
  onOpen(): void;
  isMe: boolean;
};

const MyEmpty: React.FC<MyEmptyProps> = ({
  buttonLable,
  description,
  lable,
  onOpen,
  isMe,
}) => {
  return (
    <ul className="separated-lists separated-lists_isEmpty ">
      <Empty description="Нет информации" />
      {isMe && (
        <div className="separated__empty-content">
          <span>{lable}</span>

          <Button className="separated__empty-button" onClick={onOpen}>
            {buttonLable}
          </Button>
        </div>
      )}
    </ul>
  );
};

export default MyEmpty;
