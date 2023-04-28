import React from "react";
import HeartFillIcon from "./icons/HeartFillIcon";
import HeartIcon from "../ui/icons/HeartIcon";
import BookmarkFillIcon from "../ui/icons/BookmarkFillIcon";
import BookmarkIcon from "../ui/icons/BookmarkIcon";
import { parseDate } from "@/util/date";
import S from "./ActionBar.module.css";
import ToggleButton from "./ToggleButton";
import { Comment, SimplePost } from "@/model/post";
import usePosts from "@/hooks/usePosts";
import useMe from "@/hooks/useMe";
import CommentForm from "../comment_form/CommentForm";

interface Props {
  post: SimplePost;
  children?: React.ReactNode;
  onComment: (comment: Comment) => void;
}
const ActionBar = ({ post, children, onComment }: Props) => {
  const { id, likes, createdAt } = post;
  const { user, setBookmark } = useMe();
  const { setLike } = usePosts();

  const liked = user ? likes.includes(user.username) : false;
  console.log(liked);
  const bookmarked = user?.bookmarks.includes(id) ?? false;
  // 유저의 북마크를 가져온다.

  const handleLike = (like: boolean) => {
    user && setLike(post, user.username, like);
  };

  const handleBookmark = (bookmark: boolean) => {
    user && setBookmark(id, bookmark);
  };

  const handleComment = (comment: string) => {
    user && onComment({ comment, username: user.username, image: user.image });
  };

  return (
    <>
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
        {children}
        <p className={S.ago}>{parseDate(createdAt)}</p>
      </article>
      <CommentForm onPostComment={handleComment} />
    </>
  );
};

export default ActionBar;
