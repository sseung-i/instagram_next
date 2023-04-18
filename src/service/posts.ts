import { SimplePost } from "@/model/post";
import { client, urlFor } from "./sanity";

// asd[]->value : asd배열 안에있는 username만 가져온다.
const simplePostProjection = `
  ...,
  "id": _id,
  "userName": author->username,
  "userImage": author->image,
  "image": photo,
  "text": comments[0].comment,
  "createdAt":_createdAt,
  "likes": likes[]->username,
  "comments": count(comments),
`;
export const getFollowingPostsOf = (username: string) => {
  return client
    .fetch(
      `*[_type == "post" && author->username == "${username}"
    ||  author._ref in *[_type == "user" && username == "${username}"].following[]._ref]
    | order(_createdAt desc){${simplePostProjection}}`
    )
    .then((posts) =>
      posts.map((post: SimplePost) => ({ ...post, image: urlFor(post.image) }))
    );
};