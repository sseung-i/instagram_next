export type User = {
  name: string;
  username: string;
  email: string;
  image?: string;
};

export type SimpleUser = Pick<User, "username" | "image">;

export interface DetailUser extends User {
  following: SimpleUser[];
  followers: SimpleUser[];
  bookmarks: string[];
}
