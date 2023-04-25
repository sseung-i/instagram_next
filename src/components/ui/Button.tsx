import React from "react";
import S from "./Button.module.css";

interface Props {
  text: string;
  onClick: () => void;
  red?: boolean;
}
const Button = ({ text, onClick, red }: Props) => {
  return <button className={`${S.btn} ${red ? S.red : S.blue}`}>{text}</button>;
};

export default Button;
