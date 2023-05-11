import { SimplePost } from "@/model/post";
import Image from "next/image";
import React from "react";
import S from "./PostDetail.module.css";
import PostUserAvatar from "../ui/PostUserAvatar";
import ActionBar from "../ui/ActionBar";
import Avatar from "../ui/Avatar";
import { BeatLoader } from "react-spinners";
import useFullPost from "@/hooks/usePost";

interface Props {
  post: SimplePost;
}
const PostDetail = ({ post }: Props) => {
  const { id, userImage, username, image } = post;
  const {
    post: data,
    isLoading: commentsLoading,
    postComment,
  } = useFullPost(id);
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
        <ActionBar post={post} onComment={postComment} />
      </div>
    </section>
  );
};

export default PostDetail;
