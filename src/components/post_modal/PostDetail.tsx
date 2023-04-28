import { FullPost, SimplePost } from "@/model/post";
import Image from "next/image";
import React from "react";
import useSWR from "swr";
import S from "./PostDetail.module.css";
import PostUserAvatar from "../ui/PostUserAvatar";
import ActionBar from "../ui/ActionBar";
import CommentForm from "../comment_form/CommentForm";
import Avatar from "../ui/Avatar";
import { BeatLoader } from "react-spinners";

interface Props {
  post: SimplePost;
}
const PostDetail = ({ post }: Props) => {
  const { id, userImage, username, image, createdAt, likes } = post;
  const { data, isLoading: commentsLoading } = useSWR<FullPost>(
    `/api/posts/${id}`
  );
  const comments = data?.comments;

  return (
    <section className={S.detail_content}>
      <div className={S.img_wrap}>
        <Image
          className={S.post_image}
          src={image}
          alt={`photo by ${username}`}
          priority
          fill
          sizes="650px"
        />
      </div>
      <div className={S.comment_wrap}>
        <PostUserAvatar image={userImage} userName={username} />
        {commentsLoading ? (
          <div className={S.loading_wrap}>
            <BeatLoader size={4} color="gray" />
          </div>
        ) : (
          <ul className={S.comment_list}>
            {comments &&
              comments.map(
                ({ image, username: commentUserName, comment }, index) => (
                  <li key={index} className={S.comment}>
                    <Avatar
                      image={image}
                      size="S"
                      highlight={commentUserName === username}
                    />
                    <div>
                      <span className={S.comment_user_name}>
                        {commentUserName}
                      </span>
                      {comment}
                    </div>
                  </li>
                )
              )}
          </ul>
        )}
        <ActionBar post={post} />
        <CommentForm />
      </div>
    </section>
  );
};

export default PostDetail;
