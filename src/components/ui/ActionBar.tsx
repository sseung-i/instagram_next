import React from "react";
import HeartFillIcon from "./icons/HeartFillIcon";
import HeartIcon from "../ui/icons/HeartIcon";
import BookmarkFillIcon from "../ui/icons/BookmarkFillIcon";
import BookmarkIcon from "../ui/icons/BookmarkIcon";
import { parseDate } from "@/util/date";
import S from "./ActionBar.module.css";

interface Props {
  likes: string[];
  userName: string;
  text: string;
  createdAt: string;
}
const ActionBar = ({ likes, userName, text, createdAt }: Props) => {
  const isLiked = true;
  const isBookMarked = false;

  return (
    <article className={S.content}>
      <div className={S.interaction}>
        {isLiked ? <HeartFillIcon /> : <HeartIcon />}
        {isBookMarked ? <BookmarkFillIcon /> : <BookmarkIcon />}
      </div>
      <p className={S.like_count}>
        {`${likes?.length ?? 0} ${likes?.length > 1 ? "likes" : "like"}`}{" "}
      </p>
      <p className={S.desc}>
        <span className={S.user_name}>{userName}</span> {text}
      </p>
      <p className={S.ago}>{parseDate(createdAt)}</p>
    </article>
  );
};

export default ActionBar;
