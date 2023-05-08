"use client";

import React, { useState } from "react";
import S from "./PostListCard.module.css";
import Image from "next/image";
import { Comment, SimplePost } from "@/model/post";
import ActionBar from "./ActionBar";
import ModalPortal from "./ModalPortal";
import PostModal from "../post_modal/PostModal";
import PostDetail from "../post_modal/PostDetail";
import PostUserAvatar from "./PostUserAvatar";
import usePosts from "@/hooks/usePosts";

interface Props {
  post: SimplePost;
  priority?: boolean;
}
const PostListCard = ({ post, priority = false }: Props) => {
  const { username, userImage, image, text, comments } = post;
  const [openModal, setOpenModal] = useState(false);
  const { postComment } = usePosts();

  const handlePostComment = (comment: Comment) => {
    postComment(post, comment);
  };
  return (
    <>
      <PostUserAvatar image={userImage} userName={username} />
      <Image
        className={S.post_image}
        src={image}
        alt={`photo by ${username}`}
        width={500}
        height={500}
        priority={priority}
        onClick={() => setOpenModal(true)}
      />

      <ActionBar post={post} onComment={handlePostComment}>
        <p className={S.desc}>
          <span className={S.user_name}>{username}</span> {text}
        </p>
        {comments > 1 && (
          <button
            className={S.comments}
            onClick={() => setOpenModal(true)}
          >{`View all ${comments} comments`}</button>
        )}
      </ActionBar>

      {openModal && (
        <ModalPortal>
          <PostModal onClose={() => setOpenModal(false)}>
            <PostDetail post={post} />
          </PostModal>
        </ModalPortal>
      )}
    </>
  );
};

export default PostListCard;
