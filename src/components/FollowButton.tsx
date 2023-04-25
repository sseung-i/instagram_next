"use client";
import React from "react";
import useSWR from "swr";
import { HomeUser, ProfileUser } from "@/model/user";
import Button from "./ui/Button";

interface Props {
  user: ProfileUser;
}
const FollowButton = ({ user: { username } }: Props) => {
  const { data: loggedInUser } = useSWR<HomeUser>("/api/me");

  const showButton = loggedInUser && loggedInUser.username !== username;
  const following =
    loggedInUser &&
    loggedInUser.following.find((item) => item.username === username);

  const text = following ? "Unfollow" : "Follow";
  return (
    <>
      {showButton && (
        <Button text={text} onClick={() => {}} red={text === "Unfollow"} />
      )}
    </>
  );
};

export default FollowButton;