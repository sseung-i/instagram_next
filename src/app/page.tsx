import FollowingBar from "@/components/following_bar/FollowingBar";
import S from "./page.module.css";
import PostList from "@/components/post_list/PostList";
import SideBar from "@/components/side_bar/SideBar";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export default async function Home() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) redirect("/auth/signin");

  return (
    <section className={S.layout}>
      <div className={S.content}>
        <FollowingBar />
        <PostList />
      </div>
      <SideBar user={user} />
    </section>
  );
}
