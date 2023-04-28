"use client";

import React, { useState } from "react";
import S from "./PostListCard.module.css";
import Image from "next/image";
import Avatar from "./Avatar";
import { SimplePost } from "@/model/post";
import CommentForm from "../comment_form/CommentForm";
import ActionBar from "./ActionBar";
import ModalPortal from "./ModalPortal";
import PostModal from "../post_modal/PostModal";
import PostDetail from "../post_modal/PostDetail";
import PostUserAvatar from "./PostUserAvatar";

interface Props {
  post: SimplePost;
  priority?: boolean;
}
const PostListCard = ({ post, priority = false }: Props) => {
  const { username, userImage, text, likes, image, createdAt } = post;
  const [openModal, setOpenModal] = useState(false);

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

      <ActionBar post={post} />
      <CommentForm />
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
