import React from "react";
import S from "./Button.module.css";

interface Props {
  text: string;
  onClick: () => void;
  red?: boolean;
  disabled: boolean;
}
const Button = ({ text, onClick, red, disabled = false }: Props) => {
  return (
    <button
      className={`${S.btn} ${red ? S.red : S.blue}`}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Button;
