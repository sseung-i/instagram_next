import React, { useState } from "react";
import HeartFillIcon from "./icons/HeartFillIcon";
import HeartIcon from "../ui/icons/HeartIcon";
import BookmarkFillIcon from "../ui/icons/BookmarkFillIcon";
import BookmarkIcon from "../ui/icons/BookmarkIcon";
import { parseDate } from "@/util/date";
import S from "./ActionBar.module.css";
import ToggleButton from "./ToggleButton";
import { SimplePost } from "@/model/post";
import { useSession } from "next-auth/react";
import usePosts from "@/hooks/usePosts";
import { getUserByUsername } from "@/service/user";
import useMe from "@/hooks/useMe";

interface Props {
  post: SimplePost;
}
const ActionBar = ({ post }: Props) => {
  const { id, likes, username, text, createdAt } = post;
  const { user, setBookmark } = useMe();
  const { setLike } = usePosts();

  const liked = user ? likes.includes(user.username) : false;
  const bookmarked = user?.bookmarks.includes(id) ?? false;
  // 유저의 북마크를 가져온다.

  const handleLike = (like: boolean) => {
    user && setLike(post, user.username, like);
  };

  const handleBookmark = (bookmark: boolean) => {
    user && setBookmark(id, bookmark);
  };

  return (
    <article className={S.content}>
      <div className={S.interaction}>
        <ToggleButton
          toggled={liked}
          onToggle={handleLike}
          onIcon={<HeartFillIcon color="#cb2784" />}
          offIcon={<HeartIcon />}
        />
        <ToggleButton
          toggled={bookmarked}
          onToggle={handleBookmark}
          onIcon={<BookmarkFillIcon />}
          offIcon={<BookmarkIcon />}
        />
      </div>
      <p className={S.like_count}>
        {`${likes?.length ?? 0} ${likes?.length > 1 ? "likes" : "like"}`}{" "}
      </p>
      {text && (
        <p className={S.desc}>
          <span className={S.user_name}>{username}</span> {text}
        </p>
      )}
      <p className={S.ago}>{parseDate(createdAt)}</p>
    </article>
  );
};

export default ActionBar;
