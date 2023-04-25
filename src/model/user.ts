export type AuthUser = {
  name: string;
  username: string;
  email: string;
  image?: string;
};

export type SimpleUser = Pick<AuthUser, "username" | "image">;

export interface HomeUser extends AuthUser {
  following: SimpleUser[];
  followers: SimpleUser[];
  bookmarks: string[];
}

export interface SearchUser extends AuthUser {
  id: string;
  following: number;
  followers: number;
}

export interface ProfileUser extends SearchUser {
  posts: number;
}
