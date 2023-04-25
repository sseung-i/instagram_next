import UserPosts from "@/components/user_posts/UserPosts";
import UserProfile from "@/components/user_profile/UserProfile";
import { getUserForProfile } from "@/service/user";
import S from "./page.module.css";

interface Props {
  params: {
    username: string;
  };
}

const UserPage = async ({ params: { username } }: Props) => {
  const user = await getUserForProfile(username);

  return (
    <section className={S.wrap}>
      <UserProfile user={user} />
      <UserPosts user={user} />
    </section>
  );
};

export default UserPage;
