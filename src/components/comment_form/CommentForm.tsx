import React from "react";
import EmojiSmileIcon from "../ui/icons/EmojiSmileIcon";
import S from "./CommentForm.module.css";

const CommentForm = () => {
  return (
    <form className={S.comment}>
      <EmojiSmileIcon />
      <input className={S.comment_input} placeholder="Add a comment..." />
      <button className={S.post_btn}>Post</button>
    </form>
  );
};

export default CommentForm;
