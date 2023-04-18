"use client";

import React from "react";
import useSWR from "swr";
import S from "./PostList.module.css";
import { FadeLoader } from "react-spinners";
import { SimplePost } from "@/model/post";
import PostListCard from "../ui/PostListCard";

const PostList = () => {
  // 1. 유저의 following의 post를 시간으로 정렬해서 가져온다
  const {
    data: posts,
    isLoading: loading,
    error,
  } = useSWR<SimplePost[]>("/api/posts");

  return (
    <section className={S.wrap}>
      {loading && (
        <div className={S.loading_wrap}>
          {!posts || posts.length === 0 ? (
            <FadeLoader color="gray" />
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
