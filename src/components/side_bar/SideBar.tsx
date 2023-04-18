import React from "react";
import S from "./SideBar.module.css";
import { User } from "@/model/user";
import Avatar from "../ui/Avatar";

interface Props {
  user: User;
}

const SideBar = ({ user: { name, username, image } }: Props) => {
  return (
    <aside className={S.sidebar}>
      <div className={S.profile}>
        <Avatar image={image} size="L" />
        <div className={S.info}>
          <p className={S.user_name}>{username}</p>
          <p className={S.name}>{name}</p>
        </div>
      </div>
      <p className={`${S.about} ${S.desc}`}>
        About ・ Help ・ Press ・ API ・ Jobs ・ Privacy ・ Terms ・ Location ・
        Laguage
      </p>
      <p className={`${S.copy} ${S.desc}`}>@Copyright INSTANTGRAM from METAL</p>
    </aside>
  );
};

export default SideBar;
