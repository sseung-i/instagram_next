"use client";

import React from "react";
import S from "./FollowingBar.module.css";
import useSWR from "swr";
import Avatar from "../ui/Avatar";
import ScrollableBar from "../ui/ScrollableBar";
import { DetailUser, SimpleUser } from "@/model/user";
import BeatLoader from "react-spinners/BeatLoader";
import Link from "next/link";

const FollowingBar = () => {
  const { data, isLoading: loading, error } = useSWR<DetailUser>("/api/me");
  const users = data?.following;

  // 1. 클라이언트 컴포넌트에서 백엔드에게 api/me 사용자의 정보를 얻어옴
  // 2. 백엔드에서는 현재 로그인된 사용자의 세션 정보를 이용해서
  // 3. 백엔드에서 사용자의 상세 정보를 Sanity에서 가지고 옴 (followings)
  // 4. 클라이언트 컴포넌트에서 followings의 정보를 UI에 보여줌 (image, username)
  return (
    <section className={S.following_bar}>
      {loading && (
        <div className={S.loading_wrap}>
          {!users || users.length === 0 ? (
            <BeatLoader size={8} color="red" />
          ) : (
            <p>{`You don't have following`}</p>
          )}
        </div>
      )}

      {users && users.length > 0 && (
        <ScrollableBar>
          {[...users, ...users].map(({ image, username }: SimpleUser) => {
            return (
              <Link
                key={username}
                href={`/user/${username}`}
                className={S.following}
              >
                <Avatar image={image} size="XL" highlight />
                <p className={S.user_name}>{username}</p>
              </Link>
            );
          })}
        </ScrollableBar>
      )}
    </section>
  );
};

export default FollowingBar;
