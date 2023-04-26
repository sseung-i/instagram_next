"use client";

import { ProfileUser } from "@/model/user";
import React, { useState } from "react";
import PostIcon from "../ui/icons/PostIcon";
import BookmarkIcon from "../ui/icons/BookmarkIcon";
import HeartIcon from "../ui/icons/HeartIcon";
import S from "./UserPosts.module.css";
import PostGrid from "../post_grid/PostGrid";

interface Props {
  user: ProfileUser;
}

const tabs = [
  { type: "posts", icon: <PostIcon size={16} /> },
  { type: "saved", icon: <BookmarkIcon size={16} /> },
  { type: "liked", icon: <HeartIcon size={16} /> },
];

const UserPosts = ({ user: { username } }: Props) => {
  const [query, setQuery] = useState(tabs[0].type);

  return (
    <section>
      <ul className={S.tabs}>
        {tabs.map(({ type, icon }) => (
          <li
            key={type}
            onClick={() => setQuery(type)}
            className={`${S.tab_wrap} ${type === query && S.now_tab}`}
          >
            <button className={`${S.tab}`}>{icon}</button>
            <span className={S.type}>{type}</span>
          </li>
        ))}
      </ul>
      <PostGrid username={username} query={query} />
    </section>
  );
};

export default UserPosts;
