import UserPosts from "@/components/user_posts/UserPosts";
import UserProfile from "@/components/user_profile/UserProfile";
import { getUserForProfile } from "@/service/user";
import S from "./page.module.css";
import { Metadata } from "next";
import { cache } from "react";

interface Props {
  params: {
    username: string;
  };
}

const getUser = cache(async (username: string) => getUserForProfile(username));

const UserPage = async ({ params: { username } }: Props) => {
  const user = await getUser(username);

  return (
    <section className={S.wrap}>
      <UserProfile user={user} />
      <UserPosts user={user} />
    </section>
  );
};

export default UserPage;

export const generateMetadata = async ({
  params: { username },
}: Props): Promise<Metadata> => {
  const user = await getUser(username);
  return {
    title: `${user?.name} (@${user?.username}) ・ Instantgram`,
    description: `${user?.name}'s all Instantgram posts`,
  };
};
