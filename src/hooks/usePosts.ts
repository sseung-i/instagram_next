import { Comment, SimplePost } from "@/model/post";
import { useCallback } from "react";
import useSWR from "swr";

/* 네트워크 함수 */

const updateLike = async (id: string, like: boolean) => {
  return fetch("/api/likes", {
    method: "PUT",
    body: JSON.stringify({ id, like }),
  }).then((res) => res.json());
};

const addComment = async (id: string, comment: string) => {
  return fetch("/api/comments", {
    method: "POST",
    body: JSON.stringify({ id, comment }),
  }).then((res) => res.json());
};

// mutate : https://swr.vercel.app/ko/docs/mutation
export default function usePosts() {
  const {
    data: posts,
    isLoading,
    error,
    mutate,
  } = useSWR<SimplePost[]>("/api/posts");

  const setLike = useCallback(
    (post: SimplePost, username: string, like: boolean) => {
      const newPost = {
        ...post,
        likes: like
          ? [...post.likes, username]
          : post.likes.filter((item) => item !== username),
      };

      const newPosts = posts?.map((p) => (p.id === post.id ? newPost : p));

      return mutate(updateLike(post.id, like), {
        optimisticData: newPosts,
        populateCache: false,
        revalidate: false,
        rollbackOnError: true,
      });
    },
    [posts, mutate]
  );

  const postComment = useCallback(
    (post: SimplePost, comment: Comment) => {
      // 먼저 ui 업데이트를 시켜줌
      const newPost = {
        ...post,
        comments: post.comments + 1,
      };
      console.log(newPost);

      const newPosts = posts?.map((p) => (p.id === post.id ? newPost : p));

      return mutate(addComment(post.id, comment.comment), {
        optimisticData: newPosts,
        populateCache: false,
        revalidate: false,
        rollbackOnError: true,
      });
    },
    [posts, mutate]
  );

  return { posts, isLoading, error, setLike, postComment };
}
