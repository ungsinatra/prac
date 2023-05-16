import React, { memo } from "react";
import "./LogoutPopup.css";
import { useNavigate } from "react-router";

interface logOutPopupTypes {
  message: string;
  children: React.ReactNode;
  onSubmit(): void;
  isOpen: boolean;
  onClose(): void;
}

const InfoPopup: React.FC<logOutPopupTypes> = memo(
  ({ children, message, onClose, onSubmit, isOpen }) => {
    const navigate = useNavigate();
    const handleLogout = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      localStorage.removeItem("jwt");
      onSubmit();

      navigate("/sing-in", { replace: true });
    };

    return (
      <div className={`popup ${isOpen ? "popup__opened" : ""} `}>
        <div className={`popup__content`}>
          <button
            type="button"
            aria-label="Закрыть попап"
            className="popup__close-btn"
            onClick={(e) => onClose()}
          ></button>
          <h4 className="popup__title">{message}</h4>
          <form
            action="#"
            method="post"
            name="del"
            className="popup__form popup__form_use_profile"
            onSubmit={(e) => handleLogout(e)}
            noValidate
          >
            {children}
          </form>
        </div>
      </div>
    );
  }
);

export default InfoPopup;
