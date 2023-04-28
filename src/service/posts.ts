import { SimplePost } from "@/model/post";
import { client, urlFor } from "./sanity";

// asd[]->value : asd배열 안에있는 username만 가져온다.
const simplePostProjection = `
  ...,
  "id": _id,
  "username": author->username,
  "userImage": author->image,
  "image": photo,
  "text": comments[0].comment,
  "createdAt":_createdAt,
  "likes": likes[]->username,
  "comments": count(comments),
`;

const mapPosts = (posts: SimplePost[]) => {
  return posts.map((post: SimplePost) => ({
    ...post,
    likes: post.likes ?? [],
    image: urlFor(post.image),
  }));
};

export const getFollowingPostsOf = async (username: string) => {
  return client
    .fetch(
      `*[_type == "post" && author->username == "${username}"
    ||  author._ref in *[_type == "user" && username == "${username}"].following[]._ref]
    | order(_createdAt desc){${simplePostProjection}}`
    )
    .then(mapPosts);
};

export const getPost = async (id: string) => {
  return client
    .fetch(
      `*[_type == "post" && _id == "${id}"][0]{
      ...,
      "userName": author->username,
      "userImage": author->image,
      "image": photo,
      "likes": likes[]->username,
      comments[]{comment, "username": author->username, "image": author->image},
      "id":_id,
      "createdAt": _createdAt
    }`
    )
    .then((post) => ({ ...post, image: urlFor(post.image) }));
};

export const getPostsOf = async (username: string) => {
  return client
    .fetch(
      `*[_type == "post" && author->username == "${username}"]
    | order(_createdAt desc){
      ${simplePostProjection}
    }`
    )
    .then(mapPosts);
};

export const getLikedPostsOf = async (username: string) => {
  return client
    .fetch(
      `*[_type == "post" && "${username}" in likes[]->username]
    | order(_createdAt desc){
      ${simplePostProjection}
    }`
    )
    .then(mapPosts);
};

export const getSavedPostsOf = async (username: string) => {
  return client
    .fetch(
      `*[_type == "post" && _id in *[_type == "user" && username=="${username}"].bookmarks[]._ref]
    | order(_createdAt desc){
      ${simplePostProjection}
    }`
    )
    .then(mapPosts);
};

export const likePost = async (postId: string, userId: string) => {
  return client
    .patch(postId) //postId에 해당하는 포스트에
    .setIfMissing({ likes: [] }) //likes가 없으면 빈배열을 만들어주고
    .append("likes", [
      {
        _ref: userId,
        _type: "reference",
      },
    ]) //likes가 있다면 배열에 추가해주고
    .commit({ autoGenerateArrayKeys: true }); //자동으로 키를 만들어 준다
};

export const dislikePost = async (postId: string, userId: string) => {
  return client
    .patch(postId)
    .unset([`likes[_ref=="${userId}"]`])
    .commit();
};
