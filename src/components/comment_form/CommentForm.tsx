"use client";
import React, { FormEvent, useRef, useState } from "react";
import EmojiSmileIcon from "../ui/icons/EmojiSmileIcon";
import S from "./CommentForm.module.css";

interface Props {
  onPostComment: (comment: string) => void;
}

const CommentForm = ({ onPostComment }: Props) => {
  const [comment, setComment] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onPostComment(comment);
    setComment("");
  };
  return (
    <form className={S.comment} onSubmit={handleSubmit}>
      <EmojiSmileIcon />
      <input
        className={S.comment_input}
        type="text"
        placeholder="Add a comment..."
        required
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button className={S.post_btn} disabled={comment.length < 1}>
        Post
      </button>
    </form>
  );
};

export default CommentForm;
