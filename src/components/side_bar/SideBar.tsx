import React from "react";
import S from "./SideBar.module.css";
import { User } from "@/model/user";
import Avatar from "../ui/Avatar";

interface Props {
  user: User;
}

const SideBar = ({ user: { name, username, image } }: Props) => {
  return (
    <section className={S.sidebar}>
      <article className={S.profile}>
        <Avatar image={image} size="L" />
        <div className={S.info}>
          <p className={S.user_name}>{username}</p>
          <p className={S.name}>{name}</p>
        </div>
      </article>
      <p className={`${S.about} ${S.desc}`}>
        About ・ Help ・ Press ・ API ・ Jobs ・ Privacy ・ Terms ・ Location ・
        Laguage
      </p>
      <p className={`${S.copy} ${S.desc}`}>@Copyright INSTANTGRAM from METAL</p>
    </section>
  );
};

export default SideBar;
