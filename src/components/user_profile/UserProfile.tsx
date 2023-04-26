import { ProfileUser } from "@/model/user";
import { notFound } from "next/navigation";
import Avatar from "../ui/Avatar";
import FollowButton from "../FollowButton";
import S from "./UserProfile.module.css";

interface Props {
  user: ProfileUser;
}

const UserProfile = ({ user }: Props) => {
  const { image, username, name, followers, following, posts } = user;
  const info = [
    {
      title: "posts",
      data: posts,
    },
    {
      title: "followers",
      data: followers,
    },
    {
      title: "following",
      data: following,
    },
  ];

  if (!user) {
    notFound();
  }
  return (
    <section className={S.profile}>
      <Avatar image={image} highlight size="XL" />
      <div className={S.info}>
        <div className={S.btn_wrap}>
          <h1>{user.username}</h1>
          <FollowButton user={user} />
        </div>
        <ul className={S.action_list}>
          {info.map(({ title, data }, index) => (
            <li key={index}>
              <span className={S.count}>{data}</span>
              {title}
            </li>
          ))}
        </ul>
        <p className={S.name}>{name}</p>
      </div>
    </section>
  );
};

export default UserProfile;
