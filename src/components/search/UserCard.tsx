import Link from "next/link";
import React from "react";
import Avatar from "../ui/Avatar";
import { SearchUser } from "@/model/user";
import S from "./UserCard.module.css";

interface Props {
  user: SearchUser;
}
const UserCard = ({
  user: { name, username, image, following, followers },
}: Props) => {
  return (
    <Link href={`/user/${username}`} className={S.card}>
      <Avatar image={image} size="M" />
      <div className={S.info}>
        <p className={S.username}>{username}</p>
        <p>{name}</p>
        <p
          className={S.follow}
        >{`${followers} followers | ${following} following`}</p>
      </div>
    </Link>
  );
};

export default UserCard;
