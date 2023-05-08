"use client";

import React, { useState, useTransition } from "react";
import { ProfileUser } from "@/model/user";
import Button from "./ui/Button";
import useMe from "@/hooks/useMe";
import { useRouter } from "next/navigation";
import { PulseLoader } from "react-spinners";
import S from "./FollowButton.module.css";

interface Props {
  user: ProfileUser;
}
const FollowButton = ({ user: { id, username } }: Props) => {
  const { user: loggedInUser, toggleFollow } = useMe();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isFetching, setIsFetching] = useState(false);
  const isUpdating = isPending || isFetching;

  const showButton = loggedInUser && loggedInUser.username !== username;
  const following =
    loggedInUser &&
    loggedInUser.following.find((item) => item.username === username);

  const text = following ? "Unfollow" : "Follow";

  const handleFollow = async () => {
    setIsFetching(true);
    await toggleFollow(id, !following);
    setIsFetching(false);
    startTransition(() => {
      router.refresh();
    });
  };
  return (
    <>
      {showButton && (
        <div className={S.followBtn}>
          {isUpdating && (
            <div className={S.loading}>
              <PulseLoader size={6} />
            </div>
          )}
          <Button
            text={text}
            onClick={handleFollow}
            red={text === "Unfollow"}
            disabled={isUpdating}
          />
        </div>
      )}
    </>
  );
};

export default FollowButton;
