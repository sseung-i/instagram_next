import React from "react";
import S from "./PostUserAvatar.module.css";
import Avatar from "./Avatar";

interface Props {
  image: string;
  userName: string;
}
const PostUserAvatar = ({ image, userName }: Props) => {
  return (
    <div className={S.userInfo}>
      <Avatar image={image} size="S" highlight />
      <p className={S.user_name}>{userName}</p>
    </div>
  );
};

export default PostUserAvatar;
