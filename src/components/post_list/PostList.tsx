"use client";

import React from "react";
import S from "./PostList.module.css";
import PostListCard from "../ui/PostListCard";
import GridSpinner from "../GridSpinner";
import usePosts from "@/hooks/usePosts";

const PostList = () => {
  // 1. 유저의 following의 post를 시간으로 정렬해서 가져온다
  const { posts, isLoading: loading } = usePosts();

  return (
    <section className={S.wrap}>
      {loading && (
        <div className={S.loading_wrap}>
          {!posts || posts.length === 0 ? (
            <GridSpinner />
          ) : (
            <p>{`You don't have posts`}</p>
          )}
        </div>
      )}
      <ul className={S.post_list}>
        {posts &&
          posts.length > 0 &&
          posts.map((post, index) => {
            return (
              <li key={post.id} className={S.post}>
                <PostListCard post={post} priority={index < 2} />
              </li>
            );
          })}
      </ul>
    </section>
  );
};

export default PostList;
