import { SearchUser } from "@/model/user";
import { client } from "./sanity";

type OAuthUser = {
  id: string;
  email: string;
  name: string;
  username: string;
  image?: string | null;
};
export const addUser = async ({
  id,
  email,
  username,
  name,
  image,
}: OAuthUser) => {
  return client.createIfNotExists({
    _id: id,
    _type: "user",
    username,
    email,
    name,
    image,
    following: [],
    followers: [],
    bookmarks: [],
  });
};

export const getUserByUsername = async (username: string) => {
  return client.fetch(
    `*[_type == "user" && username == "${username}"][0]{
      ...,
      "id": _id,
      following[]->{username,image},
      followers[]->{username,image},
      "bookmarks":bookmarks[]->_id,
    }`
  );
};

export const getUserForProfile = async (username: string) => {
  return client
    .fetch(
      `*[_type == "user" && username == "${username}"][0]{
      ...,
      "id": _id,
      "following": count(following),
      "followers": count(followers),
      "posts": count(*[_type == "post" && author->username == "${username}"])
    }`
    )
    .then((user) => {
      return {
        ...user,
        following: user.following ?? 0,
        followers: user.followers ?? 0,
        posts: user.posts ?? 0,
      };
    });
};

export const getSearchUsers = async (keyword?: string) => {
  const hasKeyword = keyword
    ? `&& username match "${keyword}*" || name match "${keyword}*"`
    : "";
  return client
    .fetch(
      `*[_type == "user" ${hasKeyword}]{
    ...,
    "id": _id,
    "following": count(following),
    "followers": count(followers)
  }`
    )
    .then((users) =>
      users.map((user: SearchUser) => ({
        ...user,
        following: user.following ?? 0,
        followers: user.followers ?? 0,
      }))
    );
};

export const addBookmark = async (userId: string, postId: string) => {
  return client
    .patch(userId)
    .setIfMissing({ bookmarks: [] })
    .append("bookmarks", [
      {
        _ref: postId,
        _type: "reference",
      },
    ])
    .commit({ autoGenerateArrayKeys: true }); //자동으로 키를 만들어 준다
};

export const removeBookmark = async (userId: string, postId: string) => {
  return client
    .patch(userId)
    .unset([`bookmarks[_ref=="${postId}"]`])
    .commit();
};

export const follow = async (myId: string, targetId: string) => {
  return client
    .transaction() //https://www.sanity.io/docs/js-client#multiple-mutations-in-a-transaction
    .patch(myId, (user) =>
      user
        .setIfMissing({ following: [] })
        .append("following", [{ _ref: targetId, _type: "reference" }])
    )
    .patch(targetId, (user) =>
      user
        .setIfMissing({ followers: [] })
        .append("followers", [{ _ref: myId, _type: "reference" }])
    )
    .commit({ autoGenerateArrayKeys: true });
};

export const unFollow = async (myId: string, targetId: string) => {
  return client
    .transaction()
    .patch(myId, (user) => user.unset([`following[_ref=="${targetId}"]`]))
    .patch(targetId, (user) => user.unset([`followers[_ref=="${myId}"]`]))
    .commit({ autoGenerateArrayKeys: true });
};
