import React from "react";
import S from "./PostListCard.module.css";
import Image from "next/image";
import Avatar from "./Avatar";
import { SimplePost } from "@/model/post";

import CommentForm from "../comment_form/CommentForm";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import ActionBar from "./ActionBar";

interface Props {
  post: SimplePost;
  priority?: boolean;
}
const PostListCard = ({ post, priority = false }: Props) => {
  const { userName, userImage, text, likes, image, createdAt } = post;
  return (
    <>
      <div className={S.userInfo}>
        <Avatar image={userImage} size="S" highlight />
        <p className={S.user_name}>{userName}</p>
      </div>
      <Image
        className={S.post_image}
        src={image}
        alt={`photo by ${userName}`}
        width={500}
        height={500}
        priority={priority}
      />

      <ActionBar
        likes={likes}
        userName={userName}
        text={text}
        createdAt={createdAt}
      />
      <CommentForm />
    </>
  );
};

export default PostListCard;
