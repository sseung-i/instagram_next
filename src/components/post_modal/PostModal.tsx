import React from "react";
import S from "./PostModal.module.css";
import CloseIcon from "../ui/icons/CloseIcon";

interface Props {
  children: React.ReactNode;
  onClose: () => void;
}
const PostModal = ({ onClose, children }: Props) => {
  return (
    <section
      className={S.detail}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <button className={S.close} onClick={() => onClose()}>
        <CloseIcon />
      </button>
      <div className={S.content}>{children}</div>
    </section>
  );
};

export default PostModal;
