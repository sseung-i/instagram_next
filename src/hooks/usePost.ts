import { Comment, FullPost, SimplePost } from "@/model/post";
import { useCallback } from "react";
import useSWR, { useSWRConfig } from "swr";

/* 네트워크 함수 */
const addComment = async (id: string, comment: string) => {
  return fetch("/api/comments", {
    method: "POST",
    body: JSON.stringify({ id, comment }),
  }).then((res) => res.json());
};

// mutate : https://swr.vercel.app/ko/docs/mutation
export default function useFullPost(postId: string) {
  const {
    data: post,
    isLoading,
    error,
    mutate,
  } = useSWR<FullPost>(`/api/posts/${postId}`);

  const { mutate: globalMutate } = useSWRConfig();
  const postComment = useCallback(
    (comment: Comment) => {
      if (!post) return;

      // 먼저 ui 업데이트를 시켜줌
      const newPost = {
        ...post,
        comments: [...post.comments, comment],
      };

      return mutate(addComment(post.id, comment.comment), {
        optimisticData: newPost,
        populateCache: false,
        revalidate: false,
        rollbackOnError: true,
      }).then(() => globalMutate("/api/posts"));
    },
    [post, mutate, globalMutate]
  );

  return { post, isLoading, error, postComment };
}
